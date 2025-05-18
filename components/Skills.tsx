'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  level: number // 1-5, where 5 is expert
}

const skills: Skill[] = [
  { name: 'React', level: 5 },
  { name: 'TypeScript', level: 4 },
  { name: 'Node.js', level: 4 },
  { name: 'Python', level: 3 },
  { name: 'Machine Learning', level: 3 },
  { name: 'GraphQL', level: 3 },
  { name: 'Docker', level: 2 },
  { name: 'AWS', level: 2 },
  { name: 'MongoDB', level: 3 },
  { name: 'Next.js', level: 4 },
  { name: 'TensorFlow', level: 2 },
  { name: 'CSS/SASS', level: 4 },
  { name: 'Git', level: 4 },
  { name: 'RESTful APIs', level: 4 },
  { name: 'SQL', level: 3 },
]

const SkillItem: React.FC<{ skill: Skill; index: number; total: number }> = ({ skill, index, total }) => {
  const angle = (index / total) * 2 * Math.PI
  const radius = 40 + skill.level * 30 // Increased radius for better spacing
  const x = Math.cos(angle) * radius
  const y = Math.tan(angle) * radius

  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div 
        className={`text-sm font-semibold p-2 rounded-full whitespace-nowrap
                    ${skill.level >= 4 ? 'bg-purple-600 text-white' : 
                      skill.level >= 3 ? 'bg-blue-500 text-white' : 
                      'bg-gray-300 text-gray-800'}`}
      >
        {skill.name}
      </div>
    </motion.div>
  )
}

const SkillsConstellation: React.FC = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative py-16 overflow-hidden ">
        <div className="absolute inset-0 flex -z-10">
        <div className="w-1/2 bg-black"></div>
        <div className="w-1/2 bg-white"></div>
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">My Tech Universe</h2>
        <div className="relative w-full" style={{  maxHeight: '800px', minHeight: '400px' }}>
          {skills.map((skill, index) => (
            <SkillItem key={skill.name} skill={skill} index={index} total={skills.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsConstellation