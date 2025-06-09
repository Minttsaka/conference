"use client"

import { useState, useRef, useEffect, SetStateAction, Dispatch  } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useAnimationControls } from "framer-motion"
import { ChevronLeft, ChevronRight, Layers, Command, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import SlideContent from "./SlideContent"
import SlideProgress from "./SlideProgress"
import SlideNotes from "./SlideNotes"
import SlidePreview from "./SlidePreview"

const slides = [
  {
    id: 1,
    title: "Project Overview",
    content: "Introduction to our new product line",
    notes: "Remember to emphasize market research findings",
  },
  {
    id: 2,
    title: "Market Analysis",
    content: "Current trends and competitor landscape",
    notes: "Include the latest quarterly reports",
  },
  {
    id: 3,
    title: "Product Features",
    content: "Key differentiators and unique selling points",
    notes: "Demo the AR integration if time permits",
  },
  {
    id: 4,
    title: "Launch Strategy",
    content: "Timeline, channels, and marketing approach",
    notes: "Confirm budget allocation with finance team",
  },
  {
    id: 5,
    title: "Next Steps",
    content: "Action items and responsibilities",
    notes: "Schedule follow-up meeting for next week",
  },
]

export default function SlidePresentation({ lesson , setIsSlidesOpen}:{ lesson : any , setIsSlidesOpen: Dispatch<SetStateAction<boolean>>}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const constraintsRef = useRef(null)
  const controls = useAnimationControls()

  const x = useMotionValue(0)
  const springX = useSpring(x, { damping: 15, stiffness: 150 })
  const scale = useTransform(springX, [-window.innerWidth / 2, 0, window.innerWidth / 2], [0.85, 1, 0.85])
  const opacity = useTransform(springX, [-window.innerWidth / 2, 0, window.innerWidth / 2], [0.2, 1, 0.2])
  const rotateY = useTransform(springX, [-window.innerWidth / 2, 0, window.innerWidth / 2], [25, 0, -25])
  const blur = useTransform(springX, [-window.innerWidth / 2, 0, window.innerWidth / 2], [3, 0, 3])

  const handleDragEnd = (event, info) => {
    setIsDragging(false)
    const threshold = 80

    if (info.offset.x < -threshold && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else if (info.offset.x > threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else {
      controls.start({ x: 0 })
    }
  }

  useEffect(() => {
    controls.start({ x: 0 })
  }, [currentSlide, controls])

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  return (
    <div className="fixed inset-0 z-50  w-full h-screen overflow-hidden bg-[#050510] bg-opacity-30 flex flex-col">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div> */}
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex justify-between items-center p-3 bg-[#0a0a1a]/80 backdrop-blur-md border-b border-[#1a1a2f]">
        <div className="flex items-center gap-2">
          <div className="text-xs font-light tracking-wider text-cyan-400 uppercase">
            <span className="text-[10px]">
              Slide {currentSlide + 1}/{slides.length}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPreview(!showPreview)}
            className={cn(
              "text-slate-400 hover:text-cyan-400 hover:bg-[#1a1a2f] transition-all duration-300 h-7 w-7 rounded-md",
              showPreview && "bg-[#1a1a2f] text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]",
            )}
          >
            <Layers className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotes(!showNotes)}
            className={cn(
              "text-slate-400 hover:text-cyan-400 hover:bg-[#1a1a2f] transition-all duration-300 h-7 w-7 rounded-md",
              showNotes && "bg-[#1a1a2f] text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]",
            )}
          >
            <Command className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSlidesOpen((prev)=>!prev)}
            className={cn(
              "text-slate-400 hover:text-cyan-400 hover:bg-[#1a1a2f] transition-all duration-300 h-7 w-7 rounded-md",
              showNotes && "bg-[#1a1a2f] text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]",
            )}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative" ref={constraintsRef}>
        <motion.div
          className="absolute inset-0 flex items-center justify-center perspective-[1200px]"
          animate={controls}
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.05}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          style={{ x: springX }}
        >
          <motion.div
            className="w-[90%] max-w-4xl aspect-[16/9] bg-[#0a0a1a] rounded-md shadow-[0_0_30px_rgba(8,8,20,0.8)] overflow-hidden border border-[#1a1a2f]"
            style={{
              scale,
              opacity,
              rotateY,
              filter: `blur(${blur}px)`,
              transformStyle: "preserve-3d",
            }}
          >
            <SlideContent slides={slides} slide={slides[currentSlide]} />
          </motion.div>
        </motion.div>

        {/* Slide Navigation */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="bg-[#0a0a1a]/70 backdrop-blur-md border-[#1a1a2f] text-slate-300 hover:bg-[#1a1a2f] hover:text-cyan-400 h-7 w-7 rounded-md disabled:opacity-30 transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <SlideProgress currentSlide={currentSlide} totalSlides={slides.length} onChange={setCurrentSlide} />

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="bg-[#0a0a1a]/70 backdrop-blur-md border-[#1a1a2f] text-slate-300 hover:bg-[#1a1a2f] hover:text-cyan-400 h-7 w-7 rounded-md disabled:opacity-30 transition-all duration-300"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Drag Indicator */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
            >
              <div className="bg-[#0a0a1a]/70 backdrop-blur-md px-3 py-1.5 rounded-full text-cyan-400 text-[10px] tracking-wider uppercase border border-[#1a1a2f] shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                Swipe to navigate
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Notes Panel */}
      <AnimatePresence>
        {showNotes && <SlideNotes notes={slides[currentSlide].notes} onClose={() => setShowNotes(false)} />}
      </AnimatePresence>

      {/* Preview Panel */}
      <AnimatePresence>
        {showPreview && (
          <SlidePreview
            slides={slides}
            currentSlide={currentSlide}
            onSelect={setCurrentSlide}
            onClose={() => setShowPreview(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
