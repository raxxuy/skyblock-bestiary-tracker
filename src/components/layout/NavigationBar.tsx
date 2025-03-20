"use client";

import ImageLink from "@/components/shared/ImageLink";
import ThemeToggler from "@/components/layout/ThemeToggler";
import useTheme from "@/hooks/useTheme";

export default function NavigationBar() {
  const { theme, setTheme } = useTheme();

  if (!theme) return null;
  
  return (
    <div className="
      w-full h-fit flex justify-between items-center px-2 py-2 border-b-2 shadow-md 
      bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700
    ">
      <div className="w-full flex justify-end items-center gap-2">
        <ImageLink
          source={theme === "light" ? "github-mark.svg" : "github-mark-white.svg"}
          alt="GitHub"
          href="https://github.com/raxxuy/skyblock-bestiary-tracker"
          width={32}
          height={32}
        />
        <ThemeToggler theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}