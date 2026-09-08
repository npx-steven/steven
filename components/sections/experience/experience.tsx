"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { IconChevronRight } from "@tabler/icons-react";
import { JOBS } from "./data";

function Experience() {
  const [active, setActive] = React.useState(0);
  const reduceMotion = useReducedMotion();
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    const last = JOBS.length - 1;
    let next = active;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = active === last ? 0 : active + 1;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = active === 0 ? last : active - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const job = JOBS[active];

  const contentVariants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.45, ease: "easeOut" as const },
    },
  };

  const listVariants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { staggerChildren: 0 }
        : { delayChildren: 0.15, staggerChildren: 0.15 },
    },
  };

  const bulletVariants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.3, ease: "easeOut" as const },
    },
  };

  return (
    <section
      className="content flex flex-col gap-6"
      aria-labelledby="experience-heading"
    >
      <h2
        id="experience-heading"
        className="font-sans text-sm font-medium tracking-widest text-muted dark:text-faint"
      >
        EXPERIENCE
      </h2>

      <motion.div
        variants={contentVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col pb-8 gap-6 sm:flex-row sm:gap-10"
      >
        {/* rail + labels */}
        <div
          role="tablist"
          aria-label="Companies"
          onKeyDown={onKeyDown}
          className="flex shrink-0 touch-pan-x gap-x-4 select-none overflow-x-auto overflow-y-hidden overscroll-x-none border-b border-border [-webkit-touch-callout:none] sm:min-w-40 sm:touch-auto sm:flex-col sm:gap-x-0 sm:overflow-visible sm:border-r sm:border-b-0"
        >
          {JOBS.map((j, i) => {
            const selected = i === active;
            return (
              <button
                key={j.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${j.id}`}
                aria-selected={selected}
                aria-controls={selected ? `panel-${j.id}` : undefined}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative shrink-0 py-3 pr-4 text-left text-sm whitespace-nowrap outline-none transition-colors focus-visible:bg-bg-subtle hover:cursor-pointer ${
                  selected
                    ? "font-medium text-foreground"
                    : "text-fg-muted hover:text-foreground "
                }`}
              >
                {j.company}
                {selected && (
                  <motion.span
                    layoutId="experience-indicator"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 34 }
                    }
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-foreground sm:inset-x-auto sm:inset-y-0 sm:-right-px sm:left-auto sm:h-auto sm:w-0.5"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* panel */}
        <div className="relative min-h-72 flex-1">
          <div
            role="tabpanel"
            id={`panel-${job.id}`}
            aria-labelledby={`tab-${job.id}`}
            tabIndex={0}
            className="flex flex-col gap-4 outline-none"
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                {job.company}
              </h3>
              <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-sm text-fg-muted">{job.role}</p>
                <p className="text-sm whitespace-nowrap text-fg-muted ">
                  {job.start} – {job.end}
                </p>
              </div>
            </div>
            <motion.ul
              key={job.id}
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex list-none flex-col gap-3 p-0"
            >
              {job.bullets.map((b) => (
                <motion.li
                  key={b}
                  variants={bulletVariants}
                  className="flex gap-3 text-base/relaxed text-fg-muted"
                >
                  <IconChevronRight
                    className="mt-1 size-4 shrink-0 text-fg-faint"
                    aria-hidden
                  />
                  <span>{b}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Experience;
