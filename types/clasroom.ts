export interface User {
    id: string
    name: string
    role: UserRole
    isMuted: boolean
    isVideoOff: boolean
    isHandRaised: boolean
  }
  
  export type UserRole = 'teacher' | 'student'
  
  export interface Message {
    id: string
    userId: string
    userName: string
    content: string
    timestamp: Date
    type: 'chat' | 'system'
  }
  
  export interface AttendanceRecord {
    userId: string
    userName: string
    joinTime: Date
    leaveTime?: Date
    duration?: number
  }
  
  export interface AgoraConfig {
    appId: string
    channel: string
    token: string
    uid: string | null
  }

  

  export type Meeting = {
    id: string;
    hostId: string;
    topic: string;
    description: string;
    duration: number;
    startDate: Date; // ISO 8601 format (e.g., "2025-04-07T22:00:00.000Z")
    startTime: Date; // ISO 8601 format (specific to time, might be redundant with startDate depending on logic)
    endDate: Date;
    timeZone: string; // e.g., "(GMT-08:00) Pacific Time (US & Canada)"
    recurring: boolean;
    recurringType: string | null; // Could be an enum like 'DAILY' | 'WEEKLY' | 'MONTHLY' | null
    muteAudio: boolean;
    muteVideo: boolean;
    transcription: boolean;
    files: FileItem[]; // You can define a more specific type if you know the structure of a file
    createdAt: string;
    updatedAt: string;
  };

  export interface FileItem {
    id: string;
    uploader: string;
    name: string;
    type: string;
    url: string;
    meetingId: string;
    createdAt: Date; // Date object
    updatedAt: Date; // Date object
  }
  
  
  
  