import { useState, useEffect, useRef } from "react";
import { motion, LayoutGroup } from "motion/react";
import { CommandPalette } from "./CommandPalette";
import { Sun, Moon } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeSection, setActiveSection] = useState<string>("");
  const isManualScrollRef = useRef(false);
  const manualScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Check initial theme on mount
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const isDark = theme === "dark";
    const newTheme = isDark ? "light" : "dark";

    const switchTheme = () => {
      setTheme(newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  };

  // ScrollSpy to track active section dynamically
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      if (isManualScrollRef.current) return;

      // If at top / hero, clear active section
      if (window.scrollY < 200) {
        setActiveSection("");
        return;
      }

      // Check bottom of page
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 60) {
        setActiveSection("contact");
        return;
      }

      // Determine active section using comfortable trigger line (38% of viewport)
      const triggerLine = window.scrollY + window.innerHeight * 0.38;
      let current = "";

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= triggerLine) {
            current = item.id;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);
    };
  }, []);

  // Keyboard shortcut for command palette
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

  // Smart smooth scrolling: centers short sections (like About) or offsets tall ones nicely below fixed navbar
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const navHeight = 64; // Header height
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + window.scrollY;
    const elementHeight = element.offsetHeight;
    const windowHeight = window.innerHeight;

    // Available height beneath fixed navbar
    const visibleSpace = windowHeight - navHeight;

    let targetY: number;

    // If section fits comfortably within the screen (like About),
    // CENTER IT vertically in the viewport so it feels comfortable and balanced!
    if (elementHeight < visibleSpace) {
      const verticalPadding = (visibleSpace - elementHeight) / 2;
      targetY = elementTop - navHeight - verticalPadding;
    } else {
      // If section is taller than screen (like Projects or Experience),
      // position its header comfortably below the fixed navbar with 28px breathing room
      targetY = elementTop - navHeight - 28;
    }

    setActiveSection(id);
    isManualScrollRef.current = true;
    if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);
    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 850);

    window.scrollTo({
      top: Math.max(0, Math.round(targetY)),
      behavior: "smooth",
    });

    window.history.pushState(null, "", `#${id}`);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    isManualScrollRef.current = true;
    setActiveSection("");
    if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);
    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 850);

    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", " ");
  };

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
          <a
            href="#"
            onClick={scrollToTop}
            className="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity cursor-pointer"
          >
            Fahrezi.
          </a>
          
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <LayoutGroup id="navbar-nav">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`relative px-3 py-2 text-sm transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-bar"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-foreground rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </LayoutGroup>

            <a
              href="/CV%20Mohammad%20Fahrezi%20Dev.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Resume
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-90 hover:scale-105 focus-visible:outline-none flex items-center justify-center p-2 rounded-md hover:bg-muted/40 cursor-pointer"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>
          </div>
        </div>
      </header>

      <CommandPalette open={open} setOpen={setOpen} />
    </>
  );
}

