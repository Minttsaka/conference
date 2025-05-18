'use client'

import { useRef, useEffect, FC } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
  title: string
  description: string
  image: string
  link: string
  tech: string[]
}

const projects: Project[] = [
  // Add your project data here as in the original code
]

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard: FC<ProjectCardProps> = ({ project}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100])

  return (
    <motion.div 
      ref={cardRef}
      style={{ opacity, y }}
      className="flex-shrink-0 hover:z-50 hover:bg-white w-80 bg-gradient-to-br from-gray-100 to-gray-300 shadow-lg overflow-hidden mr-[-100px] last:mr-0"
    >
      <div className="relative h-48">
        <Image
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <Image
            src="/boss.jpg"
            alt="Miracle Tsaka"
            width={80}
            height={80}
            className="rounded-full border-4 border-white"
          />
        </div>
      </div>
      <div className="p-4">
        <Link href={project.link} target="_blank" className="text-xl hover:underline font-bold mb-2 text-gray-800">
          {project.title}
        </Link>
        <p className="text-sm mb-4 text-gray-600">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, index) => (
            <span key={index} className="text-xs bg-gray-200 px-2 py-1 text-gray-700">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        container.scrollLeft += e.deltaY
      }
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <section className="relative py-16 overflow-hidden" id="projects">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-white"></div>
        <div className="w-1/2 bg-black"></div>
      </div>
      <div className="relative">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-200"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Innovative Projects
        </motion.h2>
        <motion.div 
          ref={containerRef}
          style={{ x }}
          className="flex hide-scrollbar overflow-x-auto pb-10"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
