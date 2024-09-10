import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before using the theme value
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      className="font-bold text-2xl"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <CiLight /> : <MdOutlineDarkMode />}
    </button>
  );
}
