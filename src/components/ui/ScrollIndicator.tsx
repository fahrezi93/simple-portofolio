"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "github", label: "Open Source" },
  { id: "contact", label: "Contact" },
]

export function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState<string>("hero")

  useEffect(() => {
    const handleScroll = () => {
      // Find the section that is currently most visible
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      let current = "hero";
      
      for (const { id } of SECTIONS) {
        const element = document.getElementById(id);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            current = id;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-6 xl:right-12 top-1/2 -translate-y-1/2 flex-col items-end gap-3 z-50 hidden md:flex mix-blend-difference text-white">
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            title={label}
            className="group relative flex items-center py-1"
            aria-label={`Scroll to ${label}`}
          >
            <span 
              className={cn(
                "h-[2px] transition-all duration-300 rounded-full",
                isActive 
                  ? "w-8 bg-foreground dark:bg-foreground" 
                  : "w-4 bg-muted-foreground/40 group-hover:bg-muted-foreground/80 group-hover:w-6"
              )} 
              // Force background colors for mix-blend-difference to work well
              style={{ backgroundColor: isActive ? '#fff' : 'rgba(255, 255, 255, 0.4)' }}
            />
          </a>
        )
      })}
    </div>
  )
}
