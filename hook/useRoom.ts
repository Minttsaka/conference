"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { Participant, Message, TranscriptionSettings } from "@/types/room"
import AgoraRTC, {
  type IAgoraRTCClient,
  type IMicrophoneAudioTrack,
  type ICameraVideoTrack,
  type UID,
} from "agora-rtc-sdk-ng"
import { AIEnhancementService } from "@/lib/ai-enhancement"

interface UseRoomProps {
  roomId: string
  userName: string
  onError?: (error: string) => void
}

export function useRoom({ roomId, userName, onError }: UseRoomProps) {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [settings, setSettings] = useState<TranscriptionSettings>({
    fontSize: 16,
    showSpeakerNames: true,
    highlightCurrentSpeaker: true,
    transcriptionLanguage: "en-US",
    aiEnhancement: true,
  })

  // Refs for Agora client and tracks
  const clientRef = useRef<IAgoraRTCClient | null>(null)
  const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null)
  const localVideoTrackRef = useRef<ICameraVideoTrack | null>(null)
  const localUidRef = useRef<UID | null>(null)
  const aiServiceRef = useRef<AIEnhancementService | null>(null)

  // Audio processing for speech recognition
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioProcessorRef = useRef<ScriptProcessorNode | null>(null)
  const recognitionRef = useRef<any>(null) // WebSpeechAPI recognition object

  // Initialize Agora client
  const initializeAgoraClient = useCallback(async () => {
    try {
      // Create Agora client
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
      clientRef.current = client

      // Get app ID from environment variable
      const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID!
      if (!appId) {
        throw new Error("Agora App ID is not defined")
      }

      // Generate a random UID for the local user
      const uid = Math.floor(Math.random() * 1000000)
      localUidRef.current = uid

      // Join the channel
      await client.join(appId, roomId, null, uid)
      console.log("Successfully joined the channel")

      // Create local tracks
      const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks()
      localAudioTrackRef.current = microphoneTrack
      localVideoTrackRef.current = cameraTrack

      // Publish local tracks
      await client.publish([microphoneTrack, cameraTrack])
      console.log("Published local tracks")

      // Add local user to participants
      setParticipants((prev) => [
        ...prev,
        {
          id: uid.toString(),
          name: userName,
          isSelf: true,
          isAudioOn: true,
          isVideoOn: true,
        },
      ])

      // Set up event listeners for remote users
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType)
        console.log("Subscribed to remote user", user.uid)

        // Check if user is already in participants
        const existingParticipant = participants.find((p) => p.id === user.uid.toString())

        if (mediaType === "audio") {
          user.audioTrack?.play()
        }

        if (!existingParticipant) {
          // Add remote user to participants
          setParticipants((prev) => [
            ...prev,
            {
              id: user.uid.toString(),
              name: `User ${user.uid}`, // In a real app, you would get the name from a database
              isSelf: false,
              isAudioOn: mediaType === "audio",
              isVideoOn: mediaType === "video",
            },
          ])
        } else {
          // Update existing participant
          setParticipants((prev) =>
            prev.map((p) =>
              p.id === user.uid.toString()
                ? {
                    ...p,
                    isAudioOn: mediaType === "audio" ? true : p.isAudioOn,
                    isVideoOn: mediaType === "video" ? true : p.isVideoOn,
                  }
                : p,
            ),
          )
        }
      })

      client.on("user-unpublished", (user, mediaType) => {
        console.log("Remote user unpublished", user.uid, mediaType)

        // Update participant status
        setParticipants((prev) =>
          prev.map((p) =>
            p.id === user.uid.toString()
              ? {
                  ...p,
                  isAudioOn: mediaType === "audio" ? false : p.isAudioOn,
                  isVideoOn: mediaType === "video" ? false : p.isVideoOn,
                }
              : p,
          ),
        )
      })

      client.on("user-left", (user) => {
        console.log("Remote user left", user.uid)

        // Remove participant
        setParticipants((prev) => prev.filter((p) => p.id !== user.uid.toString()))
      })

      // Initialize AI service
      aiServiceRef.current = new AIEnhancementService()

      // Initialize speech recognition
      initializeSpeechRecognition()

      setIsConnected(true)
      setIsLoading(false)
    } catch (err) {
      console.error("Error initializing Agora client:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to join room"
      setError(errorMessage)
      if (onError) onError(errorMessage)
      setIsLoading(false)
    }
  }, [roomId, userName, participants, onError])

  // Initialize speech recognition
  const initializeSpeechRecognition = useCallback(() => {
    try {
      // Check if Web Speech API is available
      if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        throw new Error("Speech recognition is not supported in this browser")
      }

      // Create recognition object
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognitionRef.current = recognition

      // Configure recognition
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = settings.transcriptionLanguage

      // Set up event handlers
      recognition.onresult = async (event) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }

        if (finalTranscript) {
          let processedText = finalTranscript

          // Apply AI enhancement if enabled
          if (settings.aiEnhancement && aiServiceRef.current) {
            try {
              processedText = await aiServiceRef.current.enhanceTranscription(finalTranscript)
            } catch (err) {
              console.error("Error enhancing transcription:", err)
              // Fall back to original text
              processedText = finalTranscript
            }
          }

          // Add message
          const newMessage: Message = {
            id: crypto.randomUUID(),
            participantId: localUidRef.current?.toString() || "0",
            participantName: userName,
            text: processedText,
            timestamp: new Date(),
          }

          setMessages((prev) => [...prev, newMessage])
        }
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        if (event.error === "no-speech") {
          // Restart recognition if no speech detected
          recognition.stop()
          setTimeout(() => {
            recognition.start()
          }, 1000)
        }
      }

      // Start recognition
      recognition.start()
      console.log("Speech recognition started")
    } catch (err) {
      console.error("Error initializing speech recognition:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize speech recognition"
      // Don't set error state, just log it - we can still use the app without speech recognition
      console.warn(errorMessage)
    }
  }, [settings.transcriptionLanguage, userName])

  // Initialize room on mount
  useEffect(() => {
    if (userName) {
      initializeAgoraClient()
    }

    // Cleanup function
    return () => {
      // Stop speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }

      // Leave Agora channel
      if (clientRef.current) {
        clientRef.current.leave()
      }

      // Close local tracks
      if (localAudioTrackRef.current) {
        localAudioTrackRef.current.close()
      }

      if (localVideoTrackRef.current) {
        localVideoTrackRef.current.close()
      }
    }
  }, [userName, initializeAgoraClient])

  // Update speech recognition when language changes
  useEffect(() => {
    if (recognitionRef.current && isConnected) {
      recognitionRef.current.lang = settings.transcriptionLanguage

      // Restart recognition with new language
      recognitionRef.current.stop()
      setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.start()
        }
      }, 100)
    }
  }, [settings.transcriptionLanguage, isConnected])

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<TranscriptionSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }, [])

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (localAudioTrackRef.current) {
      const enabled = !localAudioTrackRef.current.enabled
      localAudioTrackRef.current.setEnabled(enabled)

      // Update participant state
      setParticipants((prev) => prev.map((p) => (p.isSelf ? { ...p, isAudioOn: enabled } : p)))
    }
  }, [])

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (localVideoTrackRef.current) {
      const enabled = !localVideoTrackRef.current.enabled
      localVideoTrackRef.current.setEnabled(enabled)

      // Update participant state
      setParticipants((prev) => prev.map((p) => (p.isSelf ? { ...p, isVideoOn: enabled } : p)))
    }
  }, [])

  // Leave room
  const leaveRoom = useCallback(() => {
    // Stop speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }

    // Leave Agora channel
    if (clientRef.current) {
      clientRef.current
        .leave()
        .then(() => {
          console.log("Left channel successfully")
        })
        .catch((err) => {
          console.error("Error leaving channel:", err)
        })
    }

    // Close local tracks
    if (localAudioTrackRef.current) {
      localAudioTrackRef.current.close()
    }

    if (localVideoTrackRef.current) {
      localVideoTrackRef.current.close()
    }

    setIsConnected(false)
  }, [])

  return {
    participants,
    messages,
    isConnected,
    isLoading,
    error,
    settings,
    updateSettings,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  }
}

