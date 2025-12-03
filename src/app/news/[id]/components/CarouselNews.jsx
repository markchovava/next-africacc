"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation,Scrollbar, A11y} from 'swiper/modules';
import Link from 'next/link';
import { useState } from 'react';
import { baseURL } from '@/api/baseURL';
import Image from 'next/image';
import { trimString } from '@/libs/trimString';





export default function CarouselNews({ dbData }) {
    const [data, setData] = useState(dbData?.data)

    return (
        data.length > 0 && 
        <>
        <section className='w-[100%] pt-[1rem] pb-[6rem]'>
            <div className='w-[90%] mx-auto '>
                {/*  */}
                <section className='hidden lg:block '>
                    <div className='w-[100%] flex items-center justify-between pb-4'>
                        <h6 className="text-[2.5rem] font-medium">
                            Latest News and Updates
                        </h6>
                        <Link href='/news'>
                            <span className='text-green-700 hover:underline hover:text-slate-800 transition-all ease-in-out'>
                                View More</span>
                        </Link>
                    </div>
                    <Swiper 
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        effect="fade"
                        spaceBetween={30}
                        slidesPerView={3}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}>
                        {/*  */}
                        {data.map((i, key) => (
                        <SwiperSlide key={key} className='group relative bg-slate-400 aspect-[5/3] rounded-xl overflow-hidden drop-shadow hover:drop-shadow-md'>
                        <img src={baseURL + i.image}
                            className='object-cover w-[100%] h-[100%] absolute z-10 group-hover:scale-110 transition-all ease-in-out' />
                        <div className='absolute z-20 bottom-0 left-0 w-[100%] h-[60%] bg-gradient-to-b from-transparent to-black'></div>
                        <div className='absolute z-30 bottom-0 left-0 w-[100%] h-[50%] flex items-end justify-start p-4'>
                            <Link 
                            href={`/news/${i.id}`} 
                            className='text-white text-[3rem] leading-none group-hover:underline'>
                            {trimString(i.title, 20)}
                            </Link>
                        </div>
                        </SwiperSlide> 
                        ))}
                        
                    </Swiper>
                </section>
                {/*  */}
                <section className='lg:hidden block '>
                    <div className='w-[100%] flex items-center justify-between pb-4'>
                        <h6 className="text-[2.5rem] font-medium">
                        Latest News and Updates
                        </h6>
                        <Link href='/news'>
                            <span className=''>View More</span>
                        </Link>
                    </div>
                    <Swiper 
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        effect="fade"
                        spaceBetween={30}
                        slidesPerView={1.5}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        className='card__transparent' >
                        
                        { data.map((i, key) => (
                        <SwiperSlide key={key} className='group relative bg-slate-400 aspect-[5/3] rounded-xl overflow-hidden drop-shadow hover:drop-shadow-md'>
                        <img
                            src={baseURL + i.image}
                            className='object-cover w-[100%] h-[100%] absolute z-10 group-hover:scale-110 transition-all ease-in-out' />
                        <div className='absolute z-20 bottom-0 left-0 w-[100%] h-[60%] bg-gradient-to-b from-transparent to-black'></div>
                        <div className='absolute z-30 bottom-0 left-0 w-[100%] h-[50%] flex items-end justify-start p-4'>
                            <Link 
                            href={`/news/${i.id}`} 
                            className='text-white text-[2.2rem] leading-none group-hover:underline transition-all ease-in-out'>
                            {trimString(i.title, 20)}
                            </Link>
                        </div>
                        </SwiperSlide> 
                        ))}
                       
                        
                        
                    </Swiper>
                </section>
                
            </div>
        </section>
        </>
    )
}
