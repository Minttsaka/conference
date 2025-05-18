"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Facebook, LucideProps } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, ReactNode, MouseEvent } from 'react'

type SocialLink = {
  icon: React.ComponentType<LucideProps>; // Use LucideProps for compatibility
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  { icon: Github, href: 'https://github.com/Minttsaka/', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/miracle-tsaka/', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://web.facebook.com/profile.php?id=100076219502154', label: 'Facebook' },
  { icon: Mail, href: 'mailto:miracletsaka@gmail.com', label: 'Email' },
]

type FooterLinkProps = {
  href: string;
  children: ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <a
    href={href}
    className="text-gray-400 hover:text-white transition-colors duration-300"
  >
    {children}
  </a>
)

type SocialIconProps = {
  icon: React.ComponentType<LucideProps>;
  href: string;
  label: string;
}

const SocialIcon = ({ icon: Icon, href, label }: SocialIconProps) => (
  <motion.a
    target="__blank"
    href={href}
    aria-label={label}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="text-gray-400 hover:text-white transition-colors duration-300"
  >
    <Icon size={24} /> {/* Pass the size prop as needed */}
  </motion.a>
)

export default function PortfolioFooter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {}, [searchParams])

  const handleContactClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('?contact=true', { scroll: false })
  }

  return (
    <footer className="relative text-white" id="contact">
      <div className="-z-10 absolute inset-0 flex">
        <div className="w-1/2 bg-white"></div>
        <div className="w-1/2 bg-black"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Miracle Tsaka</h3>
            <p className="text-gray-400 mb-4">Web Developer & ML Engineer</p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <SocialIcon key={link.label} {...link} />
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><FooterLink href="#about">About</FooterLink></li>
              <li><FooterLink href="#projects">Projects</FooterLink></li>
              <li><FooterLink href="#skills">Skills</FooterLink></li>
              <li><FooterLink href="?contact=true">Contact</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <p className="text-gray-400 mb-2">Email: miracletsaka@gmail.com</p>
            <p className="text-gray-400 mb-4">Location: Blantyre, BT</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleContactClick}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Contact Me
            </motion.button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-xs border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Miracle Tsaka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
