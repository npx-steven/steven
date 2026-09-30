"use client";

import React from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { IconEye } from "@tabler/icons-react";

export type ViewCountProps = {
  from?: number;
  to?: number;
  duration?: number;
  strength?: number;
  repeat?: boolean;
};

const format = new Intl.NumberFormat("en-US");
const easeOutPower = (power: number) => (t: number) =>
  1 - Math.pow(1 - t, power);

function ViewCount({
  from = 0,
  to = 0,
  duration = 2.5,
  strength = 5,
  repeat = false,
}: ViewCountProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: !repeat });
  const reduceMotion = useReducedMotion();
  const [views, setViews] = React.useState<number | null>(null);
  const count = useMotionValue(from);
  const text = useTransform(count, (v) => format.format(Math.round(v)));

  React.useEffect(() => {
    let cancelled = false;

    fetch("/api/views", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && typeof data.views === "number") {
          setViews(data.views);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const target = views ?? to;

  React.useEffect(() => {
    if (!isInView || views === null) return;

    if (reduceMotion) {
      count.set(target);
      return;
    }

    const controls = animate(count, target, {
      duration,
      ease: easeOutPower(strength),
    });

    return () => controls.stop();
  }, [isInView, views, target, count, duration, strength, reduceMotion]);

  return (
    <span
      ref={ref}
      className="flex flex-row gap-1 items-center justify-center text-muted dark:text-faint text-sm"
    >
      <IconEye className="size-4" scale={2} />
      <motion.span aria-hidden className="text-sm">
        {text}
      </motion.span>
      <span className="sr-only">{format.format(target)}</span>
      <span>views</span>
    </span>
  );
}

export default ViewCount;
