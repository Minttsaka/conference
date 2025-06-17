"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="bg-[#002211] text-white p-6" id="features">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-[#003322] rounded-2xl p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs text-gray-400">Instant Access</span>
          </div>

          <h2 className="text-3xl font-light mb-4 text-white">
            Smart Features <br /> for Seamless Meetings
          </h2>

          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/035/505/103/small/ai-generated-a-black-woman-running-on-a-dark-background-free-photo.jpg"
            alt="Profile"
            width={300}
            height={400}
            className="rounded-xl mt-4"
          />

          <div className="absolute bottom-6 right-6 bg-[#00FF88] text-black text-xs py-1 px-3 rounded-full">
            LiveMeet
          </div>
        </motion.div>


        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#003322] rounded-2xl p-6 flex flex-col justify-between"
        >
          <div className="text-[#00FF88] text-6xl font-light">10+</div>
          <div>
            <h3 className="text-xl mb-2">Meetings Hosted!</h3>
            <div className="flex gap-2 mt-4">
              <div className="w-8 h-8 rounded-full bg-gray-600"></div>
              <div className="w-8 h-8 rounded-full bg-gray-600"></div>
            </div>
          </div>
        </motion.div>

        {/* Main Feature Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#003322] rounded-2xl p-6 col-span-1 md:col-span-2"
        >
          <div className="flex justify-between items-start mb-8">
            <button className="text-xs border border-[#004433] rounded-full px-4 py-2">Realtime chat</button>
          </div>
          <h1 className="text-5xl font-light leading-tight mb-4">
            Communicate easily
            <br />
            and Secure
            <br />
            in Text
          </h1>
          <p className="text-sm text-gray-400">
            Everything you need
            <br />
            for communication
          </p>
        </motion.div>

        {/* App Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#003322] rounded-2xl p-6"
        >
          <img
            src="https://media.istockphoto.com/id/1493776862/photo/beautiful-young-asian-woman-using-smartphone-in-the-living-room-at-home-checking-social-media.jpg?s=612x612&w=0&k=20&c=T5se7OiQAGjBNJEyNPQ-7tTju15XrUD-X5yQDHiIVqU="
            alt="App Preview"
            width={200}
            height={400}
            className="w-full h-auto rounded-xl"
          />
        </motion.div>

  
      </div>
    </div>
  )
}

