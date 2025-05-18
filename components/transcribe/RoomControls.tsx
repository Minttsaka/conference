"use client"

import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff, Users, Settings, Share2 } from "lucide-react"
import { useMobile } from "@/hook/useMobile"

interface RoomControlsProps {
  toggleAudio: () => void
  toggleVideo: () => void
}

export default function RoomControls({  toggleAudio, toggleVideo }: RoomControlsProps) {
  const isMobile = useMobile()

  return (
    <footer className="border-t bg-white dark:bg-slate-900 p-4">
      <div className="container mx-auto flex justify-center items-center gap-2">
        <Button
          variant={ "outline" }
          size="icon"
          onClick={toggleAudio}
          className="h-12 w-12 rounded-full"
        >
          <Mic className="h-5 w-5" />
        </Button>

        <Button
          variant={"outline"}
          size="icon"
          onClick={toggleVideo}
          className="h-12 w-12 rounded-full"
        >
          <Video className="h-5 w-5" />
        </Button>

        {isMobile && (
          <>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
              <Users className="h-5 w-5" />
            </Button>

            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </>
        )}

        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </footer>
  )
}


