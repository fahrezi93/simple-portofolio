import { useState, useEffect } from "react";
import { CommandPalette } from "./CommandPalette";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Check initial theme on mount
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const switchTheme = () => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };

    if (!document.startViewTransition) {
      switchTheme();
    } else {
      document.startViewTransition(switchTheme);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-line transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md"
            : "bg-background"
        }`}
      >
        <div className="mx-auto w-full md:max-w-3xl px-6 h-16 flex items-center justify-between border-x border-line">
          <a href="#" className="font-bold text-lg tracking-tight">
            Fahrezi.
          </a>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#experience" className="hover:text-foreground transition-colors">Experience</a>
            <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none flex items-center justify-center p-2"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <CommandPalette open={open} setOpen={setOpen} />
    </>
  );
}
