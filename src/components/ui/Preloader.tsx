import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MobiusLoopIcon } from "./mobius-loop-icon";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader when everything is loaded, or after a maximum of 2 seconds
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 500); // small delay to ensure smooth transition
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback in case load event never fires
      const fallbackTimer = setTimeout(handleLoad, 2000);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <MobiusLoopIcon className="w-16 h-16 text-foreground" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
