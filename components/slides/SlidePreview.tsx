"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SlidePreviewProps {
  slides: Array<{
    id: number
    title: string
    content: string
  }>
  currentSlide: number
  onSelect: (index: number) => void
  onClose: () => void
}

export default function SlidePreview({ slides, currentSlide, onSelect, onClose }: SlidePreviewProps) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute top-0 right-0 bottom-0 bg-[#0a0a1a]/90 backdrop-blur-md border-l border-[#1a1a2f] p-3 z-20 w-64 overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[10px] font-light uppercase tracking-wider text-cyan-400">Slide Layers</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-cyan-400 h-6 w-6">
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-2">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(index)}
            className={cn(
              "cursor-pointer rounded-sm overflow-hidden border",
              currentSlide === index ? "border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.3)]" : "border-[#1a1a2f]",
            )}
          >
            <div className="bg-gradient-to-r from-[#0f0f1f] to-[#1a1a2f] p-1.5 text-[8px] font-light uppercase tracking-wider">
              <span className={currentSlide === index ? "text-cyan-400" : "text-slate-400"}>{slide.title}</span>
            </div>
            <div className="bg-[#0f0f1f] p-1.5">
              <p className="text-[8px] text-slate-400 line-clamp-2">{slide.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
