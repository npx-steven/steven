"use client";

import { motion, useInView, type Variants } from "motion/react";
import React from "react";

type NameProps = {
  name: string;
};

function Name({ name }: NameProps) {
  const variants: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.03, duration: 0.5, ease: "easeOut" },
    }),
  };

  const letters = name.split("");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.h1
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={variants}
      viewport={{ once: true }}
      className="inline-flex font-display text-6xl font-semibold"
    >
      {letters.map((char, i) => (
        <motion.span key={`${char}-${i}`} variants={variants} custom={i}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default Name;
