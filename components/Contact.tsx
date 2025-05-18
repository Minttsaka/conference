'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import ContactModal from './ContactModal'

export default function ContactChat() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const contact = searchParams.get('contact')
    if (contact === 'true') {
      setIsModalOpen(true)
    }
  }, [searchParams])

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('?contact=true', { scroll: false })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    router.push('/', { scroll: false })
  }

  const buttonVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } },
    tap: { scale: 0.95, rotate: 0 }
  }

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      >
        
        <motion.button
          className="relative text-white rounded-lg p-4 shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-white"
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onClick={handleContactClick}
        >
        <div className="absolute inset-0 flex -z-10">
            <div className="w-1/2 bg-black"></div>
            <div className="w-1/2 bg-white"></div>
        </div>
          <MessageCircle className="w-6 h-6 mr-2 text-sm" />
          <span className="text-sm text-gray-400">Contact</span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <ContactModal onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </>
  )
}