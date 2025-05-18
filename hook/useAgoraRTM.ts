"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { toast } from "sonner"
import { getAgoraToken, initAgoraClient, ReactionMessage } from "@/lib/initAgoraClient"
import { FileItem } from "@/types/clasroom"
import { getFiles } from "@/lib/api"
import { getSession, SessionPayload } from "@/lib/session"
import { initializeAgoraRTM, publishMessage } from "@/components/demo/agora"

interface UseAgoraRTMProps {
  appId: string
  channel: string
  uid: string | undefined
  user: SessionPayload
  role?: "host" | "audience"
}

export function useAgoraRTM({ appId, user, channel, uid, role = "audience" }: UseAgoraRTMProps) {
  const [isRTMConnected, setIsRTMConnected] = useState(false)
  const [raisedHands, setRaisedHands] = useState<Set<string>>(new Set())
  const [pendingRequests, setPendingRequests] = useState<Map<string, { name: string; timestamp: number }>>(new Map())
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set())
  const [privateMessages, setPrivateMessages] = useState<Map<string, Array<any>>>(new Map())
  const [reactions, setReactions] = useState<Set<ReactionMessage>>(new Set())
  const [files, setFiles] = useState<FileItem[]>([])
  const [fileChannel, setChannelName] = useState<string>(`${channel}file`)

  const rtmClientRef = useRef<any>(null)
  const rtmChannelRef = useRef<any>(null)
  const eventListenersSet = useRef(false)

   const [rtm, setRtm] = useState<any>(null)
    
    const [isLoading, setIsLoading] = useState(true)
  
    const setupRTM = async () => {
      try {
        setIsLoading(true)

        const { rtm } = await initializeAgoraRTM(user, fileChannel)

        setRtm(rtm)
        console.log('rtm',rtm)
      
      } catch (error) {
        console.error("Failed to initialize Agora RTM:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const loadFiles = async () => {
      try {

        const response = await getFiles(channel)
  
      if(response.success){
        setFiles(() => [...response.data]);
      }
        
      } catch (error) {
        
      }
    }

   

  useEffect(() => {
    setupRTM()
    loadFiles()

  }, [])


useEffect(() => {
    if (!rtm || eventListenersSet.current) return



    // Presence event handler
    const handlePresence = (event: any) => {
      if (event.eventType === "SNAPSHOT") {
        console.log("Joined channel:", fileChannel)
      } else {
        console.log(`${event.publisher} is ${event.type}`)
      }
    }

    // Status event handler
    const handleStatus = (event: any) => {
      console.log("RTM status changed:", event.state, event.reason)
    }

    // Add event listeners
    rtm.addEventListener("message", async(event) => {
      console.log("message list",event.publisher, event.message);

      try {
        const messageData = JSON.parse(event.message)
        console.log("Received message:", messageData)

        if (messageData.type === "file") {
      
          loadFiles()

        } else if (messageData.type === "reaction" && messageData.data) {
         

          
        }
      } catch (error) {
        console.error("Error parsing message:", error)
      }
    })
    rtm.addEventListener("presence", handlePresence)
    rtm.addEventListener("status", handleStatus)

    eventListenersSet.current = true

    // Cleanup function
    return () => {
      if (rtm) {
        rtm.removeEventListener("message",event => {
      console.log("message list",event.publisher, event.message);
    })
        rtm.removeEventListener("presence", handlePresence)
        rtm.removeEventListener("status", handleStatus)
      }
    }
  }, [rtm, channel, user.userId])

  // Handle channel messages (hand raise events)
  const handleChannelMessage = useCallback(async(message: any) => {

    const messageData = JSON.parse(message.text)

    if ( messageData.type === "raised") {
      // Add to raised hands set
      setRaisedHands((prev) => {
        const newSet = new Set(prev)
        newSet.add( messageData.userId)
        return newSet
      })

        setPendingRequests((prev) => {
          const newMap = new Map(prev)
          newMap.set( messageData.userId, {
            name:  messageData.userId.split("-")[4] ||  messageData.userId,
            timestamp: Date.now(),
          })
          return newMap
        })

        // Show notification to host
        toast.info(`${ messageData.userId.split("-")[4] ||  messageData.userId} raised their hand`, {
          action: {
            label: "View",
            onClick: () => {
              // This could open the participants panel or focus on that user
              console.log("View hand raise request from",  messageData.userId)
            },
          },
        })
   
    } else if ( messageData.type === "lowered") {
      // Remove from raised hands set
      setRaisedHands((prev) => {
        const newSet = new Set(prev)
        newSet.delete( messageData.userId)
        return newSet
      })

      // If current user is host, remove from pending requests

        setPendingRequests((prev) => {
          const newMap = new Map(prev)
          newMap.delete( messageData.userId)
          return newMap
        })
    } else if ( messageData.type === "reaction") {

      // Remove from raised hands set
      setReactions((prev) => {
        const newSet = new Set(prev)
        newSet.add(messageData)
        return newSet
      })
    } else if ( messageData.type === "file"){

      alert("file")
      
      const response = await getFiles(channel)
      
      if(response.success){
        setFiles(() => [...response.data]);
      }

    }

  }, [])

  
  // Toggle hand raise state
  const toggleHand = useCallback(
    async (userId: string) => {
      if (!rtmChannelRef.current || !isRTMConnected) {
        toast.error("Chat service not connected")
        return
      }
  
      try {
        const newHandState = !isHandRaised
  
        const message = JSON.stringify({
          type: newHandState ? "raised" : "lowered",
          userId
        }) // ✅ Agora RTM requires a string
  
        // Send message to channel
        await rtmChannelRef.current.sendMessage({ text: message }) // ✅ Use "text" instead of "message"
        console.log(`Hand ${newHandState ? "raised" : "lowered"} message sent`)
  
        // Update local state
        setIsHandRaised(newHandState)
  
        // Update raised hands set
        setRaisedHands((prev) => {
          const newSet = new Set(prev)
          if (newHandState) {
            newSet.add(userId)
          } else {
            newSet.delete(userId)
          }
          return newSet
        })
  
        return newHandState
      } catch (error) {
        console.error("Failed to toggle hand state:", error)
        toast.error("Failed to change hand state")
        return isHandRaised
      }
    },
    [isHandRaised, isRTMConnected],
  )
  
  // Get messages for a specific user
  const getMessagesForUser = useCallback(
    (userId: string) => {
      return privateMessages.get(userId) || []
    },
    [privateMessages],
  )

  // Check if a user is online
  const isUserOnline = useCallback(
    (userId: string) => {
      return onlineUsers.has(userId)
    },
    [onlineUsers],
  )

  const sendReaction = useCallback(async (reactionMessage: ReactionMessage) => {
    if (!rtmClientRef.current || !rtmChannelRef.current) {
      console.error("RTM client or channel is not initialized.");
      return;
    }
  
    if (!isRTMConnected) {
      console.error("RTM is not connected.");
      return;
    }

    console.log(reactionMessage," this is teh reaction message")

    console.log(reactions)
  
    try {
      await rtmChannelRef.current.sendMessage({
        text: JSON.stringify(reactionMessage) 
      });
  
    } catch (error) {
      console.error("Failed to send reaction:", error);
    }
  }, [isRTMConnected]);

  const sendFile = useCallback(async (files: { type: string; name: string; url: string }[]) => {
  
    try {
      const filesData = {
        files,
        uploader: user?.name,
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/api/files/${channel}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filesData),
      });

      if (!rtm) return
      
        await publishMessage(rtm, fileChannel, files)
    } catch (error) {
      console.error("Failed to send file:", error);
    }
  }, [isRTMConnected, user?.name, channel, fileChannel]);
  


  
  



  return {
    isRTMConnected,
    raisedHands,
    pendingRequests,
    isHandRaised,
    files,
    sendReaction,
    sendFile,
    reactions,
    toggleHand,
    getMessagesForUser,
    isUserOnline,
    onlineUsers,
    rtmClient: rtmClientRef.current,
  }
}

