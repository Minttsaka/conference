'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const images = [
  {
    title: "Tech Conference Speaker",
    description: "Presentations in class",
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
    title: "Open Source Contributor",
    description: "Active contributor to React and TensorFlow projects",
    image: "/p.png",
    date: "Ongoing",
  },
  {
    title: "Yoga Enthusiast",
    description: "Finding balance through daily yoga practice",
    image: "/m.png",
    date: "Daily",
  },
  {
    title: "World Traveler",
    description: "Explored 20+ countries, always seeking new perspectives",
    image: "/boss.jpg",
    date: "Ongoing",
  },
  {
    title: "Amateur Photographer",
    description: "Capturing moments and memories through the lens",
    image: "/happy.jpg",
    date: "Hobby",
  },
]

const ImageCard = ({ src, index, position }:{ src:string, index:number, position:{x: number,y: number}}) => {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <motion.div
      ref={cardRef}
      className="absolute"
      style={{
        width: '500px',
        height: '600px',
        left: `${position.x}%`,
        top: `${position.y}px`,
        y,
        opacity,
        scale,
      }}
    >
      <div className="relative w-full h-full overflow-hidden shadow-xl">
        <Image
          src={src}
          alt={`Relaxing moment ${index + 1}`}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-300 ease-in-out"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <span className="text-white font-semibold text-2xl">Picture {index + 1}</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ImmersiveImageSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])

  const cardPositions = images.map((_, index) => ({
    x: (index % 3) * 30 + Math.random() * 10 - 5, // Scattered across 3 columns
    y: index * 400 + Math.random() * 200 - 100, // Vertical position with some randomness
  }))

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-black"></div>
        <div className="w-1/2 bg-white"></div>
      </div>
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        <Image
          src="/relaxing-pattern.jpg"
          alt="miracle tsaka from xtreme region images"
          layout="fill"
          objectFit="cover"
        />
      </motion.div>
      <div ref={containerRef} className="relative container mx-auto px-4 py-16">
        <motion.h2 
          className="text-6xl font-bold mb-24 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Moments of Relaxation
        </motion.h2>
        <div className="relative" style={{ height: `${cardPositions[cardPositions.length - 1].y + 800}px` }}>
          {images.map((src, index) => (
            <ImageCard key={index} src={src.image} index={index} position={cardPositions[index]} />
          ))}
        </div>
      </div>
    </section>
  )
}