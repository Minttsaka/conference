"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SlideCalendarProps {
  onClose: () => void
}

export default function SlideCalendar({ onClose }: SlideCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(20)
  const [showModal, setShowModal] = useState(false)

  const days = ["M", "T", "W", "T", "F", "S", "S"]
  const dates = [
    { day: 31, month: "Mar", current: false },
    ...Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      month: "Apr",
      current: true,
      hasEvent: [6, 12, 20, 25].includes(i + 1),
    })),
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl overflow-hidden w-full max-w-md shadow-2xl"
      >
        <div className="bg-slate-100 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-700">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h3 className="text-xl font-bold text-slate-800">APR</h3>
            <Button variant="ghost" size="icon" className="text-slate-700">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-700">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-2">
          {/* Days of week */}
          <div className="grid grid-cols-7 text-center mb-2">
            {days.map((day, i) => (
              <div
                key={day + i}
                className={cn("py-2 text-sm font-medium", i === 6 ? "text-red-500" : "text-slate-600")}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {dates.map((date, i) => (
              <motion.button
                key={`${date.month}-${date.day}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedDate(date.day)
                  if (date.day === 20) setShowModal(true)
                }}
                className={cn(
                  "relative aspect-square rounded-full flex flex-col items-center justify-center text-sm",
                  !date.current && "text-slate-400",
                  date.current && i % 7 === 6 && "text-red-500",
                  date.current && i % 7 !== 6 && "text-slate-700",
                  selectedDate === date.day && date.current && "bg-purple-100 text-purple-700 font-medium",
                )}
              >
                {date.day}
                {date.hasEvent && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-purple-500"></span>}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selected date info */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-red-500 text-white w-10 h-10 rounded-md flex items-center justify-center font-bold">
                {selectedDate}
              </div>
              <div className="text-slate-800 font-medium">{selectedDate === 20 ? "Sunday" : ""}</div>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-700">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Day modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute inset-0 bg-white rounded-xl overflow-hidden w-full max-w-md shadow-2xl z-10"
        >
          <div className="flex justify-between items-center p-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="bg-red-500 text-white w-10 h-10 rounded-md flex items-center justify-center font-bold">
                20
              </div>
              <div className="text-slate-800 font-medium">Sunday</div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowModal(false)} className="text-slate-700">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 flex flex-col items-center justify-center h-[300px] text-slate-500">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                😊
              </motion.div>
            </div>
            <p className="text-center">Tap to add a sticker to this day.</p>
          </div>

          <div className="border-t border-slate-200 p-4">
            <Button className="w-full bg-slate-100 text-slate-700 hover:bg-slate-200">Add on 20 Apr</Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
