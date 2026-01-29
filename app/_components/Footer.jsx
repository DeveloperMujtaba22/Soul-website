import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        
        
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          
          
          <div className="flex justify-center gap-6 mb-8">
            <Link 
              href="https://www.facebook.com/mujtaba.degwala.9" 
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-red-600 hover:text-white transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </Link>
            
            <Link 
              href="https://twitter.com" 
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-red-600 hover:text-white transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </Link>
            
            <Link 
              href="https://www.instagram.com/mujtabarasheed/?next=" 
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-red-600 hover:text-white transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </Link>
            
            <Link 
              href="https://www.linkedin.com/in/mujtaba-b50000363/" 
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-red-600 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </Link>
          </div>
        </div>

        
        <div className="border-t border-gray-800  pt-6 text-center text-gray-400 text-sm">
          <p>
            © 2018-23 SoulChamp • <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link> • Site Design by <Link href="https://husaynhijas.com" target="_blank" className="hover:text-white transition-colors font-bold text-white">Husayfa Hijas</Link>
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer