'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

type ItemType = {
  title: string,
  description: string,
  image: string,
  date: string,
}

const eventsAndLifestyle = [
  {
    title: "Tech Conference Speaker",
    description: "Presenting effects of technology and ai in education.",
    image: "/p.jpg",
    date: "June 15, 2023",
  },
  {
    title: "Hackathon Winner",
    description: "Led team to victory in 48-hour coding challenge",
    image: "/h.jpg",
    date: "August 22, 2023",
  },
  {
    title: "Extracurricular activities",
    description: "Actively involved in extracurricular activities as well. at the university",
    image: "/p.png",
    date: "Ongoing",
  },
  {
    title: "Attending Classes",
    description: "Attending classes as the best performer in class",
    image: "/m.png",
    date: "Daily",
  },
  {
    title: "City Traveler",
    description: "Explored 20+ malawi districts, always seeking new perspectives",
    image: "/boss.jpg",
    date: "Ongoing",
  },
  
  {
    title: "Amateur Photographer",
    description: "Capturing moments and memories through the lens",
    image: "/happy.jpg",
    date: "Hobby",
  },
  {
    title: "Worship events",
    description: "Actively involved in worship activities as well.",
    image: "/worship.jpg",
    date: "Ongoing",
  },
]

const EventLifestyleItem = ({ item, index }:{ item:ItemType, index:number}) => {
  const itemRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <motion.div 
      ref={itemRef}
      style={{ y, opacity }}
      className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} mb-16`}
    >
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <div className="relative h-64 w-full">
          <Image
            src={item.image}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            className=" shadow-lg object-center"
          />
        </div>
      </div>
      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
        <h3 className={`text-2xl font-bold mb-2 ${index % 2 === 0 ? 'text-black' : 'text-gray-800'}`}>{item.title}</h3>
        <p className={`text-sm mb-2 ${index % 2 === 0 ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
        <span className={`text-xs ${index % 2 === 0 ? 'text-gray-400' : 'text-gray-500'}`}>{item.date}</span>
      </div>
    </motion.div>
  )
}

export default function EventsLifestyleSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-white"></div>
        <div className="w-1/2 bg-black"></div>
      </div>
      <div className="relative container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-200"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Events & Lifestyle
        </motion.h2>
        <div className="space-y-16">
          {eventsAndLifestyle.map((item, index) => (
            <EventLifestyleItem key={index} item={item as ItemType} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}