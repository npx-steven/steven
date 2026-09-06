"use client";

import { IoMdMail, IoLogoGithub, IoLogoLinkedin } from "react-icons/io";
import { motion } from "motion/react";
import ThemeToggle from "./theme-toggle";

const socials = [
  {
    href: "mailto:spartida0002@gmail.com",
    label: "Email",
    Icon: IoMdMail,
    duration: 1,
  },
  {
    href: "https://github.com/npx-steven",
    label: "GitHub",
    Icon: IoLogoGithub,
    duration: 1.5,
  },
  {
    href: "https://www.linkedin.com/in/steven-partida",
    label: "LinkedIn",
    Icon: IoLogoLinkedin,
    duration: 2,
  },
];

function SocialBar() {
  return (
    <section className="content flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-3 py-5">
        {socials.map(({ href, label, Icon, duration }) => {
          const external = !href.startsWith("mailto:");
          return (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration }}
              className="text-faint hover:text-foreground"
            >
              <Icon className="size-6" />
            </motion.a>
          );
        })}
      </div>
      <ThemeToggle />
    </section>
  );
}

export default SocialBar;
