"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MicOff, VideoOff, Users, Settings, Copy, LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMobile } from "@/hook/useMobile"
import TranscriptionView from "./TranscriptionView"
import ParticipantVideo from "./ParticipantVideo"
import RoomControls from "./RoomControls"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { useAgora } from "@/hook/useAgora"
import { getOrCreateUserId } from "@/lib/userGn"
import { useAgoraConnectionStatus } from "@/hook/useAgoraConnectionStatus"
import { VideoStream } from "../chat/VideoStream"
import { ReactionMessage } from "@/lib/initAgoraClient"

const userId = getOrCreateUserId()

export default function RoomPage({roomId}:{roomId:string}) {

  const searchParams = useSearchParams()

  const router = useRouter()
  const token = searchParams.get("token")

  const isMobile = useMobile()

  // Get user name from localStorage or prompt
  const [userName, setUserName] = useState<string>("")

  useEffect(() => {
    // Try to get username from localStorage
    const storedName = localStorage.getItem("userName")

    if (storedName) {
      setUserName(storedName)
    } else {
      // Prompt for username if not found
      const name = prompt("Please enter your name to join the room")
      if (name) {
        localStorage.setItem("userName", name)
        setUserName(name)
      } else {
        // Redirect to home if no name provided
        router.push("/")
        toast(
       
          "You need to provide a name to join a room",
         
        )
      }
    }
  }, [router, toast])



  const {
    client,
    localVideoTrack,
    localAudioTrack,
    messages,
    remoteUsers,
    speakingUsers,
    settings,
    screenVideoTrack,
    updateSettings,
    joinChannel,
    leaveChannel,
    toggleAudio,
    toggleVideo,
    setupEventListeners,
    shareLink,
  } = useAgora({
    appId: process.env.NEXT_PUBLIC_AGORA_APP_ID!,
    channel: roomId,
    token: token!,
    uid: userId,
    role:"audience"
  })


  const { connectionQuality, connectionStatus } = useAgoraConnectionStatus(client)
  // Copy room ID to clipboard
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
    toast("copied")
  }

  // Handle leaving room
  const handleleaveChannel = () => {
    leaveChannel()
    router.push("/")
  }

  // Show loading state
  // if (  connectionStatus === "connecting") {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-semibold mb-2">Joining room...</h2>
  //         <p className="text-muted-foreground">Setting up your connection</p>
  //       </div>
  //     </div>
  //   )
  // }


  return (
    <main className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b bg-white dark:bg-slate-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Room: {roomId}</h1>
            <Button variant="outline" size="icon" onClick={copyRoomId}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleleaveChannel}>
            <LogOut className="h-4 w-4" />
            {!isMobile && "Leave Room"}
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - participants and settings */}
        <aside className={`border-r bg-white dark:bg-slate-900 ${isMobile ? "hidden" : "w-80"}`}>
          <Tabs defaultValue="participants">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="participants">
                <Users className="h-4 w-4 mr-2" />
                Participants
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="participants" className="p-4 h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Participants ({remoteUsers.length})</h2>
                {remoteUsers.map((participant) => (
                  <div key={participant.uid.toString()} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{participant.uid.toString().charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {participant.uid}
                        </p>
                        <div className="flex gap-2 mt-1">
                          {!participant.hasAudio && <MicOff className="h-3 w-3 text-muted-foreground" />}
                          {!participant.hasVideo && <VideoOff className="h-3 w-3 text-muted-foreground" />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="p-4 h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Transcription Settings</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="font-size">Font Size</Label>
                      <span className="text-sm text-muted-foreground">{settings.fontSize}px</span>
                    </div>
                    <Slider
                      id="font-size"
                      min={12}
                      max={24}
                      step={1}
                      value={[settings.fontSize]}
                      onValueChange={(value) => updateSettings({ fontSize: value[0] })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-names">Show Speaker Names</Label>
                    <Switch
                      id="show-names"
                      checked={settings.showSpeakerNames}
                      onCheckedChange={(checked) => updateSettings({ showSpeakerNames: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="highlight-speaker">Highlight Current Speaker</Label>
                    <Switch
                      id="highlight-speaker"
                      checked={settings.highlightCurrentSpeaker}
                      onCheckedChange={(checked) => updateSettings({ highlightCurrentSpeaker: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai-enhancement">AI Enhancement</Label>
                    <Switch
                      id="ai-enhancement"
                      checked={settings.aiEnhancement}
                      onCheckedChange={(checked) => updateSettings({ aiEnhancement: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Transcription Language</Label>
                    <Select
                      value={settings.transcriptionLanguage}
                      onValueChange={(value) => updateSettings({ transcriptionLanguage: value })}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="es-ES">Spanish</SelectItem>
                        <SelectItem value="fr-FR">French</SelectItem>
                        <SelectItem value="de-DE">German</SelectItem>
                        <SelectItem value="ja-JP">Japanese</SelectItem>
                        <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </aside>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Video grid */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-100 dark:bg-slate-900">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <VideoStream
                      userId={''}
                      maximisedUser = {null}
                      videoTrack={localVideoTrack}
                      audioTrack={localAudioTrack}
                      isMaximized={true}
                      userAvatar=""
                      reactions={undefined}
                      sendReaction={async (reactionMessage: ReactionMessage)=>{}}
                      onMuteRemoteUser={()=>{}}
                      onToggleMaximize={()=>{}}
                      userName="You"
                      appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!}
                      isLocal={true}
                      isSpeaking={false}
                      isMuted={false}
                      isVideoOff={false}
                      className="h-full"
                    />
              {remoteUsers.map((remoteUser) => {
              const userName = remoteUser.uid.toString().split("-")[4] // Extract user name
              return (
                <div key={remoteUser.uid.toString()} className="flex-shrink-0 w-80 xl:w-full h-full xl:h-64 relative">
                  <VideoStream
                    videoTrack={remoteUser.videoTrack}
                    audioTrack={remoteUser.audioTrack}
                    userId={remoteUser.uid.toString()}
                    appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!}
                    maximisedUser={null}
                    isLocal={false}
                    reactions={null}
                    sendReaction={async (reactionMessage: ReactionMessage)=>{}}
                    isVideoOff={false}
                    isHandRaised={false}
                    userName={userName}
                    userAvatar={remoteUser.uid.toString()}
                    isMuted={!!remoteUser.audioTrack}
                    isSpeaking={false}
                    isMaximized={false}
                    onToggleMaximize={() => {}}
                    onMuteRemoteUser={() => {}}
                    className="h-full w-full"
                  />
                </div>
              )
            })}
            </div>
          </div>

          {/* Transcription area */}
          <div className="h-1/3 border-t bg-white dark:bg-slate-900 overflow-hidden flex flex-col">
            <div className="p-2 border-b flex justify-between items-center">
              <h2 className="font-semibold">Live Transcription</h2>
              <Badge variant="outline" className="text-xs">
                {settings.aiEnhancement ? "AI Enhanced" : "Raw Transcription"}
              </Badge>
            </div>
            <TranscriptionView messages={messages} settings={settings} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <RoomControls
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
      />
    </main>
  )
}

