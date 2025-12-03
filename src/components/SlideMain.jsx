"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { baseURL } from '@/api/baseURL';
import { useState } from 'react';
import { trimString } from '@/libs/trimString';



export default function SlideMain({ dbData }) {
    const [data, setData] = useState(dbData?.data);


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
        
        { data?.map((i, key) => (
        <SwiperSlide key={key} className='w-[100vw] lg:aspect-[5/2] aspect-[5/4] overflow-hidden'>
          <div 
            style={{ backgroundImage: `url(${baseURL + i.opportunity_images[0].image})`}}
            className='w-[100%] h-[100%] relative bg-center bg-no-repeat bg-cover'>
              {/* BACKGROUND OVERLAY */}
              <div className='absolute z-10 bottom-0 left-0 w-[100%] h-[65%] opacity-85 bg-gradient-to-b from-transparent to-black'></div>
              <div className='w-[100%] h-[100%] absolute z-20'>
                <section className='mx-auto w-[90%] h-[100%] flex items-end justify-start'>
                  <div className='pb-[4rem]'>
                    <h4 className='lg:text-[3rem] text-[2rem] lg:w-[50%] leading-tight mb-2'>
                      {i.name}</h4>
                    <p className='lg:w-[50%] text-lg mb-4'>
                      {trimString(i.short_description, 100)}
                    </p>
                    <div className='flex'>
                        <Link 
                          href={`/opportunity/${i.id}`} 
                          className=' px-7 py-4 rounded-lg  bg-gradient-to-br from-yellow-300 to-yellow-800 hover:bg-gradient-to-br hover:to-yellow-500 hover:from-yellow-800 transition-all ease-in-out'>
                          View more
                        </Link>
                    </div>
                  </div>
                </section>
              </div>
          </div>
        </SwiperSlide>
        ))}
        
       
      </Swiper>
    </div>
  )
}
