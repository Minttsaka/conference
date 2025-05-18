"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Play, Video } from "lucide-react"

export default function StartMenu() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.h1
          className="text-3xl mb-8 font-light tracking-widest text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Virtual Conference Hub
        </motion.h1>
        <div className="space-y-6">
          <Link href="/create" passHref>
            <motion.button
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white text-xs tracking-widest transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="mr-2 h-4 w-4" /> Start
            </motion.button>
          </Link>
          <Link href="/create" passHref>
            <motion.button
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white text-xs tracking-widest transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="mr-2 h-4 w-4" /> Schedule
            </motion.button>
          </Link>
          <Link href="/join" passHref>
            <motion.button
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs tracking-widest transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Video className="mr-2 h-4 w-4" /> Join a Meeting
            </motion.button>
          </Link>
        </div>
        <motion.p
          className="mt-8 text-[10px] text-center text-gray-400 max-w-[300px] mx-auto leading-loose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Welcome to our Virtual Conference Hub. Choose an option to get started. By using this platform, you agree to
          our terms of service and privacy policy.
        </motion.p>
      </div>
      <style jsx global>{`
        @keyframes glitch {
          0% {
            transform: translate(0)
          }
          20% {
            transform: translate(-2px, 2px)
          }
          40% {
            transform: translate(-2px, -2px)
          }
          60% {
            transform: translate(2px, 2px)
          }
          80% {
            transform: translate(2px, -2px)
          }
          100% {
            transform: translate(0)
          }
        }
        .glitch {
          animation: glitch 0.2s linear infinite;
        }
      `}</style>
    </div>
  )
}

