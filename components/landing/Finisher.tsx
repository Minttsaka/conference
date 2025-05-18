import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export default function Finisher() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-16">
        <div className="relative">
          {/* Version Badge */}
          <Badge variant="outline" className="mb-8 rounded-full px-4 py-1">
            RC version Soon!
          </Badge>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h1 className="text-5xl  tracking-tight text-gray-900 lg:text-6xl">
                AI-Powered
                <div className="relative inline-block">
                  <div className="absolute -inset-1">
                    <div className="h-full w-full rounded-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 blur-lg"></div>
                  </div>
                  <span className="relative md:ml-2">Education</span>
                </div>
                <br />
                Solution★
              </h1>

              <p className="text-lg text-gray-600">
                Our AI system offers human-like voice, infinite memory, and autonomous operations, setting a new
                standard in customer interaction
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Effective</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">100% Secure</span>
                </div>
              </div>

              <Button className="rounded-full bg-black px-8 py-6 text-lg font-medium text-white hover:bg-gray-800">
                Get Started
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
            <div className="relative p-8">
              <div className="absolute inset-0">
                <svg className="h-full w-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 200C0 89.543 89.543 0 200 0s200 89.543 200 200-89.543 200-200 200S0 310.457 0 200z"
                    fill="url(#gradient)"
                    fillOpacity="0.1"
                  />
                  <defs>
                    <radialGradient
                      id="gradient"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="rotate(45) scale(400)"
                    >
                      <stop stopColor="#93C5FD" />
                      <stop offset="0.5" stopColor="#C084FC" />
                      <stop offset="1" stopColor="#F472B6" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              <div className="relative grid gap-8 lg:grid-cols-2">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-200" />
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-300" />
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-400" />
                  </div>
                  <span className="text-sm text-gray-600">Used by 240,000+ People</span>
                </div>

                <div className="rounded-2xl bg-white/80 p-6 backdrop-blur-sm">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">90x</div>
                    <div className="text-sm text-gray-600">More Accurate & Precise</div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Our AI system offers human-like conversations, infinite memory, and autonomous operations, setting a
                    new standard in customer interaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

