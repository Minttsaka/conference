import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Affordability() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-100 via-purple-50 to-white px-4 py-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <h1 className="text-4xl  tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                The Future of Education
              </h1>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-green-700">NEW EXPERIENCE</h2>
                  <p className="text-gray-600">
                  Design remote and hybrid learning environments, empower teachers and students, and create more equitable educational opportunities.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-gray-900" />
                  <div className="h-6 w-6 rounded-full bg-purple-600" />
                  <div className="h-6 w-6 rounded-full bg-blue-600" />
                  <div className="h-6 w-6 rounded-full bg-yellow-200" />
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium">Screen Sharing</p>
                    <p className="text-gray-600">Present your work effortlessly</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">HD Video & Audio</p>
                    <p className="text-gray-600">Crystal-clear</p>
                  </div>
                </div>
              </div>
              <Button className="rounded-full bg-gray-900 px-8 py-6 text-white">Learn More</Button>
            </div>
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bestland-o3SYcXAjNQfcHh20CKesSMrYQL2eEz.png"
                alt="Smartphone with people taking selfies"
                width={500}
                height={500}
                className="rounded-lg object-cover"
               
              />
            </div>
          </div>
        </div>
      </section>

      {/* Harmony Section */}
      <section className="bg-[#FFE4D9] px-4 py-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Harmony Of Quality<sup>©</sup> <br />
                And Comfort
              </h2>
              <Button variant="outline" className="rounded-full border-gray-900 px-8 py-6">
                Learn More
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bestland-o3SYcXAjNQfcHh20CKesSMrYQL2eEz.png"
                alt="Hand holding smartphone showing selfie"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

