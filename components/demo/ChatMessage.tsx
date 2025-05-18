"use client"

import { useEffect, useState } from "react"
import { initializeAgoraRTM } from "./agora"
import { VideoRoomProps } from "@/types/video"
import ChatInterface from "../futuristicChat/ChatInterface"

export default function ChatPage({ user, meetingId }: VideoRoomProps) {
  const [rtm, setRtm] = useState<any>(null)
  const [channelName, setChannelName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const setupRTM = async () => {
      try {
        setIsLoading(true)

        const { rtm, channelName } = await initializeAgoraRTM(user, meetingId)

        setRtm(rtm)
        setChannelName(channelName)
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
    <div className=" bg-gray-950">
      {rtm && channelName ? (
        <ChatInterface user={user} rtm={rtm} channelName={channelName} />
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-white text-center">
            <p className="text-lg">Failed to connect to chat. Please try again.</p>
          </div>
        </div>
      )}
    </div>
  )
}
