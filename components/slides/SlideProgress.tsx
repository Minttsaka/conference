"use client"

import { motion } from "framer-motion"

interface SlideProgressProps {
  currentSlide: number
  totalSlides: number
  onChange: (index: number) => void
}

export default function SlideProgress({ currentSlide, totalSlides, onChange }: SlideProgressProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className="relative h-1 w-8 rounded-full overflow-hidden bg-[#1a1a2f]/50 backdrop-blur-sm"
        >
          {currentSlide === index && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
              layoutId="slideIndicator"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
