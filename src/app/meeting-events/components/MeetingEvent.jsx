"use client";
import { baseURL } from '@/api/baseURL';
import { formatDate } from '@/libs/formatDate';
import { trimString } from '@/libs/trimString';
import Link from 'next/link'
import React, { useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'



export default function MeetingEvent({ dbData }) {
  const [data, setData] = useState(dbData?.data);
  

  return (
    <>
    {/* EVENTS */}
    <section className="w-[100%] pt-[6rem] pb-[2rem]">
        <div className='w-[90%] mx-auto'>
          <div className='w-[100%] flex items-center justify-between gap-4'>
            <h3 className="lg:text-[2.5rem] text-[1.8rem] leading-tight mb-3">
              The latest news and updates
            </h3>
            <Link href='/news' className='transition-all ease-in-out hover:underline text-green-700 hover:text-slate-800'>
              View More</Link>
          </div>
          <div className="w-[100%] grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-8">
            {/*  */}
            {data.map((i, key) => (
              <div key={key} className="group w-[100%] p-4 bg-white drop-shadow-md">
                <div className="w-[100%] aspect-[2/1] overflow-hidden mb-4">
                  <img
                    src={baseURL + i.image} 
                    className="w-[100%] h-[100%] object-cover group-hover:scale-105 transition-all ease-in-out"
                    alt='Image' />
                </div>
                <p className="text-md mb-3">
                  {formatDate(i.created_at)}
                </p>
                <h5 className='text-2xl font-light mb-4'>
                  {i.title}
                </h5>
                <div className="flex mb-4">
                  <Link 
                    href={`/news/${i.id}`} 
                    className="group text-green-800 px-6 py-4 border border-green-800 flex items-center justify-center gap-2 transition-all ease-in-out ">
                    Click More. 
                    <FaArrowRightLong 
                    className="group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
                  </Link>
                </div>
              </div>
            ))}
            
          </div>
        </div>

        
    </section>
    </>
  )
}
