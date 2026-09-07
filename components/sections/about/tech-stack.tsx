"use client";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import React from "react";
import {
  SiTypescript,
  SiPython,
  SiJavascript,
  SiReact,
  SiSupabase,
  SiNextdotjs,
} from "react-icons/si";

const tools = [
  {
    label: "React",
    Icon: SiReact,
  },
  {
    label: "TypeScript",
    Icon: SiTypescript,
  },
  {
    label: "JavaScript",
    Icon: SiJavascript,
  },
  {
    label: "Python",
    Icon: SiPython,
  },
  {
    label: "Supabase",
    Icon: SiSupabase,
  },
  {
    label: "Next.js",
    Icon: SiNextdotjs,
  },
];

function TeckStack() {
  const ref = React.useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay: 1,
        duration: 1,
        ease: "easeOut",
        delayChildren: 0.85,
        staggerChildren: 0.4,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView || reduceMotion ? "show" : "hidden"}
      className="border border-border rounded-lg p-4 bg-page dark:bg-ink"
    >
      <span className="text-sm font-medium tracking-wider ">
        What I&apos;m building with right now:
      </span>
      <ul className="list-none p-0 grid grid-rows-6 sm:grid-rows-3 grid-flow-col gap-3 py-4">
        {tools.map(({ label, Icon }) => {
          return (
            <motion.li
              key={label}
              variants={item}
              aria-label={label}
              className="flex flex-row gap-3 items-center"
            >
              <Icon className="size-5" />
              <span>{label}</span>
            </motion.li>
          );
        })}
      </ul>
    </motion.section>
  );
}

export default TeckStack;
