import { Button } from "@/components/ui/button"
import { ChevronRight, Menu, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Control() {
  return (
    <div className="min-h-screen bg-white">
 
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Doctor Selection */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-1c6785b9c6f8d99e9acfc4b9159d611b-xrM5mY7Mb7GUjUAslKXmXzkFGUQROu.webp"
                  alt="Doctor"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <button className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-gray-600">Its time to test your progress!</span>
            </div>

            {/* Hero Text */}
            <h1 className="text-5xl font-light leading-tight">
              Develop And Answer
              <br />
              Online Exams with Ease.
            </h1>

            {/* Statistics Card */}
            <div className="bg-[#e8f3f3] rounded-3xl p-6 w-fit">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">statistics</span>
                <div className="h-5 w-5 rounded-full bg-white flex items-center justify-center text-xs">i</div>
              </div>
              <div className="text-4xl font-medium mb-2">82%</div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Positive reviews</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            {/* Mental Health Support */}
            <div className="relative overflow-hidden rounded-3xl bg-[#e8f3f3] p-6">
              <div className="relative z-10">
                <div className="text-sm mb-4">well-being</div>
                <h3 className="text-xl mb-2">Mental Health Support</h3>
                <ChevronRight className="h-5 w-5" />
              </div>
              <img
                src="/placeholder.svg"
                alt="Waves"
                width={300}
                height={100}
                className="absolute bottom-0 left-0 w-full opacity-50"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-600 mb-1">
                Empowering all learners, including those with visual and hearing impairments, 
                  <br />
                  to excel in online exams with AI-driven assistance.
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-[#ff9776] text-white hover:bg-[#ff9776]/90"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Virtual Consultations */}
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-1c6785b9c6f8d99e9acfc4b9159d611b-xrM5mY7Mb7GUjUAslKXmXzkFGUQROu.webp"
                alt="Virtual Consultation"
                width={500}
                height={400}
                className="rounded-3xl"
              />
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3">
                <div className="flex items-center gap-4">
                  <span>virtual consultations</span>
                  <div className="flex items-center gap-2">
                    <div className="bg-black text-white text-xs rounded-full px-3 py-1">24/7</div>
                    <div className="bg-black text-white text-xs rounded-full px-2 py-1">+</div>
                    <div className="bg-black text-white text-xs rounded-full px-3 py-1">user-friendly</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Telehealth Solutions */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">
                  Assessment<sup>®</sup>
                  <br />
                  solutions.
                </h3>
                <Button variant="secondary" size="sm" className="rounded-full">
                  Explore <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                Start using the AI-powered
                <br />
                Q&A assistant today and 
                <br />
                take your online exams with confidence! 🚀...
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm mb-1">Game changer</div>
              <h2 className="text-2xl">
              Inclusive Meeting and classroom
              </h2>
            </div>
            <Button variant="link" className="text-gray-400">
              Read More
            </Button>
          </div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-between py-6">
              Visual impairment
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between py-6">
              Ear problems
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

