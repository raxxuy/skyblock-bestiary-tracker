import { useTheme as useNextThemes } from "next-themes";
import { useEffect, useState } from "react";

export default function useTheme() {
  const { resolvedTheme, setTheme } = useNextThemes();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return { theme: null, setTheme: setTheme };
  };

  return { theme: resolvedTheme ?? null, setTheme: setTheme };
}