"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ClipboardList } from "lucide-react"
import { AgendaView } from "./AgendaView"
import type { Meeting } from "@/types/clasroom"
import { calculateProgress } from "@/lib/agenda"

interface FloatingAgendaButtonProps {
  meeting: Meeting
  position?: "top-right" | "bottom-right" | "bottom-left" | "top-left"
}

export function AgendaButton({ meeting, position = "bottom-right" }: FloatingAgendaButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const progress = calculateProgress(meeting.agendaItems ?? [])

  const positionClasses = {
    "top-right": "top-4 right-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-left": "top-4 left-4",
  }

  return (
    <>
      <div className={``}>
        <Button onClick={() => setIsOpen(true)} className="rounded-full shadow-lg flex items-center gap-2 pr-4">
          <div className="relative">
            <ClipboardList className="h-4 w-4" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className=" flex-col hidden md:flex items-start">
            <span className="text-xs   leading-none">Agenda</span>
            <span className="text-[10px] opacity-80 leading-tight">{progress}% complete</span>
          </div>
        </Button>
      </div>

      <AgendaView meeting={meeting} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
