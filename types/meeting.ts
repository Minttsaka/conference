export type MeetingStatus = "pending" | "in-progress" | "completed" | "skipped"
export type MeetingPriority = "low" | "medium" | "high"

export interface AgendaItem {
  id: string
  title: string
  duration: number // in minutes
  description?: string
  presenter?: string
  status: MeetingStatus
  priority: MeetingPriority
  notes?: string
  meetingId: string
  createdAt: Date
  updatedAt: Date
}
