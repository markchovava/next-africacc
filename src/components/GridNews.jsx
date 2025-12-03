"use client";
import { baseURL } from '@/api/baseURL';
import { formatDate } from '@/libs/formatDate';
import { trimString } from '@/libs/trimString';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'




export default function GridNews({ dbData }) {
    const [data, setData] = useState(dbData?.data);


  return (
    <>
        
    {/* EVENTS */}
    <section className="w-[100%] pt-[2rem] pb-[6rem]">
      <div className="mx-auto md:mb-0 mb-4 w-[90%] md:flex md:flex-row flex-col justify-between gap-5 items-center">
        <h3 className="lg:text-[2.5rem] text-[1.8rem] leading-tight mb-3">
          The latest events, meetings and updates
        </h3>
        <Link href='/news' className='leading-tight transition-all ease-in-out underline hover:no-underline hover:text-green-600'>
        View More</Link>
      </div>
      <div className="mx-auto w-[90%] grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-8">
        {/*  */}
        {data.map((i, key) => (
            <div key={key} className="group w-[100%] p-4 bg-white drop-shadow-md">
            <div className="w-[100%] aspect-[2/1] overflow-hidden mb-4">
                <img
                src={baseURL + i.image} 
                className="w-[100%] h-[100%] object-cover group-hover:scale-105 transition-all ease-in-out"
                alt='Image' />
            </div>
            <p className="text-md leading-tight mb-3">{formatDate(i.created_at)}</p>
            <h5 className='text-2xl font-light leading-tight mb-4'>{trimString(i.title, 60)}</h5>
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
    </section>


    </>
  )
}
