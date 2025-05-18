"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ChatInterface from "./ChatMessage"
import UsersList from "./Offline"
import { initializeAgoraRTM } from "./agora"

export default function ChatPage() {
  const router = useRouter()
  const [username, setUsername] = useState<string | null>(null)
  const [rtmClient, setRtmClient] = useState<any>(null)
  const [channel, setChannel] = useState<any>(null)
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // Add this state for error handling
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedUsername = prompt('enter user name') as string

    setUsername(storedUsername)

    // Initialize Agora RTM - only run in browser
    // Update the setupAgora function to handle errors better
    const setupAgora = async () => {
      try {
        // Make sure we're on the client side
        if (typeof window !== "undefined") {
          const { client, channel } = await initializeAgoraRTM(storedUsername)
          setRtmClient(client)
          setChannel(channel)

          // Set up channel event listeners
          channel.on("MemberJoined", (memberId: string) => {
            console.log("Member joined:", memberId)
            setOnlineUsers((prev) => [...prev, memberId])
          })

          channel.on("MemberLeft", (memberId: string) => {
            console.log("Member left:", memberId)
            setOnlineUsers((prev) => prev.filter((id) => id !== memberId))
          })

          // Get channel members
          const members = await channel.getMembers()
          console.log("Channel members:", members)
          setOnlineUsers(members)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to initialize Agora RTM:", error)
        setError("Failed to connect to chat. Please try again later.")
        setIsLoading(false)
      }
    }

    setupAgora()

    return () => {
      // Clean up Agora RTM
      if (channel) {
        channel.leave()
      }
      if (rtmClient) {
        rtmClient.logout()
      }
    }
  }, [router])

  const handleLogout = async () => {
    if (channel) {
      await channel.leave()
    }
    if (rtmClient) {
      await rtmClient.logout()
    }
    localStorage.removeItem("username")
    router.push("/")
  }

  // Update the render to show error state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading chat...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg text-red-600">{error}</p>
        <button onClick={() => router.push("/")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go back to login
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Users</h2>
            <div className="text-sm text-gray-500">{onlineUsers.length} online</div>
          </div>
        </div>
        <UsersList users={onlineUsers} currentUser={username || ""} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h1 className="text-xl font-semibold">Agora Chat</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Logged in as <span className="font-semibold">{username}</span>
            </div>
            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">
              Logout
            </button>
          </div>
        </div>
        <ChatInterface username={username || ""} channel={channel} />
      </div>
    </div>
  )
}
