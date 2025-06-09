'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface TimelineItem {
  year: string
  title: string
  description: string
}

const timelineData: TimelineItem[] = [
  {
    year: '2021',
    title: 'Business studies degree',
    description: 'Got selected to Mubas to pursue bachelors of education(business and studies).',
  },
  {
    year: '2022',
    title: 'Coding journey',
    description: 'Started coding journey as self taught developer who studies books very hard and attended bootcamps.',
  },
  {
    year: '2023',
    title: 'Teaching programming',
    description: 'Started teaching my friends and those who were in need of it.',
  }
  ,
  {
    year: '2023,',
    title: 'ML Lessons',
    description: 'I ventured into machine learning, learning basics to advanced concepts .',
  },
  {
    year: '2024',
    title: 'Founding extreme region tech startup',
    description: 'Founded extreme region , leading Edtech startup, changing experience of education.',
  },
  {
    year: '2024,',
    title: 'Attachment',
    description: 'Did my attachment at matapwata secondary school , opening opportunity for students and instructors to use technology that extreme region is offering to the world.',
  },
]

const AboutMe: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null)

  return (
    <section className="relative py-16 overflow-hidden" id='about'>
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-white"></div>
        <div className="w-1/2 bg-black"></div>
      </div>
      <div className="relative container mx-auto px-4 flex flex-col lg:flex-row">
        {/* Timeline Section */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">My Journey</h2>
          <div className="relative" id='skills'>
            {/* Timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500" />
            
            {/* Timeline Items */}
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                className={`flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div 
                  className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="inline-block cursor-pointer">
                    <h3 className="text-sm font-semibold mb-2 text-gray-800">{item.title}</h3>
                    <p className="text-blue-500 text-xs">{item.year}</p>
                  </div>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full" />
                </div>
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>

          {/* Detail View */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 bg-gray-100 p-6 rounded-lg shadow-lg"
              >
                <h3 className=" font-bold mb-2 text-sm text-gray-800">{selectedItem.title}</h3>
                <p className="text-blue-500 mb-4 text-xs">{selectedItem.year}</p>
                <p className="text-gray-600 text-xs">{selectedItem.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Biography Section */}
        <div className="w-full lg:w-1/2 lg:pl-12">
          <div className="bg-black text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <div className="mb-6">
              <Image
                src="/mint.png"
                alt="miracle tsaka image"
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
            </div>
            <p className="mb-4">
              Hello! am Miracle Tsaka, a passionate Full Stack Developer and Machine Learning Engineer with a knack for turning complex problems into elegant solutions. My journey in tech began in 2022, and since then, I hasve been on an exciting ride through the ever-evolving landscape of software development and artificial intelligence.
            </p>
            <p className="mb-4">
              With a strong foundation in Computer Science and years of hands-on experience, I specialize in building robust web applications and developing cutting-edge ML models. My expertise spans across various technologies, including React, Node.js, Python, and TensorFlow.
            </p>
            <p className="mb-4">
              When I am not coding, you can find me exploring the latest tech trends, contributing to open-source projects, or sharing my knowledge through tech blogs and community meetups. I am always eager to take on new challenges and collaborate on innovative projects that push the boundaries of what is possible in tech.
            </p>
            <p className="mb-4">
              In 2024 , i founded extreme region, edtech startup, changing how education is being conducted in the world. <Link className='underline' target='__blank' href={'https://extreme region.tech'}>Click this link to explore.</Link>
            </p>
            <p>
              Lets connect and create something amazing together!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe