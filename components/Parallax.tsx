'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type ParallaxTextProps = {
  children: ReactNode
  speed?: number
}

const ParallaxText = ({ children, speed = 0.5 }: ParallaxTextProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ['50%', `${-100 * speed}%`])

  return (
    <motion.div ref={ref} style={{ x }} className="whitespace-nowrap">
      {children}
    </motion.div>
  )
}

export default function WebDevParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current
      if (container) {
        const containerWidth = container.offsetWidth
        const textElements = container.querySelectorAll('.parallax-text') as NodeListOf<HTMLDivElement>
        textElements.forEach((el) => {
          el.style.width = `${containerWidth}px`
        })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-700 text-white flex items-center"
    >
      <motion.div 
        className="relative z-10 py-20"
        style={{ opacity }}
      >
        <ParallaxText speed={0.5}>
          <h2 className="parallax-text text-6xl md:text-8xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Shaping the Digital Future
          </h2>
        </ParallaxText>

        <ParallaxText speed={0.7}>
          <p className="parallax-text text-6xl md:text-4xl font-bold mb-8 text-gray-300">
            Turning Ideas into Interactive Realities
          </p>
        </ParallaxText>

        <ParallaxText speed={0.9}>
          <p className="parallax-text text-6xl mb-8 text-gray-400">
            Crafting Seamless User Experiences with Code
          </p>
        </ParallaxText>

        <ParallaxText speed={1.1}>
          <p className="parallax-text text-6xl mb-8 text-gray-500">
            Building the Backbone of the Modern Web
          </p>
        </ParallaxText>

        <ParallaxText speed={1.3}>
          <p className="parallax-text text-base md:text-lg text-gray-600">
            Dreams come true
          </p>
        </ParallaxText>
      </motion.div>
    </section>
  )
}
