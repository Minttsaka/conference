'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'


function FlowerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuItems = ['Home', 'Projects', 'Skills', 'About', 'Contact']
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl"
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X /> : '☰'}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-16 right-40"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={item}
                className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: Math.cos(index * (2 * Math.PI) / menuItems.length) * 100,
                  y: Math.cos(index * (2 * Math.PI) / menuItems.length) * 100,
                }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href={`#${item.toLowerCase()}`}>
                  {item}
                </Link>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LandingPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {

  }, [searchParams])

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('?contact=true', { scroll: false })
  }

  return (
    <div ref={containerRef} className="relative min-h-screen text-white overflow-hidden " id='home'>
         <div className="absolute inset-0 flex -z-10">
         <div className="w-1/2 bg-black"></div>
        <div className="w-1/2 bg-white"></div>
        
      </div>
      <FlowerMenu />
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ y, opacity, scale }}
      >
        <div className="text-center mb-8">
          <h1 className="text-6xl  md:text-8xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Miracle Tsaka
          </h1>
          <p className="text-2xl mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-200">Web Developer | ML Engineer</p>
          <p className="text-lg mb-4  text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-200">Turning ideas into intelligent, interactive experiences</p>
        </div>

        <div className="relative w-48 h-48 mb-8 rounded-full overflow-hidden border-4 border-green-500 shadow-lg shadow-green-500/50">
          <Image
            src="/mint.png"
            alt="miracle tsaka profile"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-4">
          <Link href='#projects'>
            <motion.button
              className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold transform transition-transform duration-200 ease-in-out"
              whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgb(34,197,94)' }}
              whileTap={{ scale: 0.95 }}
            >
              Explore My Work
            </motion.button>
          </Link>
          <motion.button
            className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold transform transition-transform duration-200 ease-in-out"
            whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgb(59,130,246)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContactClick}
          >
            Contact Me
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}