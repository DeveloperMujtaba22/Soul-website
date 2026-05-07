
import React from 'react'
import Link from 'next/link'
import BuyButton from './BuyButton';
import ApplyButton from './ApplyButton';

const About = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 sm:px-6 overflow-hidden">
      

      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/banner.png')`,
          }}
        />
      
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
      </div>
      

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center px-4">
        

        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
          An Immersive Fitness, Technology And Life Coaching
          <br className="hidden xs:block" />
          <span className="xs:hidden"> </span>
          Program For San Francisco Youth.
        </h1>
        
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-100 leading-relaxed mb-6 sm:mb-10 max-w-3xl mx-auto drop-shadow-lg">
          At Soul Champ, we believe in innovation, empowerment, and community. Through our unique program, we inspire individuals to embrace their potential, explore cutting-edge technologies, and foster a supportive network.
        </p>
        
        
       <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center w-full max-w-md sm:max-w-none mx-auto">
 <div className="w-full sm:w-auto">
    <ApplyButton className="w-full sm:w-auto bg-white hover:bg-gray-100 text-red-600 font-semibold py-2.5 sm:py-3 px-8 sm:px-10 rounded-full text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 cursor-pointer">
      Apply Now
    </ApplyButton>
  </div>


          
        {/* BuyButton yahan add karo */}
  <div className="w-full sm:w-auto ">
    <BuyButton />
  </div>
</div>


      
     



     
        
    </div>
    </div>
  )
}




export default About