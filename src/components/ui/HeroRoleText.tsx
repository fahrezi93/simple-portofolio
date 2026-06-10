import { motion } from "motion/react";
import { TextFlip } from "./text-flip";

const WORDS = ["Developer", "AI Engineer", "Designer", "Video Editor"];

export function HeroRoleText() {
  return (
    <span className="inline-grid">
      {/* Placeholder for the tallest/widest word */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {WORDS.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <TextFlip
        as={motion.span}
        className="col-start-1 row-start-1 text-foreground font-medium"
      >
        {WORDS.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </TextFlip>
    </span>
  );
}
