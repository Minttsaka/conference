"use client"

import { motion } from "framer-motion"
import { Star} from "lucide-react"
import Link from "next/link"
import Logo from "../Logo"
import SponsorLogos from "./SponsorLogos"

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="bg-white p-1 rounded-full shrink-0">
              <Logo />
            </div>
            <div className="hidden md:flex space-x-6 text-sm">
              <Link href="#features" className="hover:text-gray-300">
                FEATURES
              </Link>
              <Link href="#" className="hover:text-gray-300">
                WHY
              </Link>
              <Link href="#" className="hover:text-gray-300">
                PRICING
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-black border border-gray-800 rounded-full px-4 py-2 text-sm flex items-center space-x-2">
              <span>Beta Version</span>
              <div className="w-6 h-6 rounded-full bg-gray-800"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-sm text-gray-400 mb-4">FROM XTREME REGION</p>
          <h1 className="text-5xl md:text-6xl font-light mb-8">
            Simple, Fast <span className="text-gray-500">, and Secure</span>
            <br />
            Live Video <span className="text-gray-500">Conference</span>
          </h1>
          <div className="flex items-center justify-center gap-1">
            <Link href={'/join'} className="bg-green-500 text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-green-400 transition-colors">
              Join a meeting
            </Link>
            <Link href={'https://xtremeregion.com/i/schedule'} className="bg-white text-black rounded-full px-8 py-3 text-sm font-medium hover:bg-gray-100 transition-colors">
              Schedule
            </Link>
          </div>
          
        </motion.div>

        {/* Credit Card Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative  mb-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 blur-3xl"></div>
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="https://www.ringcentral.com/content/dam/rc-www/en_us/images/content/seo/online-meeting-software/online-meeting-software.jpg"
              alt="Virtual Conference"
              width={800}
              height={400}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Stats and Download */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
          <div className="flex space-x-12">
            <div>
              <h3 className="text-2xl font-light mb-1">20+</h3>
              <p className="text-sm text-gray-400">Users</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-4">
              <p className="text-sm text-gray-600">
                Trusted by well know companies .
              </p>
              <SponsorLogos />
            </div>
          <button className="bg-black border border-gray-800 rounded-full px-6 py-3 text-sm flex items-center space-x-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe8zEWJQ7I_GwZ-vIYugIysarQAxRE0ZbX2g&s"
              alt="App Store"
              width={20}
              height={20}
              className="h-5 w-auto"
            />
            <span>AI powered</span>
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 pb-20">
          <div className="bg-[#111] rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <h3 className="text-lg">Faster And Secure</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
            No downloads or installations required. Join meetings with a single click. 
            Optimized for speed, ensuring smooth video and audio even on low bandwidth.
            </p>
          </div>
          <div className="bg-[#111] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-xs">
                <Star className="text-yellow-300 fill-yellow-300"/>
                <Star className="text-yellow-300 fill-yellow-300"/>
                <Star className="text-yellow-300 fill-yellow-300"/>
              </div>
            </div>
            <div className="flex justify-between items-center bg-gray-900 p-4 rounded-lg shadow-lg">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Signup is required! Level up your game with us.</h3>
             
            </div>
          </div>

          </div>
        </div>
      </div>

      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/10 to-transparent"></div>
    </section>
  )
}

