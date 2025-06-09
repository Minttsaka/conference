"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { toast } from "sonner"
import {  ReactionMessage } from "@/lib/initAgoraClient"
import {  SessionPayload } from "@/lib/session"
import { initializeAgoraRTM, publishMessage } from "@/components/demo/agora"

interface UseAgoraRTMProps {
  channel: string
  user: SessionPayload
}

export function useAgoraRTM({  user, channel }: UseAgoraRTMProps) {
  const [raisedHands, setRaisedHands] = useState<Set<string>>(new Set())
  const [pendingRequests, setPendingRequests] = useState<Map<string, { name: string; timestamp: number }>>(new Map())
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [reactions, setReactions] = useState<Set<ReactionMessage>>(new Set())
  const [rtm, setRtm] = useState<any>(null)
  const rtmClientRef = useRef<any>(null)
  const rtmChannelRef = useRef<any>(null)
  const eventListenersSet = useRef(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const setupRTM = async () => {
    try {
      setIsLoading(true)
      const { rtm } = await initializeAgoraRTM(user, `${channel}controls`)
      setRtm(rtm)
    
    } catch (error) {
      console.error("Failed to initialize Agora RTM:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setupRTM()
  }, [])


useEffect(() => {
    if (!rtm || eventListenersSet.current) return

    const handlePresence = (event: any) => {
      if (event.eventType === "SNAPSHOT") {
    
      } else {
       
      }
    }

    const handleStatus = (event: any) => {
      console.log("RTM status changed:", event.state, event.reason)
    }

    rtm.addEventListener("message", handleChannelMessage)
    rtm.addEventListener("presence", handlePresence)
    rtm.addEventListener("status", handleStatus)

    eventListenersSet.current = true

    return () => {
      if (rtm) {
        rtm.removeEventListener("message",handleChannelMessage)
        rtm.removeEventListener("presence", handlePresence)
        rtm.removeEventListener("status", handleStatus)
      }
    }
  }, [rtm, channel, user.userId])


  const handleChannelMessage = useCallback(async(message: any) => {

    const messageData = JSON.parse(message.text)

    if ( messageData.type === "raised") {

      setRaisedHands((prev) => {
        const newSet = new Set(prev)
        newSet.add(messageData.userId)
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

        toast(`${ messageData.userId.split("-")[4] ||  messageData.userId} raised their hand`)
   
    } else if ( messageData.type === "lowered") {
      setRaisedHands((prev) => {
        const newSet = new Set(prev)
        newSet.delete( messageData.userId)
        return newSet
      })

        setPendingRequests((prev) => {
          const newMap = new Map(prev)
          newMap.delete( messageData.userId)
          return newMap
        })

    } else if ( messageData.type === "reaction") {

      setReactions((prev) => {
        const newSet = new Set(prev)
        newSet.add(messageData)
        return newSet
      })
    } 
  }, [])


  const toggleHand = useCallback(
    async (userId: string) => {
      if (!rtmChannelRef.current) {
        toast.error("Chat service not connected")
        return
      }
  
      try {
        const newHandState = !isHandRaised
  
        const message = JSON.stringify({
          type: newHandState ? "raised" : "lowered",
          userId
        })
  
        await publishMessage(rtm, `${channel}controls`, message)
     
        setIsHandRaised(newHandState)

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
    [isHandRaised],
  )
  
  // const getMessagesForUser = useCallback(
  //   (userId: string) => {
  //     return privateMessages.get(userId) || []
  //   },
  //   [privateMessages],
  // )

  // const isUserOnline = useCallback(
  //   (userId: string) => {
  //     return onlineUsers.has(userId)
  //   },
  //   [onlineUsers],
  // )

  const sendReaction = useCallback(async (reactionMessage: ReactionMessage) => {
    if (!rtmClientRef.current || !rtmChannelRef.current) {
      console.error("RTM client or channel is not initialized.");
      return;
    }
  
    if (!rtm) {
      console.error("RTM is not connected.");
      return;
    }
  
    try {
      await publishMessage(rtm, `${channel}controls`, reactionMessage)
  
    } catch (error) {
      console.error("Failed to send reaction:", error);
    }
  }, [rtm]);

  return {
    raisedHands,
    pendingRequests,
    isHandRaised,
    sendReaction,
    reactions,
    isLoading,
    toggleHand,
    rtmClient: rtmClientRef.current,
  }
}

