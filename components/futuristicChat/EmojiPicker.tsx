"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Smile } from "lucide-react"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  disabled?: boolean
}

export function EmojiPicker({ onEmojiSelect, disabled = false }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleEmojiSelect = (emoji: any) => {
    onEmojiSelect(emoji.native)
    setIsOpen(false) // Close picker after selection
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" disabled={disabled} className="h-8 w-8 p-0">
          <Smile className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Picker
          data={data}
          onEmojiSelect={handleEmojiSelect}
          theme="light"
          set="native"
          showPreview={false}
          showSkinTones={false}
          emojiSize={20}
          perLine={8}
          maxFrequentRows={2}
        />
      </PopoverContent>
    </Popover>
  )
}
