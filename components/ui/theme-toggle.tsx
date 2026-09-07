"use client";

import { IconSunHigh, IconMoon } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ rotate: 40 }}
      aria-label="Toggle theme"
      className="inline-flex size-8 items-center justify-center rounded-full border border-border text-fg-muted hover:text-foreground cursor-pointer"
    >
      <IconMoon className="size-4 dark:hidden" stroke={2} />
      <IconSunHigh className="hidden size-4 dark:block" stroke={2} />
    </motion.button>
  );
}

export default ThemeToggle;
