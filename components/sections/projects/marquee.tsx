"use client";

import * as React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "motion/react";
import { PROJECTS } from "./data";
import ProjectCard, { CARD_WIDTH } from "./project-card";

const IDLE = 45; // px/s at rest — positive drifts right-to-left
const MAX = 140; // px/s at the edges
const GAP = 16; // single source of truth for the track gap
const DRAG_SLOP = 8; // px of movement before a tap counts as a drag
const MAX_COPIES = 12; // sanity cap so a single project can't explode the DOM
const FILL_TARGET = 5000; // px of track to cover before the pattern repeats

// Every card occupies the same slot, so one full set advances by exactly this.
const SLOT = CARD_WIDTH + GAP;
const SET_WIDTH = PROJECTS.length * SLOT;

const REDUCED_MOTION = {
  get matches() {
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  },
};

function subscribeToReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

// The track must cover the screen with a full set to spare, or the wrap point
// lands on screen and you see the end of the track. Computed at render time
// rather than measured: extra copies are duplicates of already-cached images,
// so over-rendering costs a few DOM nodes and nothing else.
const COPIES = Math.min(
  MAX_COPIES,
  Math.max(2, Math.ceil(FILL_TARGET / SET_WIDTH) + 1),
);

function Marquee() {
  const x = useMotionValue(0);
  const speed = useSpring(IDLE, { stiffness: 80, damping: 22 });
  // Subscribes to the OS setting, and — via the server snapshot — guarantees the
  // first client render matches the server, so hydration never mismatches.
  const animated = React.useSyncExternalStore(
    subscribeToReducedMotion,
    () => !REDUCED_MOTION.matches,
    () => false,
  );

  const drag = React.useRef({
    active: false,
    lastX: 0,
    lastT: 0,
    moved: 0,
    v: 0,
    captured: false,
  });

  // maps any offset back into (-period, 0]
  const wrap = React.useCallback((v: number, p: number) => {
    if (!p) return v;
    const m = v % p;
    return m > 0 ? m - p : m;
  }, []);

  useAnimationFrame((_, delta) => {
    if (!animated || drag.current.active) return;
    x.set(wrap(x.get() - (speed.get() * delta) / 1000, SET_WIDTH));
  });

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;

    if (d.active) {
      const now = performance.now();
      const dx = e.clientX - d.lastX;
      const dt = now - d.lastT;
      d.lastX = e.clientX;
      d.lastT = now;
      d.moved += Math.abs(dx);
      if (dt > 0) d.v = (dx / dt) * 1000;

      // Capture only once this is unambiguously a drag. Capturing on
      // pointerdown would retarget the click to this div, so a plain tap on a
      // card's link would never reach the anchor.
      if (!d.captured && d.moved > DRAG_SLOP) {
        e.currentTarget.setPointerCapture(e.pointerId);
        d.captured = true;
      }
      x.set(wrap(x.get() + dx, SET_WIDTH));
      return;
    }

    if (e.pointerType !== "mouse") return;

    // -1 at the left edge, +1 at the right. Squared for a soft center.
    const rect = e.currentTarget.getBoundingClientRect();
    const t = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    speed.set(Math.sign(t) * t * t * MAX);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    drag.current = {
      active: true,
      lastX: e.clientX,
      lastT: performance.now(),
      moved: 0,
      v: 0,
      captured: false,
    };
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (
      drag.current.captured &&
      e.currentTarget.hasPointerCapture(e.pointerId)
    ) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      drag.current.captured = false;
    }

    // hand the flick to the spring as a starting speed, then let it settle
    const flick = Math.max(-MAX * 3, Math.min(MAX * 3, -drag.current.v));
    speed.jump(flick);
    speed.set(IDLE);
  }

  function onClickCapture(e: React.MouseEvent) {
    if (drag.current.moved > DRAG_SLOP) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  // Reduced motion / no JS: a plain swipeable row.
  if (!animated) {
    return (
      <ul
        style={{ gap: GAP }}
        className="flex snap-x snap-mandatory overflow-x-auto px-6 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </ul>
    );
  }

  return (
    <div
      className="cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing "
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={() => speed.set(IDLE)}
      onClickCapture={onClickCapture}
      onFocusCapture={() => speed.set(0)}
      onBlurCapture={() => speed.set(IDLE)}
    >
      <motion.div style={{ x, gap: GAP }} className="flex w-max">
        {Array.from({ length: COPIES }, (_, i) => (
          <ul key={i} style={{ gap: GAP }} className="flex" aria-hidden={i > 0}>
            {PROJECTS.map((p) => (
              <ProjectCard key={`${p.id}-${i}`} project={p} clone={i > 0} />
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  );
}

export default Marquee;
