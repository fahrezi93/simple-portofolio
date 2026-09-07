import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

interface HoveredProject {
  title: string;
  image: string;
  category?: string;
}

interface ProjectHoverPreviewProps {
  images?: string[];
}

export function ProjectHoverPreview({ images = [] }: ProjectHoverPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [activeProject, setActiveProject] = useState<HoveredProject | null>(null);
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const [cachedUrls, setCachedUrls] = useState<string[]>([]);
  const preloadedRef = useRef<Set<string>>(new Set());

  // Raw mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for floating follower effect
  const springConfig = { damping: 22, stiffness: 240, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 1. Just-In-Time preloader: warms up cache when user approaches the projects section
  useEffect(() => {
    let hasPreloaded = false;

    const startPreload = () => {
      if (hasPreloaded) return;
      hasPreloaded = true;

      const urlsToPreload = new Set<string>(images.filter(Boolean));
      const domCards = document.querySelectorAll(".project-card");
      domCards.forEach((card) => {
        const url = card.getAttribute("data-preview-image");
        if (url) urlsToPreload.add(url);
      });

      const uniqueList = Array.from(urlsToPreload);
      setCachedUrls(uniqueList);

      uniqueList.forEach((url) => {
        if (!preloadedRef.current.has(url)) {
          preloadedRef.current.add(url);
          const img = new window.Image();
          img.decoding = "async";
          img.src = url;
        }
      });
    };

    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.addEventListener("mouseenter", startPreload, { once: true, passive: true });
    }

    if ("IntersectionObserver" in window && projectsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            startPreload();
            observer.disconnect();
          }
        },
        { rootMargin: "400px 0px" }
      );
      observer.observe(projectsSection);

      return () => {
        observer.disconnect();
        if (projectsSection) {
          projectsSection.removeEventListener("mouseenter", startPreload);
        }
      };
    } else {
      // Fallback on idle
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(startPreload);
      } else {
        const timeout = setTimeout(startPreload, 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [images]);

  // 2. Mouse tracking & card detection
  useEffect(() => {
    setMounted(true);
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setIsHoverDevice(hasHover);

    if (!hasHover) return;

    let currentCard: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const previewWidth = 280;
      const previewHeight = 180;
      const margin = 24;

      let targetX = e.clientX + 24;
      let targetY = e.clientY + 20;

      if (targetX + previewWidth > window.innerWidth - margin) {
        targetX = e.clientX - previewWidth - 24;
      }

      if (targetY + previewHeight > window.innerHeight - margin) {
        targetY = e.clientY - previewHeight - 20;
      }

      mouseX.set(targetX);
      mouseY.set(targetY);

      // Detect card under cursor
      const target = (e.target as HTMLElement)?.closest(".project-card");
      if (target && target instanceof HTMLElement) {
        if (target !== currentCard) {
          currentCard = target;
          const image = target.getAttribute("data-preview-image");
          const title = target.getAttribute("data-preview-title") || "";
          if (image) {
            setActiveProject({ image, title });
          } else {
            setActiveProject(null);
          }
        }
      } else {
        if (currentCard) {
          currentCard = null;
          setActiveProject(null);
        }
      }
    };

    const handleMouseLeave = () => {
      currentCard = null;
      setActiveProject(null);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!mounted || !isHoverDevice) return null;

  return createPortal(
    <>
      {/* Hidden pre-rendered images to force GPU memory caching and decoding */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-[9999px] -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        {cachedUrls.map((url) => (
          <img
            key={url}
            src={url}
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="low"
          />
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)", transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            style={{
              x: smoothX,
              y: smoothY,
            }}
            className="pointer-events-none fixed left-0 top-0 z-50 w-72 select-none overflow-hidden rounded-xl border border-line/80 bg-card/95 p-1.5 shadow-2xl backdrop-blur-md dark:border-line/60 dark:shadow-black/70"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted/80">
              <img
                key={activeProject.image}
                src={activeProject.image}
                alt={activeProject.title}
                className="h-full w-full object-cover object-top transition-transform duration-500"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="truncate text-xs font-semibold tracking-tight text-foreground">
                {activeProject.title}
              </span>
              <span className="text-[10px] text-muted-foreground font-mono shrink-0 ml-2">
                Preview ↗
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}

