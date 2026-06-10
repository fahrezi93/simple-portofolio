import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export interface ProjectData {
  title: string;
  description: string;
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  technologies: string[];
}

export function ProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    const handleOpenModal = (e: any) => {
      setProject(e.detail);
      setIsOpen(true);
      
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    };

    window.addEventListener("open-project-modal", handleOpenModal);
    return () => {
      window.removeEventListener("open-project-modal", handleOpenModal);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setProject(null);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }, 300);
  };

  // Use state to avoid hydration mismatch with portal
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-md"
              aria-label="Close modal"
            >
              <X className="size-4" />
            </button>

            {/* Image */}
            {project.image_url ? (
              <div className="w-full h-48 sm:h-80 shrink-0 relative bg-muted overflow-hidden border-b border-border">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-32 shrink-0 bg-muted flex items-center justify-center border-b border-border">
                 <span className="text-muted-foreground font-medium text-sm">No Image Provided</span>
              </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <h2 className="text-2xl font-bold tracking-tight mb-3 text-card-foreground">
                {project.title}
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies?.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-xs font-medium rounded bg-secondary text-secondary-foreground border border-border">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground mb-8 leading-relaxed">
                <p>{project.description}</p>
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border">
                {project.github_url && project.github_url !== "#" && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-colors"
                  >
                    <FaGithub className="size-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.demo_url && project.demo_url !== "#" && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors"
                  >
                    <ExternalLink className="size-4" />
                    <span>Live Project</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
