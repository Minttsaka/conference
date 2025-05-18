"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#002211] text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-[#003322] rounded-2xl p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/im1-dGrD96VhCyo1V6YcxX2PSC10XTQvkc.webp"
              alt="ByteHire Logo"
              width={100}
              height={24}
              className="h-6 w-auto"
            />
            <span className="text-xs text-gray-400">Instant Access</span>
          </div>

          <h2 className="text-3xl font-light mb-4 text-white">
            Smart Features <br /> for Seamless Meetings
          </h2>

          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/im1-dGrD96VhCyo1V6YcxX2PSC10XTQvkc.webp"
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
          <div className="text-[#00FF88] text-6xl font-light">124k</div>
          <div>
            <h3 className="text-xl mb-2">Applicants</h3>
            <p className="text-xs text-gray-400">Ready to start your project and boost your tech team</p>
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
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/im1-dGrD96VhCyo1V6YcxX2PSC10XTQvkc.webp"
              alt="ByteHire Logo"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/im1-dGrD96VhCyo1V6YcxX2PSC10XTQvkc.webp"
            alt="App Preview"
            width={200}
            height={400}
            className="w-full h-auto rounded-xl"
          />
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#003322] rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#00FF88]"></div>
            <span className="text-sm">Schedule</span>
            <span className="text-xs text-gray-400 ml-auto">**</span>
          </div>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/im1-dGrD96VhCyo1V6YcxX2PSC10XTQvkc.webp"
            alt="Candidate Profile"
            width={400}
            height={500}
            className="w-full h-auto rounded-xl"
          />
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm">
              Schedule the
              <br />
              meeting or chat
              <br />
              right here
            </p>
            <button className="bg-white text-black rounded-full px-4 py-2 text-xs flex items-center gap-2">
              Explore!
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

