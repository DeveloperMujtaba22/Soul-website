"use client"

import React, { useState } from 'react'

const Benefits = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const benefits = [
    { 
      src: '/team_1.jpg', 
      alt: 'Benefit 1',
    },
    { 
      src: '/team_2.jpg', 
      alt: 'Benefit 2',
    },
    { 
      src: '/team_3.png', 
      alt: 'Benefit 3',
    },
    { 
      src: '/team_4.png', 
      alt: 'Benefit 4',
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 2) >= benefits.length ? 0 : prev + 2)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 2) < 0 ? Math.max(0, benefits.length - 2) : prev - 2)
  }

  return (
    <div className="bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">
              Program <span className="text-red-600 font-semibold">Benefits</span>
            </h2>
            
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
              By participating in Soul Champ, you'll enjoy numerous benefits. Enhance your physical fitness, develop technical skills, expand your creative horizons, and join a vibrant community of like-minded individuals, all while opening doors to exciting career opportunities. In addition our program provides meals, a stipend, and technical resources.
            </p>

            
            <div className="flex gap-4 mt-8">
             
              <button
                onClick={prevSlide}
                className="bg-red-600/20 hover:bg-red-600 text-white p-4 rounded-full transition-colors duration-300 border border-red-600"
                aria-label="Previous benefits"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              
              <button
                onClick={nextSlide}
                className="bg-red-600/20 hover:bg-red-600 text-white p-4 rounded-full transition-colors duration-300 border border-red-600"
                aria-label="Next benefits"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 h-[400px] md:h-[500px]">
              
              {benefits[currentSlide] && (
                <div className="relative overflow-hidden rounded-lg h-full transition-all duration-500">
                  <img 
                    src={benefits[currentSlide].src} 
                    alt={benefits[currentSlide].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              
              {benefits[currentSlide + 1] && (
                <div className="relative overflow-hidden rounded-lg h-full transition-all duration-500">
                  <img 
                    src={benefits[currentSlide + 1].src} 
                    alt={benefits[currentSlide + 1].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.ceil(benefits.length / 2) }).map((_, index) => (
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
      </div>
    </div>
  )
}

export default Benefits