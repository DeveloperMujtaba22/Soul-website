"use client"

import React, { useState } from 'react'

const Team = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileSlide, setMobileSlide] = useState(0)

  const teamMembers = [
    { 
      src: '/team_1.jpg', 
      alt: 'Team Member 1',
    },
    { 
      src: '/team_2.jpg', 
      alt: 'Team Member 2',
    },
    { 
      src: '/team_3.png', 
      alt: 'Team Member 3',
    },
    { 
      src: '/team_4.png', 
      alt: 'Team Member 4',
    }
  ]

  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 2) >= teamMembers.length ? 0 : prev + 2)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 2) < 0 ? Math.max(0, teamMembers.length - 2) : prev - 2)
  }

  
  const nextMobileSlide = () => {
    setMobileSlide((prev) => (prev + 1) % teamMembers.length)
  }

  const prevMobileSlide = () => {
    setMobileSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
  }

  return (
    <div className="bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        
        <div className="hidden lg:grid grid-cols-2 gap-12 items-center">
          
          
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">
              Team <span className="text-red-600 font-semibold">Members</span>
            </h2>
            
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
              Our dedicated team of trainers, tech experts, and industry professionals are here to guide and support you on your journey at Soul Champ. With their expertise and mentorship, you'll gain invaluable knowledge and skills to thrive in the digital world.
            </p>

            
            <div className="flex gap-4 mt-8">
              
              <button
                onClick={prevSlide}
                className="bg-red-600/20 hover:bg-red-600 text-white p-4 rounded-full transition-colors duration-300 border border-red-600"
                aria-label="Previous team members"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              
              <button
                onClick={nextSlide}
                className="bg-red-600/20 hover:bg-red-600 text-white p-4 rounded-full transition-colors duration-300 border border-red-600"
                aria-label="Next team members"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 h-[400px] md:h-[500px]">
              
              {teamMembers[currentSlide] && (
                <div className="relative overflow-hidden rounded-lg h-full transition-all duration-500">
                  <img 
                    src={teamMembers[currentSlide].src} 
                    alt={teamMembers[currentSlide].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              
              {teamMembers[currentSlide + 1] && (
                <div className="relative overflow-hidden rounded-lg h-full transition-all duration-500">
                  <img 
                    src={teamMembers[currentSlide + 1].src} 
                    alt={teamMembers[currentSlide + 1].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.ceil(teamMembers.length / 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index * 2)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index * 2 ? 'bg-red-600 w-8' : 'bg-gray-500 w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

        
        <div className="lg:hidden space-y-8">
          
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-light">
              Team <span className="text-red-600 font-semibold">Members</span>
            </h2>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Our dedicated team of trainers, tech experts, and industry professionals are here to guide and support you on your journey at Soul Champ. With their expertise and mentorship, you'll gain invaluable knowledge and skills to thrive in the digital world.
            </p>
          </div>

          
          <div className="relative">
            
            <div className="relative overflow-hidden rounded-lg h-[400px]">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
                    index === mobileSlide ? 'translate-x-0' : index < mobileSlide ? '-translate-x-full' : 'translate-x-full'
                  }`}
                >
                  <img 
                    src={member.src} 
                    alt={member.alt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

           
            <button
              onClick={prevMobileSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600 text-white p-3 rounded-full transition-colors duration-300 z-10"
              aria-label="Previous team member"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

           
            <button
              onClick={nextMobileSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600 text-white p-3 rounded-full transition-colors duration-300 z-10"
              aria-label="Next team member"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            
            <div className="flex justify-center gap-2 mt-6">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setMobileSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === mobileSlide ? 'bg-red-600 w-8' : 'bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Team