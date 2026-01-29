import React from 'react'
import Link from 'next/link'

const Process = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden" id='process'>
      
      <div className="absolute inset-0">
        <img 
          src="/process_1.png"
          alt="Application background"
          className="w-full h-full object-cover"
        />
       
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" >
       
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-white">
          Application <span className="text-red-600 font-semibold">Process</span>
        </h2>

        
        <p className="text-gray-200 text-sm md:text-base lg:text-lg leading-relaxed mb-8 max-w-6xl mx-auto">
          Joining Soul Champ is easy! Simply fill out our online application form, providing us with your background, interests, and goals. We review each application carefully and select individuals who demonstrate a passion for both fitness and technology.
        </p>

        
        <Link href="/apply">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-12 rounded-full text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Apply Now
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Process