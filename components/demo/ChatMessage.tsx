"use client"

import { useEffect, useState } from "react"
import { initializeAgoraRTM } from "../../lib/agora"
import { VideoRoomProps } from "@/types/video"
import ChatInterface from "../futuristicChat/ChatInterface"
import { SessionPayload } from "@/lib/session"

export default function ChatPage({ user, meetingId }: {user:SessionPayload, meetingId:string}) {
  const [rtm, setRtm] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const setupRTM = async () => {
      try {
        setIsLoading(true)

        const { rtm } = await initializeAgoraRTM(user, `${meetingId}chat`)

        setRtm(rtm)
      } catch (error) {
        console.error("Failed to initialize Agora RTM:", error)
      } finally {
        setIsLoading(false)
      }
    }

    setupRTM()

  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Connecting to chat...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-950">
      {meetingId ? (
        <ChatInterface user={user} rtm={rtm} channelName={`${meetingId}chat`} />
      ) : (
        <div className="flex items-center justify-center">
          <div className="text-white text-center">
            <p className="text-lg">Failed to connect to chat. Please try again.</p>
          </div>
        </div>
      )}
    </div>
  )
}
