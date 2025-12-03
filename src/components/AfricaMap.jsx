"use client"
import { MapData } from '@/data/MapData'
import React from 'react'



export default function AfricaMap() {
  


  return (
    <>
      <section id='africa__map' className='w-[100%] text-lg bg-gradient-to-br from-yellow-200 to-yellow-800'>
        <div
          className='mx-auto w-[90vw] lg:h-[39rem] h-auto pt-[6rem] overflow-hidden flex lg:flex-row flex-col items-center lg:justify-between'>
          <div className='lg:w-[40%] w-[100%] p-8 lg:mb-0 mb-[4rem]'>
              <h4 className='text-[3rem] font-medium mb-3 text-slate-800'>Map of Africa</h4>
              <p className='text-slate-800 italic mb-2'>Click a Country on the map to get more info.</p>
              <h5 className='font-bold text-lg mb-2 text-slate-800'> KEY</h5>
              <section className='text-sm text-slate-800'>
                <div className='w-[100%] flex items-center justify-start font-semibold border border-slate-800'>
                  <div className='w-[30%] border-r border-slate-800 text-slate-800 p-2'>COLOR</div>
                  <div className='w-[70%] text-slate-800 p-2'>DESCRIPTION</div>
                </div>
                <div className='w-[100%] flex items-center justify-start border border-slate-800'>
                  <div className='w-[30%] border-r border-slate-800 p-2 flex items-center justify-start gap-2'>
                    <div className='w-[1.5rem] h-[1.5rem] rounded-xl bg-[#ffa500] drop-shadow-md'></div>
                    Orange
                  </div>
                  <div className='w-[70%] p-2'>
                    Active engagement ongoing or highly potential for investments 
                  </div>
                </div>
                <div className='w-[100%] flex items-center justify-start border border-slate-800'>
                  <div className='w-[30%] border-r border-slate-800 p-2 flex items-center justify-start gap-2'>
                    <div className='w-[1.5rem] h-[1.5rem] rounded-xl bg-[#3f724a]'></div>
                    Green
                  </div>
                  <div className='w-[70%] p-2'>
                    Information related to investment projects has already been secured.
                  </div>
                </div>
              </section>
            </div>
          <div className="W-[60%] lg:scale-125 scale-90 object-contain pulse" dangerouslySetInnerHTML={{ __html: MapData }} />
        </div>
      </section>
    </>
  )
}
