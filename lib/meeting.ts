import { Meeting } from '@/types/clasroom'
import { v4 as uuidv4 } from 'uuid'
import { SessionPayload } from './session'
import { nanoid } from 'nanoid'

const now = new Date()

export const dummyMeeting: Meeting = {
  id: uuidv4(),
  hostId: "teacher-001",
  topic: "Introduction to React",
  host: {
    id: "teacher-001",
    name: "Alice Johnson",
    email: "alice.johnson@school.edu"
  },
  lesson: null,
  agendaItems: [
    {
      id: uuidv4(),
      title: "What is React?",
      duration: 15,
      description: "An overview of the React library and its use in modern web development.",
      presenter: "Alice Johnson",
      status: "in-progress",
      priority: "high",
      notes: "Focus on SPA concept.",
      meetingId: "meeting-001",
      createdAt: now,
      updatedAt: now
    },
    {
      id: uuidv4(),
      title: "JSX Syntax",
      duration: 10,
      status: "pending",
      priority: "medium",
      meetingId: "meeting-001",
      createdAt: now,
      updatedAt: now
    }
  ],
  type: "LESSON",
  agenda: true,
  description: "Kick-off meeting for the React course. Covering basics and getting students started with JSX.",
  duration: 60,
  startDate: new Date("2025-06-16T10:00:00.000Z"),
  startTime: new Date("2025-06-16T10:00:00.000Z"),
  endDate: new Date("2025-06-16T11:00:00.000Z"),
  timeZone: "(GMT+02:00) Central Africa Time",
  recurring: false,
  recurringType: null,
  muteAudio: true,
  muteVideo: true,
  transcription: true,
  files: [
    {
      id: uuidv4(),
      uploader: "teacher-001",
      name: "React_Intro_Slides.pdf",
      type: "application/pdf",
      url: "https://example.com/files/react_intro_slides.pdf",
      meetingId: "meeting-001",
      createdAt: now,
      updatedAt: now
    }
  ],
  createdAt: now.toISOString(),
  updatedAt: now.toISOString()
}



export const user : SessionPayload = {
  userId :uuidv4(),
  name: "Bob Smith",
  email: "bob.smith@student.school.edu",
  expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 // Expires in 1 hour (Unix timestamp)
}
