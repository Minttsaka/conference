import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      {/* Newsletter Section */}
      <div className="bg-[#4361EE] p-8 rounded-lg container mx-auto mb-8">
        <div className="container mx-auto grid gap-8 lg:grid-cols-2 items-center">
          <div className="relative h-48 lg:h-full">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-f1e732a7fea1cba490bcefdea2118eb1-Z0E0aRqs6qHOMyQv3zNZn5cxZGdoBA.webp"
              alt="Vacuum cleaner illustration"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-white text-2xl font-semibold">
              Subscribe to our newsletter to get updates to our latest collections
            </h3>
            <p className="text-white/90">Get 20% off on your first order just by subscribing to our newsletter</p>
            <div className="flex gap-2 max-w-md">
              <Input type="email" placeholder="Enter your email" className="bg-white" />
              <Button variant="secondary">Subscribe</Button>
            </div>
            <p className=" text-white/80">
              You will be able to unsubscribe at any time.
              <Link href="/privacy-policy" className="underline ml-1">
                Read our privacy policy here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto  px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2">
                <Image src="/placeholder.svg" alt="Stay Clean Logo" width={40} height={40} />
                <span className="text-xl font-semibold">Stay Clean</span>
              </div>
            </Link>
            <p className="text-gray-600 text-xs ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-600 text-xs hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 text-xs hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 text-xs hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 text-xs hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 text-xs hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 text-xs hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-600 text-xs hover:text-primary">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/testimonial" className="text-gray-600 text-xs hover:text-primary">
                  Testimonial
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-600 text-xs hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/tweet" className="text-gray-600 text-xs hover:text-primary">
                  Tweet @ Us
                </Link>
              </li>
              <li>
                <Link href="/webinars" className="text-gray-600 text-xs hover:text-primary">
                  Webinars
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-gray-600 text-xs hover:text-primary">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 text-xs">
                <Phone className="h-4 w-4" />
                <span>(91) 98765 4321 54</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-xs">
                <Mail className="h-4 w-4" />
                <span>support@mail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className=" text-gray-600 text-xs">© Copyright by CodedUI. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className=" text-gray-600 text-xs hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className=" text-gray-600 text-xs hover:text-primary">
                Terms of Use
              </Link>
              <Link href="/legal" className=" text-gray-600 text-xs hover:text-primary">
                Legal
              </Link>
              <Link href="/sitemap" className=" text-gray-600 text-xs hover:text-primary">
                Site Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

