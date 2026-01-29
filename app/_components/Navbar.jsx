
'use client'
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../public/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToProgram = (e) => {
    e.preventDefault();
    const programSection = document.getElementById('program');
    if (programSection) {
      programSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="py-4 px-6 md:px-10 flex justify-between items-center fixed top-0 w-full z-50">
      {/* Mobile Menu Button (Left) */}
      <button 
        className="md:hidden text-white p-2 hover:text-red-500 transition-colors"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      
      <div className="hidden md:flex gap-8 lg:gap-12 items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src={logo} 
            width={80} 
            height={80} 
            alt="SoulChamp Logo" 
            className="cursor-pointer hover:scale-105 transition-transform" 
          />
        </Link>
        
        <div className="flex gap-6 lg:gap-10">
          <Link 
            href="/" 
            className="text-red-500 hover:text-red-600 cursor-pointer transition-colors font-medium"
          >
            About
          </Link>
          <a 
            href="#program" 
            onClick={scrollToProgram}
            className="text-white hover:text-red-600 cursor-pointer transition-colors font-medium"
          >
            Program
          </a>
          <Link 
            href="#process" 
            className="text-white hover:text-red-600 cursor-pointer transition-colors font-medium"
          >
            Application Process
          </Link>
          <Link 
            href="#services" 
            className="text-white hover:text-red-600 cursor-pointer transition-colors font-medium"
          >
            Serving the Community
          </Link>
        </div>
      </div>

      {/* Mobile Logo (Center) */}
      <Link href="/" className="md:hidden absolute left-1/2 transform -translate-x-1/2">
        <Image 
          src={logo} 
          width={60} 
          height={60} 
          alt="SoulChamp Logo" 
          className="cursor-pointer hover:scale-105 transition-transform mr-5" 
        />
      </Link>
      
      
      <div className="hidden md:flex gap-3 items-center">
        <Link href="/application">
          <Button 
            variant="ghost"
            className="bg-transparent text-red-500 hover:bg-transparent hover:text-red-600 transition-colors text-base py-3 px-10 border-0 cursor-pointer"
          >
            Apply Now
          </Button>
        </Link>

        <SignedIn>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10"
              }
            }}
          />
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">
            <Button className="bg-red-600 hover:bg-red-700 text-white text-lg py-4 px-14 rounded-full font-semibold h-12 cursor-pointer">
              Login
            </Button>
          </Link>
        </SignedOut>
      </div>

      {/* Mobile Login/User Button (Right) */}
      <div className="md:hidden flex items-center">
        <SignedIn>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10"
              }
            }}
          />
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">
            <Button className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-6 rounded-full font-semibold h-10 cursor-pointer">
              Login
            </Button>
          </Link>
        </SignedOut>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md md:hidden border-t border-white/10">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link 
              href="/" 
              className="text-red-500 hover:text-red-600 cursor-pointer transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              About
            </Link>
            <a 
              href="#program" 
              onClick={scrollToProgram}
              className="text-white hover:text-red-600 cursor-pointer transition-colors font-medium py-2"
            >
              Program
            </a>
            <Link 
              href="/application-process" 
              className="text-white hover:text-red-400 cursor-pointer transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Application Process
            </Link>
            <Link 
              href="/community" 
              className="text-white hover:text-red-400 cursor-pointer transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Serving the Community
            </Link>

            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <Link href="/apply" onClick={toggleMenu}>
                <Button 
                  variant="outline"
                  className="w-full bg-transparent text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition-colors text-base py-3"
                >
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      
    </nav>
    
  );
};

export default Navbar;