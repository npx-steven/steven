"use client";

import { IconSunHigh, IconMoon } from "@tabler/icons-react";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex size-9 items-center justify-center rounded-md border border-border text-fg-muted hover:text-foreground"
    >
      <IconMoon className="size-5 dark:hidden" stroke={1.5} />
      <IconSunHigh className="hidden size-5 dark:block" stroke={1.5} />
    </button>
  );
}

export default ThemeToggle;
