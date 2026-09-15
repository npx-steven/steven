"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import type { ContributionCalendar, ContributionLevel } from "./types";

//Guthub already sorted each day into one of the five buckets, this is just a look up table
const LEVEL_CLASS: Record<ContributionLevel, string> = {
  NONE: "bg-border",
  FIRST_QUARTILE: "bg-foreground/30",
  SECOND_QUARTILE: "bg-foreground/50",
  THIRD_QUARTILE: "bg-foreground/75",
  FOURTH_QUARTILE: "bg-foreground",
};

// This reused the same table above to create the color legend
const LEVELS = Object.keys(LEVEL_CLASS) as ContributionLevel[];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Seconds between neighbouring weeks in the sweep. Days lag half a step, tilting the wave diagonally.
const STAGGER = 0.02;

// "2026-09-14" → parts, with no Date or Intl, so server and client render identical text.
function parseDay(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return { year, month: month - 1, day };
}

function formatDay(date: string) {
  const { year, month, day } = parseDay(date);
  return `${MONTHS[month]} ${day}, ${year}`;
}

type ContributionGraphProps = {
  calendar: ContributionCalendar;
};

function ContributionGraph({ calendar }: ContributionGraphProps) {
  //GitHub return weeks[] containing up to 7 days (contributionDays[]) sunday - saturday
  const { weeks, totalContributions } = calendar;
  const ref = React.useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();

  // Label a column when its week starts a new month, skipping labels too close to the previous one.
  const monthLabels = React.useMemo(() => {
    const labels: (string | null)[] = [];
    let lastMonth = -1;
    let lastLabelIndex = -Infinity;
    for (const [i, week] of weeks.entries()) {
      const { month } = parseDay(week.contributionDays[0].date);
      const show = month !== lastMonth && i - lastLabelIndex >= 2;
      labels.push(show ? MONTHS[month] : null);
      if (month !== lastMonth) lastMonth = month;
      if (show) lastLabelIndex = i;
    }
    return labels;
  }, [weeks]);

  const sweepEnd = (weeks.length + 3) * STAGGER;

  const cell: Variants = {
    hidden: reduceMotion
      ? { opacity: 1, scale: 1 }
      : { opacity: 0, scale: 0.4 },
    show: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { delay, duration: 0.35, ease: "easeOut" },
    }),
  };

  const fade: Variants = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0 },
    show: (delay: number) => ({
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { delay, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <motion.figure
      ref={ref}
      initial="hidden"
      animate={isInView || reduceMotion ? "show" : "hidden"}
      className="flex flex-col gap-3"
    >
      {/* dir="rtl" starts the scroll at the right edge, so phones see recent weeks first */}
      <div dir="rtl" className="overflow-x-auto scrollbar-none">
        <div dir="ltr" className="inline-flex flex-col gap-2">
          <motion.div
            variants={fade}
            custom={0}
            className="flex gap-0.75 text-xs text-fg-faint"
            aria-hidden
          >
            {weeks.map((week, i) => (
              <span
                key={week.contributionDays[0].date}
                className="w-2.5 shrink-0 whitespace-nowrap sm:w-3"
              >
                {monthLabels[i]}
              </span>
            ))}
          </motion.div>

          <div
            role="img"
            aria-label={`${totalContributions} GitHub contributions in the last year`}
            className="flex gap-0.75"
          >
            {weeks.map((week, w) => (
              <div
                key={week.contributionDays[0].date}
                // The first week is usually partial; push its days to the bottom rows.
                className={`flex flex-col gap-0.75 ${w === 0 ? "justify-end" : ""}`}
              >
                {week.contributionDays.map((day, d) => (
                  <motion.span
                    key={day.date}
                    variants={cell}
                    custom={(w + d / 2) * STAGGER}
                    title={`${day.contributionCount} contribution${
                      day.contributionCount === 1 ? "" : "s"
                    } on ${formatDay(day.date)}`}
                    className={`size-2.5 rounded-xs sm:size-3 ${LEVEL_CLASS[day.contributionLevel]}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.figcaption
        variants={fade}
        custom={sweepEnd * 0.6}
        className="flex flex-wrap items-center justify-between gap-2 text-xs text-fg-muted"
      >
        <span className="tabular-nums">
          {totalContributions.toLocaleString("en-US")} contributions in the
          last year
        </span>
        <span className="flex items-center gap-1" aria-hidden>
          Less
          {LEVELS.map((level) => (
            <span
              key={level}
              className={`size-2.5 rounded-xs sm:size-3 ${LEVEL_CLASS[level]}`}
            />
          ))}
          More
        </span>
      </motion.figcaption>
    </motion.figure>
  );
}

export default ContributionGraph;
