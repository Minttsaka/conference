"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { nanoid } from "nanoid"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"
import { SessionPayload } from "@/lib/session"

type User = {
  id: string
  name: string
  email?: string
  image?: string
  agoraUid?: number
}

type Room = {
  id: string
  name: string
  description?: string
  isPrivate: boolean
  channelName: string
}

type Message = {
  id: string
  text: string
  sender: string
  senderId: string
  timestamp: Date
  isCurrentUser: boolean
  reactions: { emoji: string; userId: string }[]
  replyTo?: string
  replyToId?: string
  replyToSender?: string
  file?: {
    name: string
    url: string
  }
}

interface ChatInterfaceProps {
  user: SessionPayload
  rtm: any
  channelName: string
}

export default function ChatInterface({ user, rtm, channelName }: ChatInterfaceProps) {

  const [messages, setMessages] = useState<Message[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  // Fetch rooms on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        fetchMessages()
      } catch (error) {
        console.error("Error fetching rooms:", error)
       
      }finally {
        setIsLoading(false)
      }
    }

    fetchRooms()
  }, [])

  // Join room when socket connects or room changes
  useEffect(() => {

    if (!rtm) return

    // Message event handler
    const handleMessage = async (event: any) => {
      console.log("Message received:", event.publisher, event.message)

      try {
        const messageData = JSON.parse(event.message)
        console.log("Parsed message data:", messageData)

        if (messageData.type === "text") {
          // Instead of fetching all messages again, just update the local state
          // This provides a more responsive experience
          const newMsg: Message = {
            id: messageData.id || `${event.publisher}-${messageData.timestamp}`,
            text: messageData.text,
            senderId:user.userId,
            sender: messageData.sender || event.publisher,
            timestamp: new Date(messageData.timestamp),
            isCurrentUser: event.publisher === user.userId,
            reactions: messageData.reactions || [],
            replyTo: messageData.replyTo,
            replyToSender: messageData.replyToSender,
            file: messageData.file,
          }

          setMessages((prev) => {
            // Check if message already exists to prevent duplicates
            const messageExists = prev.some((msg) => msg.id === newMsg.id)
            if (messageExists) return prev
            return [...prev, newMsg]
          })

          // Optionally refresh from server to ensure consistency
          setTimeout(() => fetchMessages(), 1000)
        } else if (messageData.type === "reaction" && messageData.data) {
    
            setMessages((prev) =>
              prev.map((msg) => {
                if (msg.id === messageData.id) {
                  // Check if reaction already exists
                  const existingReaction = msg.reactions.find(
                    (r) => r.userId === messageData.reaction.userId && r.emoji === messageData.reaction.emoji,
                  )
      
                  if (existingReaction) {
                    // Remove reaction
                    return {
                      ...msg,
                      reactions: msg.reactions.filter((r) => !(r.userId === messageData.reaction.userId && r.emoji === messageData.reaction.emoji)),
                    }
                  } else {
                    // Add reaction
                    return {
                      ...msg,
                      reactions: [...msg.reactions, messageData.reaction],
                    }
                  }
                }
                return msg
              }),
            )
      
        }
      } catch (error) {
        console.error("Error parsing message:", error)
      }
    }

    // Presence event handler
    const handlePresence = (event: any) => {
      if (event.eventType === "SNAPSHOT") {
        console.log("Joined channel:", channelName)
      } else {
        console.log(`${event.publisher} is ${event.type}`)
      }
    }

    // Status event handler
    const handleStatus = (event: any) => {
      console.log("RTM status changed:", event.state, event.reason)
    }

    // Add event listeners
    rtm.addEventListener("message", handleMessage)
    rtm.addEventListener("presence", handlePresence)
    rtm.addEventListener("status", handleStatus)

    // Cleanup function
    return () => {
      if (rtm) {
        rtm.removeEventListener("message", handleMessage)
        rtm.removeEventListener("presence", handlePresence)
        rtm.removeEventListener("status", handleStatus)
      }
    }
 
  }, [rtm ,user, scrollToBottom])

  // Fetch message history
  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/message/${channelName}`)
      const data = await response.json()

      if (response.ok) {
        const formattedMessages = data.messages.map((msg: any) => ({
          ...msg,
          isCurrentUser: msg.userId === user.userId,
          sender: msg.user.name,
          senderId: msg.userId,
          timestamp: new Date(msg.createdAt),
          replyTo: msg.replyTo?.text,
          replyToSender: msg.replyTo?.user.name,
        }))

        setMessages(formattedMessages)
        scrollToBottom()
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
     
    }
  }

  // Send a message
  const sendMessage = async (text: string, file?: { name: string; url: string }) => {
    // if (!socket || !isConnected || !currentRoom) {
    //   toast({
    //     title: "Not connected",
    //     description: "You are not connected to the chat server",
    //     variant: "destructive",
    //   })
    //   return
    // }

    try {
      const messageId = nanoid()
      const timestamp = new Date()

      const message: Message = {
        id: messageId,
        text,
        sender: user.name,
        senderId: user.userId,
        timestamp,
        isCurrentUser: true,
        reactions: [],
        file,
      }

      // Add reply data if replying to a message
      if (replyingTo) {
        message.replyTo = replyingTo.text
        message.replyToId = replyingTo.id
        message.replyToSender = replyingTo.sender
      }

      // Add to local messages immediately for UI responsiveness
      setMessages((prev) => [...prev, message])

      // Clear reply state
      setReplyingTo(null)

      // Emit to socket
      //socket.emit("send-message", currentRoom.id, message)

      // Save to database
      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: currentRoom?.id,
          text,
          replyToId: replyingTo?.id,
          fileUrl: file?.url,
          fileName: file?.name,
        }),
      })

      scrollToBottom()
    } catch (error) {
      console.error("Error sending message:", error)
      
    }
  }

  // Add reaction to a message
  const addReaction = async (messageId: string, emoji: string) => {
   // if (!socket || !isConnected || !currentRoom) return

    try {
      const reaction = {
        emoji,
        userId: user.userId,
        userName: user.name,
      }

      // Emit to socket
      //socket.emit("add-reaction", currentRoom.id, messageId, reaction)

      // Save to database
      await fetch("/api/reactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId,
          emoji,
        }),
      })
    } catch (error) {
      console.error("Error adding reaction:", error)
    }
  }

  // Handle typing indicator
  const handleTyping = () => {
    //if (!socket || !isConnected || !currentRoom) return

   // socket.emit("typing", currentRoom.id, user.userId)

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      //socket.emit("stop-typing", currentRoom.id, user.userId)
    }, 2000)
  }


  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Background grid effect */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent p-4">
            <MessageList
              messages={messages}
              setReplyingTo={setReplyingTo}
              addReaction={addReaction}
              currentUserId={user.userId}
            />
            <div ref={messagesEndRef} />
          </div>

          <MessageInput
            onSendMessage={sendMessage}
            onTyping={handleTyping}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
          />
        </div>
      </div>
    </div>
  )
}
