"use client";

import { Moon, Sun } from "lucide-react";

interface ThemeTogglerProps {
  theme: string | null;
  setTheme: (theme: string) => void;
}

export default function ThemeToggler({ theme, setTheme }: ThemeTogglerProps) {    
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div onClick={toggleTheme} className="cursor-pointer">
      {theme === "light" ? <Moon width={32} height={32} /> : <Sun width={32} height={32} />}  
    </div>
  );
};