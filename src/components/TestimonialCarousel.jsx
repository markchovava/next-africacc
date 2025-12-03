"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { BsArrowRight } from "react-icons/bs";
import { useState } from 'react';



export default function TestimonialCarousel({ dbData }) {
  const [data, setData] = useState(dbData?.data)
  return (
    <div className='w-[100%] relative z-0'>
        <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        navigation
        effect
        pagination={{
          clickable: true,
        }}
        speed={1500}
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: true,
        }}
        className='text-white'
        slidesPerView={1} >
        {/* CAROUSEL */}
        {data.map((i, key) => (
          <SwiperSlide key={key} className='w-[100vw] lg:aspect-[5/1] aspect-[2/1] overflow-hidden bg-gradient-to-br from-green-400 to-green-800'>
            <div 
              className='mx-auto w-[90%] h-[100%] relative flex flex-col items-center justify-center'>
                <p className='text-[1.4rem] mb-2'>
                  {i.description}
                </p>
                <p className='italic leading-none mb-1 text-yellow-200'>{i.email}</p>
                <p className='leading-none font-light mb-1 text-yellow-200'>{i.name}</p>
            </div>
          </SwiperSlide>
        ))}
        
       
        
      </Swiper>
    </div>
  )
}
