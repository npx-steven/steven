"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import React from "react";

type BlurTextProps = {
  text: string;
  /** Seconds for the cascade to sweep the whole string. */
  sweep?: number;
  /** Per-character fade duration. */
  duration?: number;
  /** Seconds to wait before the sweep starts. */
  delay?: number;
  blur?: number;
  className?: string;
  as?: React.ElementType;
};

function BlurText({
  text,
  sweep = 1.2,
  duration = 0.5,
  delay = 0,
  blur = 6,
  className,
  as: Tag = "p",
}: BlurTextProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  const words = React.useMemo(() => text.split(" "), [text]);

  // Character index each word starts at, so the wave stays continuous across
  // the whole string instead of restarting on every word.
  const offsets = React.useMemo(() => {
    const starts: number[] = [];
    let n = 0;
    for (const word of words) {
      starts.push(n);
      n += word.length + 1; // +1 for the space
    }
    return starts;
  }, [words]);

  const stagger = text.length > 1 ? sweep / (text.length - 1) : 0;

  const variants: Variants = {
    hidden: { opacity: 0, filter: `blur(${blur}px)` },
    show: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: delay + i * stagger, duration, ease: "easeOut" },
    }),
  };

  if (reduceMotion) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, w) => (
          <React.Fragment key={`${word}-${w}`}>
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char, c) => (
                <motion.span
                  key={`${char}-${c}`}
                  className="inline-block"
                  variants={variants}
                  custom={offsets[w] + c}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {w < words.length - 1 ? " " : null}
          </React.Fragment>
        ))}
      </span>
    </Tag>
  );
}

export default BlurText;
