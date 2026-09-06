"use client";

import { IoMdMail, IoLogoGithub, IoLogoLinkedin } from "react-icons/io";

import { motion } from "motion/react";
import ThemeToggle from "./theme-toggle";

const MotionMail = motion.create(IoMdMail);
const MotionGithub = motion.create(IoLogoGithub);
const MotionLinkedIn = motion.create(IoLogoLinkedin);

function SocialBar() {
  return (
    <section className="content flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-3 py-5">
        <MotionMail
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="size-6 cursor-pointer text-faint hover:text-foreground"
        />
        <MotionGithub
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="size-6 cursor-pointer text-faint hover:text-foreground"
        />
        <MotionLinkedIn
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="size-6 cursor-pointer text-faint hover:text-foreground"
        />
      </div>
      <ThemeToggle />
    </section>
  );
}

export default SocialBar;
