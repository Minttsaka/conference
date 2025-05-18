"use client"

import { motion } from "framer-motion"
import { Zap } from "lucide-react"

interface SlideContentProps {
  slide: {
    id: number
    title: string
    content: string
    notes?: string
  }
  slides: {
    id: number
    title: string
    content: string
    notes?: string
  }[]
}

export default function SlideContent({ slide, slides }: SlideContentProps) {
  return (
    <div className="w-full h-full bg-[#0a0a1a] flex flex-col">
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9InN2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjMWExYTJmIiBmaWxsLW9wYWNpdHk9IjAuNCI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02di00aC0ydjRoMnpNMzAgMzRoLTV2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0yNCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10 z-0"></div>

      {/* Slide Header */}
      <div className="relative z-10 bg-gradient-to-r from-[#0f0f1f] via-[#1a1a2f] to-[#0f0f1f] p-4 text-white border-b border-[#1a1a2f]">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-1 rounded-md">
            <Zap className="h-3 w-3 text-black" />
          </div>
          <h2 className="text-[11px] font-light uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            {slide.title}
          </h2>
        </motion.div>
      </div>

      {/* Slide Body */}
      <div className="flex-1 p-6 flex flex-col justify-center items-center relative z-10">
        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs text-slate-300 leading-relaxed">{slide.content}</p>

          {/* Decorative Elements */}
          <div className="absolute bottom-4 left-4 w-16 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent opacity-50"></div>
          <div className="absolute top-4 right-4 w-16 h-[1px] bg-gradient-to-l from-purple-500 to-transparent opacity-50"></div>
        </motion.div>
      </div>

      {/* Slide Footer */}
      <div className="relative z-10 p-3 border-t border-[#1a1a2f] flex justify-between items-center">
        <div className="text-[8px] text-slate-500 uppercase tracking-wider">Nexus Presentation</div>
        <div className="text-[8px] text-slate-500 uppercase tracking-wider">
          <span className="text-cyan-400">{slide.id}</span>.<span className="text-purple-400">{slides.length}</span>
        </div>
      </div>
    </div>
  )
}
