"use client"

import React, { useState } from 'react'

const Activities = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const activities = [
    {
      id: 1,
      image: '/activities_1.jpg',
      alt: 'Activity 1'
    },
    {
      id: 2,
      image: '/activities_2.jpg',
      alt: 'Activity 2'
    },
    {
      id: 3,
      image: '/activities_3.jpg',
      alt: 'Activity 3'
    },
    {
      id: 4,
      image: '/activities_4.jpg',
      alt: 'Activity 4'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activities.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activities.length) % activities.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="bg-red-600 text-white py-16 px-4 md:px-8">
      <div className="max-w-[1800px] mx-auto">
        
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Program Activities
          </h2>
          
          <p className="text-white text-sm md:text-base leading-relaxed max-w-5xl mx-auto">
            Get ready for an exciting array of activities at Soul Champ. From immersive fitness classes that blend high-intensity workouts with interactive technology to workshops on digital arts and coding, our program offers a dynamic learning experience like no other. In addition, we offer training in financial literacy to keep you on top of your goals and financial health!
          </p>
        </div>

        
        <div className="hidden lg:grid grid-cols-4 gap-6 w-full">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer w-full"
            >
              <img 
                src={activity.image}
                alt={activity.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        
        <div className="lg:hidden">
          <div className="relative">
            
            <div className="relative overflow-hidden rounded-2xl aspect-square">
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
                    index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                  }`}
                >
                  <img 
                    src={activity.image} 
                    alt={activity.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

          
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-white/90 hover:text-red-600 text-white p-3 rounded-full transition-colors duration-300 z-10"
              aria-label="Previous activity"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

       
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-white/90 hover:text-red-600 text-white p-3 rounded-full transition-colors duration-300 z-10"
              aria-label="Next activity"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            
            <div className="flex justify-center gap-2 mt-6">
              {activities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                  aria-label={`Go to activity ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Activities