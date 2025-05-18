import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-orange-100">
  
      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-16">
  <div className="relative">
    {/* Hero Content */}
    <div className="text-center">
      <h1 className="mx-auto max-w-4xl text-5xl tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
        Real-time AI Transcriptions
        <br />
        <span className="rounded-lg bg-green-100 px-4 py-2">Convert Speech to Text Instantly</span>
      </h1>

      <Button className="mt-8 rounded-full bg-navy-900 px-8 py-6 text-lg font-semibold text-white hover:bg-navy-800">
        TRY FOR FREE
      </Button>

      {/* Stats */}
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <Card className="p-6 text-left">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-blue-100 p-2">🎤</div>
            <div>
              <div className="font-medium">98% Accuracy</div>
              <div className="text-sm text-blue-500">AI-Powered Speech Recognition</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 text-left">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-2 text-green-600">⚡</div>
            <div>
              <div className="text-2xl font-bold">Real-Time Processing</div>
              <div className="text-sm text-gray-600">Transcribe as you speak</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Center Image */}
      <div className="relative mx-auto mt-16 max-w-2xl">
        <img
          src="https://example.com/transcription-demo.jpg"
          alt="AI Transcription Demo"
          width={600}
          height={400}
          className="rounded-2xl"
        />
        <div className="absolute -left-4 bottom-4 max-w-xs rounded-lg bg-white p-4 text-left text-sm shadow-lg">
          Get real-time, highly accurate transcriptions with AI-driven speech recognition.
        </div>
      </div>
    </div>
  </div>
</main>

    </div>
  )
}

