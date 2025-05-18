"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Download, ChevronLeft, Grid2X2 } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/im3-ws6PvyobA6T5s8B5D362oeyCyrfkBp.webp"
              alt="GetPay Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
            <div className="hidden md:flex space-x-6 text-sm">
              <a href="#" className="hover:text-gray-300">
                HOME
              </a>
              <a href="#" className="hover:text-gray-300">
                FEATURES
              </a>
              <a href="#" className="hover:text-gray-300">
                WHY
              </a>
              <a href="#" className="hover:text-gray-300">
                PRICING
              </a>
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
          <p className="text-sm text-gray-400 mb-4">FROM DCTFUSION</p>
          <h1 className="text-5xl md:text-6xl font-light mb-8">
            Simple, Fast <span className="text-gray-500">, and Secure</span>
            <br />
            Live Video <span className="text-gray-500">Conference</span>
          </h1>
          <Link href={'/start'} className="bg-white text-black rounded-full px-8 py-3 text-sm font-medium hover:bg-gray-100 transition-colors">
            GET STARTED
          </Link>
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
              src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
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
              <h3 className="text-2xl font-light mb-1">2.3M+</h3>
              <p className="text-sm text-gray-400">Users</p>
            </div>
            <div>
              <h3 className="text-2xl font-light mb-1">4.9</h3>
              <p className="text-sm text-gray-400">Ratings</p>
            </div>
          </div>
          <div className=" space-y-4">
              <p className="text-sm text-gray-600">
                Trusted by 1,000,000+ marketing teams, agencies, and freelancers. 10,000+ 5-star ratings.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="text-gray-400">asana</div>
                <div className="text-gray-400">dokey.</div>
                <div className="text-gray-400">Discord</div>
                <div className="text-gray-400">ClickUp</div>
              </div>
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
              <div className="flex space-x-4">
                <button className="p-2 rounded-full bg-black/50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-black/50">
                  <Grid2X2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-xs">
                <Star className="text-yellow-300 fill-yellow-300"/>
                <Star className="text-yellow-300 fill-yellow-300"/>
                <Star className="text-yellow-300 fill-yellow-300"/>
              </div>
            </div>
            <div className="flex justify-between items-center bg-gray-900 p-4 rounded-lg shadow-lg">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Free, No Signup, and No Sign-in</h3>
              <p className="text-sm text-gray-400">
                💰 100% Free – No hidden fees, just instant access. <br />
                🙅‍♂️ No Signup – Start a meeting instantly. <br />
                🔑 No Sign-in – Join with a shared link, no hassle.
              </p>
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

