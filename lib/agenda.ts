import type { AgendaItem, MeetingStatus } from "@/types/meeting"

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours > 0) {
    return `${hours}h ${mins > 0 ? `${mins}m` : ""}`
  }
  return `${mins}m`
}

export function calculateTotalDuration(items: AgendaItem[]): number {
  return items?.reduce((total, item) => total + item.duration, 0)
}

export function calculateElapsedTime(items: AgendaItem[]): number {
  return items?.filter((item) => item.status === "completed").reduce((total, item) => total + item.duration, 0)
}

export function calculateRemainingTime(items: AgendaItem[]): number {
  return items
    ?.filter((item) => item.status === "pending" || item.status === "in-progress")
    ?.reduce((total, item) => total + item.duration, 0)
}

export function calculateProgress(items: AgendaItem[]): number {
  const completed = items?.filter((item) => item.status === "completed").length
  return items?.length > 0 ? Math.round((completed / items.length) * 100) : 0
}

export function getStatusColor(status: MeetingStatus): string {
  switch (status) {
    case "pending":
      return "bg-slate-200 text-slate-700"
    case "in-progress":
      return "bg-blue-100 text-blue-700"
    case "completed":
      return "bg-green-100 text-green-700"
    case "skipped":
      return "bg-amber-100 text-amber-700"
    default:
      return "bg-slate-200 text-slate-700"
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "low":
      return "bg-slate-100 text-slate-700"
    case "medium":
      return "bg-blue-100 text-blue-700"
    case "high":
      return "bg-rose-100 text-rose-700"
    default:
      return "bg-slate-100 text-slate-700"
  }
}

export function getStartTimeForAgendaItem(items: AgendaItem[], currentItem: AgendaItem, meetingStartTime: Date): Date {
  let totalMinutesBefore = 0

  for (const item of items) {
    if (item.id === currentItem.id) {
      break
    }
    if (item.status !== "skipped") {
      totalMinutesBefore += item.duration
    }
  }

  const startTime = new Date(meetingStartTime)
  startTime.setMinutes(startTime.getMinutes() + totalMinutesBefore)
  return startTime
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}
