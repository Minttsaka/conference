"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FileAudio, Info, AlertTriangle } from "lucide-react"

interface TranscriptionDialogProps {
  isOpen: boolean
  onClose: () => void
  onRequestTranscription: (enabled: boolean) => void
}

export function TranscriptionDialog({ isOpen, onClose, onRequestTranscription }: TranscriptionDialogProps) {
  const [consentGiven, setConsentGiven] = useState(false)
  const [accessibilityNeeded, setAccessibilityNeeded] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
            <FileAudio className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <DialogTitle className="text-center">Live Transcription</DialogTitle>
          <DialogDescription className="text-center">
            This meeting is  live transcription enabled for all participants in this meeting
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Accessibility needs section */}
          <div className="flex items-start space-x-3 rounded-lg border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-900/20 p-3">
            <div className="mt-0.5">
              <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Accessibility Feature</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Live transcription helps participants with hearing impairments or those in noisy environments follow the
                conversation. This uses advanced ai to analyse the speech and transform into something meaning. Which means ai can make some errors.
              </p>
            </div>
          </div>

          {/* Privacy notice */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Privacy Notice</h4>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-xs text-gray-700 dark:text-gray-300 space-y-2">
              <p>When host enable live transcription:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>All participants will be notified that transcription is active</li>
                <li>Speech will be processed to generate text in real-time</li>
                <li>Transcripts are only available during the meeting</li>
                <li>Participants can opt out individually</li>
              </ul>
            </div>
          </div>

          {/* Warning for non-accessibility use */}
          {!accessibilityNeeded && consentGiven && (
            <div className="flex items-start space-x-3 rounded-lg border border-amber-100 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-900/20 p-3">
              <div className="mt-0.5">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                Consider if transcription is necessary. Using this feature when not needed for accessibility may impact
                meeting performance.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
          <Button variant="outline" onClick={onClose} 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
          >
            I understand
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

