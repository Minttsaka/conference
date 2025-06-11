"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, User, ChevronDown, ChevronUp, CheckCircle2, SkipForward } from "lucide-react"
import type { AgendaItem } from "@/types/meeting"
import {
  formatDuration,
  calculateTotalDuration,
  calculateElapsedTime,
  calculateRemainingTime,
  calculateProgress,
  getStatusColor,
  getPriorityColor,
  getStartTimeForAgendaItem,
  formatTime,
} from "@/lib/agenda"
import { Meeting } from "@/types/clasroom"

interface AgendaViewProps {
  meeting: Meeting
  isOpen: boolean
  onClose: () => void
}

export function AgendaView({ meeting, isOpen, onClose }: AgendaViewProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const totalDuration = calculateTotalDuration(meeting?.agendaItems as AgendaItem[])
  const elapsedTime = calculateElapsedTime(meeting?.agendaItems as AgendaItem[])
  const remainingTime = calculateRemainingTime(meeting?.agendaItems as AgendaItem[])
  const progress = calculateProgress(meeting?.agendaItems as AgendaItem[])

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600 animate-pulse" />
      case "skipped":
        return <SkipForward className="h-4 w-4 text-amber-600" />
      default:
        return <Clock className="h-4 w-4 text-slate-600" />
    }
  }

  const isCurrentAgendaItem = (item: AgendaItem) => {
    return item.status === "in-progress"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>Meeting Agenda</span>
            <Badge variant="outline" className="ml-2 text-xs font-normal">
              {formatDuration(totalDuration)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden">
          {/* Progress overview */}
          <div className="bg-slate-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <div className="text-xs text-slate-500">Elapsed</div>
                <div className="font-medium">{formatDuration(elapsedTime)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-500">Remaining</div>
                <div className="font-medium">{formatDuration(remainingTime)}</div>
              </div>
            </div>
          </div>

          {/* Timeline visualization */}
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 z-0"></div>

            <ScrollArea className="h-[calc(100vh-320px)] pr-4">
              <div className="space-y-3 relative pb-4">
                {(meeting?.agendaItems as AgendaItem[])?.map((item, index) => {
                  const isExpanded = expandedItems[item.id] || false
                  const isCurrentItem = isCurrentAgendaItem(item)
                  const startTime = getStartTimeForAgendaItem((meeting.agendaItems ?? []), item, meeting.startTime)

                  return (
                    <div
                      key={item.id}
                      className={`relative z-10 pl-10 pr-2 py-3 rounded-lg border transition-all ${
                        isCurrentItem
                          ? "border-blue-300 bg-blue-50 shadow-sm"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {/* Timeline node */}
                      <div
                        className={`absolute left-4 top-4 w-4 h-4 rounded-full z-20 transform -translate-x-1/2 ${
                          isCurrentItem
                            ? "bg-blue-500 ring-4 ring-blue-100"
                            : item.status === "completed"
                              ? "bg-green-500"
                              : item.status === "skipped"
                                ? "bg-amber-500"
                                : "bg-slate-300"
                        }`}
                      ></div>

                      <div className="flex justify-between items-start">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center">
                            <h3 className={`font-medium ${isCurrentItem ? "text-blue-700" : ""}`}>{item.title}</h3>
                            <Badge variant="secondary" className={`ml-2 ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </Badge>
                          </div>

                          <div className="flex items-center text-sm text-slate-500 space-x-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatDuration(item.duration)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>{formatTime(startTime)}</span>
                            </div>
                            {item.presenter && (
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{item.presenter}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge className={`${getStatusColor(item.status)}`}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(item.status)}
                              <span className="capitalize">{item.status.replace("-", " ")}</span>
                            </span>
                          </Badge>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toggleExpand(item.id)}
                          >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-200 text-sm">
                          {item.description && (
                            <div className="mb-2">
                              <div className="text-xs font-medium text-slate-500 mb-1">Description</div>
                              <p className="text-slate-700">{item.description}</p>
                            </div>
                          )}

                          {item.notes && (
                            <div className="mt-2">
                              <div className="text-xs font-medium text-slate-500 mb-1">Notes</div>
                              <p className="text-slate-700">{item.notes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
