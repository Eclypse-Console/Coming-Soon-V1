import React from 'react'

import Beem_pulse from "../../components/Been-Pulse";



export default function HeroSection() {
  return (
    <div className="relative min-h-screen">
      <Beem_pulse />
      <div className='text-white relative lg:absolute w-full flex lg:flex-row flex-col items-center justify-between px-[5%] top-[40%] lg:text-left text-center md:z-[110]'>
        <div className="md:max-w-[38%]">
          <p className="text-[#9797C2] font-sora font-light leading-[100%] tracking-[0.4em] 
              text-[14px] text-center 
              md:text-[15px] 
              lg:text-[16px] lg:text-left">
            INTRODUCING
          </p>

          <h1 className="font-krona font-normal leading-[140%] tracking-[0em] 
               text-[48px] text-center 
               md:text-[60px] 
               lg:text-[54.22px] lg:text-left 
               bg-gradient-to-r from-[#EEF1F0] to-[#71757E] 
               bg-clip-text text-transparent ml-[-5px]
               lg:mt-0 mt-5
               break-words">
            Eclypse
          </h1>
        </div>

        <div className='relative z-[120] lg:hidden block lg:mt-0 mt-48 '>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke="#F2F2F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <div className='lg:mt-0 mt-20 lg:mb-0 mb-20 max-w-full lg:max-w-[29%] text-center 
                md:text-[14px] md:max-w-[45%]
                lg:text-[15px] lg:text-left text-[14px]'>
          <p className="md:mb-2">It's different. It's new.</p>

          <p className='text-[#999] lg:text-[#888] md:leading-[1.5]'>
            Don't shop. Vibe, connect, express. Where style isn't worn, it's felt. Style keeps changing. And so is the way we find it.
          </p>

          <br />

          <p>Stand out. Live the Eclypse.</p>
        </div>
      </div>
    </div>
  )
}
