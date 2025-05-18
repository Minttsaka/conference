"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video, Link2, Settings, Users, Mic, Camera, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function JoinMeeting() {
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)

  return (
    <div className="container relative z-10 mx-auto flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white/10  backdrop-blur-lg   grid md:grid-cols-5 gap-6 items-start">
        {/* Left Panel */}
        <div className="md:col-span-3  bg-white rounded-3xl p-6 space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <Video className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">Join Meeting</h1>
              <p className="text-white/80">Enter meeting details to connect</p>
            </div>
          </div>

          <Tabs defaultValue="id" className="space-y-6">
            <TabsList className="grid grid-cols-2 bg-white/10">
              <TabsTrigger value="id" className="text-white data-[state=active]:bg-white/20">
                Meeting ID
              </TabsTrigger>
              <TabsTrigger value="link" className="text-white data-[state=active]:bg-white/20">
                Meeting Link
              </TabsTrigger>
            </TabsList>

            <TabsContent value="id" className="space-y-6 mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meeting-id" className="text-white">
                    Meeting ID or Personal Link
                  </Label>
                  <Input
                    id="meeting-id"
                    placeholder="Enter Meeting ID"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passcode" className="text-white">
                    Meeting Passcode
                  </Label>
                  <Input
                    id="passcode"
                    type="password"
                    placeholder="Enter Passcode"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="link" className="space-y-6 mt-0">
              <div className="space-y-2">
                <Label htmlFor="meeting-link" className="text-white">
                  Meeting Link
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="meeting-link"
                    placeholder="Paste meeting link here"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Button variant="secondary" size="icon">
                    <Link2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="display-name" className="text-white">
                Display Name
              </Label>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
            <Input
              id="display-name"
              placeholder="Enter your name"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
            Join Meeting
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Right Panel */}
        <div className="md:col-span-2 space-y-6">
          {/* Preview Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 aspect-video relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <video className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <Button
                size="icon"
                variant={audioEnabled ? "secondary" : "destructive"}
                className={cn("rounded-full", !audioEnabled && "bg-red-500 hover:bg-red-600")}
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant={videoEnabled ? "secondary" : "destructive"}
                className={cn("rounded-full", !videoEnabled && "bg-red-500 hover:bg-red-600")}
                onClick={() => setVideoEnabled(!videoEnabled)}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Settings */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-medium text-white">Quick Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-white" />
                  <span className="text-sm text-white">Enable Virtual Background</span>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-white" />
                  <span className="text-sm text-white">Join with Waiting Room</span>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Recent Meetings */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-medium text-white">Recent Meetings</h3>
            <div className="space-y-3">
              {[
                { name: "Weekly Design Review", time: "2 hours ago" },
                { name: "Product Sprint", time: "Yesterday" },
              ].map((meeting) => (
                <button
                  key={meeting.name}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Video className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-white">{meeting.name}</p>
                    <p className="text-xs text-white/70">{meeting.time}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/70" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

