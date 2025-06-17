
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Affordability() {
  return (
     <section className="relative bg-gradient-to-b from-purple-100 via-purple-50 to-white px-4 py-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <h1 className="text-4xl  tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                The Future of Education
              </h1>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-green-700">New Experience</h2>
                  <p className="text-gray-600">
                  Design remote and hybrid learning environments, empower teachers and students, and create more equitable educational opportunities.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-gray-900" />
                  <div className="h-6 w-6 rounded-full bg-purple-600" />
                  <div className="h-6 w-6 rounded-full bg-blue-600" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 text-sm">
                  <div className="space-y-1 bg-gray-900 rounded-2xl p-3 text-white shadow">
                    <p className="font-bold">Screen Sharing</p>
                    <p className="text-xs">Present your work effortlessly</p>
                  </div>
                   <div className="space-y-1 bg-purple-600 rounded-2xl p-3 text-white shadow">
                    <p className="font-bold">Intergrated lesson viewer</p>
                    <p className="text-xs">Present your work effortlessly</p>
                  </div>
                   <div className="space-y-1 bg-blue-600 rounded-2xl p-3 text-white shadow">
                    <p className="font-bold">Video & Audio</p>
                    <p className="text-xs">Crystal-clear</p>
                  </div>
                </div>
              </div>
             
                <Button className="rounded-full bg-gray-900 px-8 py-6 text-white">
                   <Link
                  href={'https://xtremeregion.com/i/channel'}>Learn More
                  </Link>
                </Button>
              
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
  )
}

