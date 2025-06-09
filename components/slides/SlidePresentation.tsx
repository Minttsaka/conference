"use client"

import {  SetStateAction, Dispatch  } from "react"
import {  X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Lesson from "../lesson/Lesson"

export default function SlidePresentation({ lesson , setIsSlidesOpen}:{ lesson : any , setIsSlidesOpen: Dispatch<SetStateAction<boolean>>}) {

  return (
    <div className="fixed inset-0 z-50  w-full h-screen overflow-hidden bg-[#050510] bg-opacity-30 flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-3 bg-[#0a0a1a]/80 backdrop-blur-md border-b border-[#1a1a2f]">
        <div className="flex items-center gap-2">
          <div className="text-xs font-light tracking-wider text-cyan-400 uppercase">
            <span className="text-[10px]">
              {lesson.name}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSlidesOpen((prev)=>!prev)}
            className={cn(
              "text-slate-400 hover:text-cyan-400 hover:bg-[#1a1a2f] transition-all duration-300 h-7 w-7 rounded-md",
              true && "bg-[#1a1a2f] text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]",
            )}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-screen overflow-y-auto max-w-7xl mx-auto">
        <Lesson lesson={lesson} />
      </div>
      
    </div>
  )
}
