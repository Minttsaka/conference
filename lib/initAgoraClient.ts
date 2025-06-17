import AgoraRTM from 'agora-rtm-react'

export const initAgoraClient = (appId: string) => {
  if (!appId) {
    throw new Error('Agora App ID is required')
  }
  return AgoraRTM.createInstance(appId, {
    logFilter: AgoraRTM.LOG_FILTER_WARNING,
  })
}

export interface ChatMessage {
  id: string ,
  senderId: string;
  senderName: string;
  content: string;
  recipientId?: string;
  channelName: string;
  recipientName?: string;
  recipientAvatar?: string;
  timestamp: number; // Unix timestamp
  status: "sending" | "sent" | "delivered" | "read" | "failed";
  type: "text" | "ai" | "effect" | "context" | "spatial" | "pdf" | "img" | "video";
  sentiment?: "neutral" | "positive" | "negative" | "excited" | "curious";
  translation?: { text: string; language: string };
  aiGenerated?: boolean;
  contextData?: { type: string; data: any };
  effect?: "pulse" | "glow" | "float" | "sparkle" | "wave" | "3d";
  priority?: "normal" | "high" | "urgent";
  reactions?: Array<{ emoji: string; userId: string }>;
  bookmarked?: boolean;
  spatial?: { x: number; y: number; z: number };
  metadata?: Record<string, any>;
  attachments?: Array<{
    id?: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    url: string;
    thumbnail?: string;
  }>;
  threadId?: string;
  edited?: boolean;
  editHistory?: Array<{
    content: string;
    editedAt: number;
  }>;
  mentions?: string[];
  tags?: string[];
  readBy?: string[];
  expiresAt?: number;
}

export type NewMessageData = {
  senderId: string;
  senderName: string;
  content: string;
  channelName: string;
  timestamp: number;
  status: "sending";
  type: "text" | "img";
  aiGenerated: boolean;
  priority: "normal";
};


export interface UserInfo {
  id: string
  name: string
  avatar?: string
}

export type ReactionMessage = {
  type: "reaction";
  emoji: string;
  senderId: string;
  senderName: string;
  senderAvatar : string,
  recipientId: string;
  timestamp: number;
};


export async function getAgoraToken(userId: string) {
  try {
    const response = await fetch('/api/agora-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    const data = await response.json()

    if (!response.ok) throw new Error(data.error)
      
    return data.token
  } catch (error) {
    console.error('Error getting Agora token:', error)
    throw error
  }
}

