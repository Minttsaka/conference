import React, { useState } from 'react'
import { motion,  } from 'framer-motion'
import { X, Send, User, Mail, } from 'lucide-react'
import { sendMessage } from '@/lib/action'

interface ContactModalProps {
  onClose: () => void
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {

    const data = { name, email, message }
    e.preventDefault()
    await sendMessage(data)
  
    onClose()
  }

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring', 
        damping: 15, 
        stiffness: 200,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9,
      transition: { 
        type: 'spring', 
        damping: 15, 
        stiffness: 200,
        when: "afterChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="relative overflow-hidden shadow-2xl border-0">
      <div className="absolute inset-0 flex -z-10">
            <div className="w-1/2 bg-black"></div>
            <div className="w-1/2 bg-white"></div>
        </div>
        <motion.div 
          className=" p-4 flex justify-between items-center"
                 >
          <h2 className=" text-white flex items-center">
            Contact
          </h2>
          <motion.button
            onClick={onClose}
            className="text-white hover:text-pink-200 transition-colors duration-300"
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 text-black" />
          </motion.button>
        </motion.div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-green-300 mb-1">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
              <input
                type="text"
                id="name"
                className="w-full pl-10 pr-3 py-2 text-white bg-black  border-0 shadow  placeholder:text-xs focus:outline-none focus:ring-0 transition-all duration-300"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-green-300 mb-1">
               Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
              <input
                type="email"
                id="email"
                className="w-full pl-10 placeholder:text-xs pr-3 py-2 text-white bg-black  border-0 shadow   focus:outline-none focus:ring-0 transition-all duration-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="block text-sm font-medium text-green-300 mb-1">
              Description
            </label>
            <textarea
              id="message"
              rows={3}
              className="w-full placeholder:text-xs pl-10 pr-3 py-2 text-white bg-black  border-0 shadow   focus:outline-none focus:ring-0 transition-all duration-300"
              placeholder="Describe your quest or inquiry..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </motion.div>
          <motion.button
            type="submit"
            className="w-full text-white font-bold py-2 px-4 transition-all duration-300 flex items-center justify-center overflow-hidden relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
             <div className="absolute inset-0 flex -z-10">
                <div className="w-1/2 bg-white"></div>
                <div className="w-1/2 bg-black"></div>
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 1,
                ease: 'linear',
              }}
              style={{ mixBlendMode: 'overlay' }}
            />
           
            <Send className="w-5 h-5 mr-2" />
            <span className="relative z-10 text-[green]">Send</span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}