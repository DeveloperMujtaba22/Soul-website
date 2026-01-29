"use client"

import React, { useState } from 'react'

const Serving = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const images = [
    { src: '/program_1.png', alt: 'Meditation and mindfulness', border: 'left' },
    { src: '/program_2.png', alt: 'Yoga practice', border: 'right' },
    { src: '/program_3.jpg', alt: 'Partner yoga', border: 'left' },
    { src: '/program_4.jpg', alt: 'Meditation pose', border: 'right' }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="bg-black text-white py-16 px-4" id='services'>
      <div className="max-w-9xl mx-auto" id='program'>
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Serving the  <span className="text-red-600 font-semibold">Community</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-4xl mx-auto leading-relaxed">
            At Soul Champ, we believe in innovation, empowerment, and community. Through our unique program, we inspire individuals to embrace 
            their potential, explore cutting-edge technologies, and foster a supportive network.
          </p>
        </div>

        
        <div className="lg:hidden">
          <div className="relative">
            
            <div className="relative overflow-hidden rounded-lg h-80">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
                    index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                  }`}
                >
                  <div className="relative w-full h-full group">
                    <div className={`absolute ${image.border === 'left' ? 'left-0' : 'right-0'} top-1/4 bottom-1/4 w-1 bg-red-600 group-hover:top-0 group-hover:bottom-0 transition-all duration-300`}></div>
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600 text-white p-3 rounded-full transition-colors duration-300 z-10"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

           
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600 text-white p-3 rounded-full transition-colors duration-300 z-10"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            
            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-red-600 w-8' : 'bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        
        <div className="hidden lg:grid grid-cols-4 gap-6">
          
          <div className="relative overflow-hidden rounded-lg w-full h-64 cursor-pointer group">
            <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-red-600 group-hover:top-0 group-hover:bottom-0 transition-all duration-300"></div>
            <img 
              src="/program_1.png" 
              alt="Meditation and mindfulness"
              className="w-full h-full object-cover"
            />
          </div>

          
          <div className="relative overflow-hidden rounded-lg w-full h-64 cursor-pointer group">
            <div className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-red-600 group-hover:top-0 group-hover:bottom-0 transition-all duration-300"></div>
            <img 
              src="/program_2.png"
              alt="Yoga practice"
              className="w-full h-full object-cover"
            />
          </div>

          
          <div className="relative overflow-hidden rounded-lg w-full h-64 cursor-pointer group">
            <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-red-600 group-hover:top-0 group-hover:bottom-0 transition-all duration-300"></div>
            <img 
              src="/program_3.png" 
              alt="Partner yoga"
              className="w-full h-full object-cover"
            />
          </div>

         
          <div className="relative overflow-hidden rounded-lg w-full h-64 cursor-pointer group">
            <div className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-red-600 group-hover:top-0 group-hover:bottom-0 transition-all duration-300"></div>
            <img 
              src="/program_4.png" 
              alt="Meditation pose"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Serving