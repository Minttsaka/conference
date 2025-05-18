"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface SlideNotesProps {
  notes: string
  onClose: () => void
}

export default function SlideNotes({ notes: initialNotes, onClose }: SlideNotesProps) {
  const [notes, setNotes] = useState(initialNotes)

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute bottom-0 left-0 right-0 bg-[#0a0a1a]/90 backdrop-blur-md border-t border-[#1a1a2f] p-3 z-20 h-1/3 overflow-hidden"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-[10px] font-light uppercase tracking-wider text-cyan-400">Command Notes</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-cyan-400 h-6 w-6">
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="h-[calc(100%-2.5rem)]">
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your notes here..."
          className="h-full resize-none bg-[#0f0f1f] border-[#1a1a2f] text-slate-300 text-xs focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500/50"
        />
      </div>

      <Button
        className="absolute bottom-3 right-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-[10px] h-7 px-2 py-1 rounded-sm"
        size="sm"
      >
        <Save className="h-3 w-3 mr-1" />
        SAVE
      </Button>
    </motion.div>
  )
}
