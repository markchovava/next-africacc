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





export default function Carousel({ dbData }) {
    const [data, setData] = useState(dbData?.data);

    return (
        <section className='w-[100%] pt-[4rem] pb-[5rem]'>
            <div className='w-[90%] mx-auto '>
                {/*  */}
                <section className='hidden lg:block '>
                    <div className='w-[100%] flex items-center justify-between pb-4'>
                        <h6 className="text-[2.5rem] font-medium">
                            Countries
                        </h6>
                        <Link href='/country' className='leading-tight transition-all ease-in-out underline hover:no-underline hover:text-green-600'>
                            View More
                        </Link>
                    </div>
                    <Swiper 
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        effect="fade"
                        spaceBetween={30}
                        slidesPerView={4}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        className='card__transparent' >
                        {data.map((i, key) => (
                            <SwiperSlide key={key} className=' bg-white overflow-hidden hover:drop-shadow-md'>
                                <div className='relative group w-[100%] rounded-lg overflow-hidden aspect-[10/7] bg-slate-400 mb-3'>
                                    <img
                                        src={baseURL + i.portrait} 
                                        className="absolute w-[100%] h-[100%] object-cover group-hover:scale-105 transition-all ease-in-out"
                                        alt='Image' />
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[60%] bg-gradient-to-b from-transparent to-black opacity-75 text-white'>
                                    </div>
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] text-white text-[1.4rem] font-medium flex items-end px-3 pb-4'>
                                        <Link href={`/country/${i.slug}`} className='transition-all ease-in-out leading-tight hover:text-green-400'>
                                            {i.name}
                                        </Link>
                                        
                                    </div>
                                </div>
                            </SwiperSlide>      

                        ))}    
                        
                    </Swiper>
                </section>
                {/*  */}
                <section className='lg:hidden block '>
                    <div className='w-[100%] flex items-center justify-between pb-4'>
                        <h6 className="text-[2.5rem] font-medium">
                            Title
                        </h6>
                        <Link href='#'>
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
                       
                            <SwiperSlide className=' bg-white overflow-hidden hover:drop-shadow-md'>
                                <div className='relative group w-[100%] rounded-lg overflow-hidden aspect-[10/7] bg-slate-400 mb-3'>
                                    <img src='/assets/img/10_7/01.jpg' 
                                        className='absolute w-[100%] h-[100%] object-cover group-hover:scale-105 transition-all ease-in-out' />
                
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] bg-gradient-to-b from-transparent to-black opacity-75 text-white'>
                                    </div>
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] text-white text-[1.7rem] font-medium flex items-end px-3 pb-4'>
                                        <Link href={`#`} >
                                            Name
                                        </Link>
                                        
                                    </div>
                                </div>
                            </SwiperSlide>      
                            <SwiperSlide className=' bg-white overflow-hidden hover:drop-shadow-md'>
                                <div className='relative group w-[100%] rounded-lg overflow-hidden aspect-[10/7] bg-slate-400 mb-3'>
                                    <img src='/assets/img/10_7/02.jpg' 
                                        className='absolute w-[100%] h-[100%] object-cover group-hover:scale-105 transition-all ease-in-out' />
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] bg-gradient-to-b from-transparent to-black opacity-75 text-white'>
                                    </div>
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] text-white text-[1.7rem] font-medium flex items-end px-3 pb-4'>
                                        <Link href={`#`}>
                                            Name
                                        </Link>
                                        
                                    </div>
                                </div>
                            </SwiperSlide>      
                            <SwiperSlide className=' bg-white overflow-hidden hover:drop-shadow-md'>
                                <div className='relative group w-[100%] rounded-lg overflow-hidden aspect-[10/7] bg-slate-400 mb-3'>
                                    <img src='/assets/img/10_7/03.jpg' 
                                        className='absolute w-[100%] h-[100%] object-cover group-hover:scale-105 transition-all ease-in-out' />
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] bg-gradient-to-b from-transparent to-black opacity-75 text-white'>
                                    </div>
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] text-white text-[1.7rem] font-medium flex items-end px-3 pb-4'>
                                        <Link href={`#`} className='link__two'>
                                            Name
                                        </Link>
                                        
                                    </div>
                                </div>
                            </SwiperSlide>      
                            <SwiperSlide className=' bg-white overflow-hidden hover:drop-shadow-md'>
                                <div className='relative group w-[100%] rounded-lg overflow-hidden aspect-[10/7] bg-slate-400 mb-3'>
                                    <img src='/assets/img/10_7/04.jpg' 
                                        className='absolute w-[100%] h-[100%] object-cover group-hover:scale-105 transition-all ease-in-out' />
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] bg-gradient-to-b from-transparent to-black opacity-75 text-white'>
                                    </div>
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] text-white text-[1.7rem] font-medium flex items-end px-3 pb-4'>
                                        <Link href={`#`} className='link__two'>
                                            Name
                                        </Link>
                                        
                                    </div>
                                </div>
                            </SwiperSlide>      
                            <SwiperSlide className=' bg-white overflow-hidden hover:drop-shadow-md'>
                                <div className='relative group w-[100%] rounded-lg overflow-hidden aspect-[10/7] bg-slate-400 mb-3'>
                                    <img src='/assets/img/10_7/02.jpg' className='absolute w-[100%] h-[100%] object-cover group-hover:scale-105 transition-all ease-in-out' />
                
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] bg-gradient-to-b from-transparent to-black opacity-75 text-white'>
                                    </div>
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] text-white text-[1.7rem] font-medium flex items-end px-3 pb-4'>
                                        <Link href={`#`} className='link__two'>
                                            Name
                                        </Link>
                                        
                                    </div>
                                </div>
                            </SwiperSlide>      
                            <SwiperSlide className=' bg-white overflow-hidden hover:drop-shadow-md'>
                                <div className='relative group w-[100%] rounded-lg overflow-hidden aspect-[10/7] bg-slate-400 mb-3'>
                                    <img 
                                        src='/assets/img/10_7/01.jpg' 
                                        className='absolute w-[100%] h-[100%] object-cover group-hover:scale-105 transition-all ease-in-out' />
                
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] bg-gradient-to-b from-transparent to-black opacity-75 text-white'>
                                    </div>
                                    <div className='absolute bottom-0 left-0 w-[100%] h-[50%] text-white text-[1.7rem] font-medium flex items-end px-3 pb-4'>
                                        <Link href={`#`} className='link__two'>
                                            Name
                                        </Link>
                                        
                                    </div>
                                </div>
                            </SwiperSlide>      
                        
                    </Swiper>
                </section>
                
            </div>
        </section>
    )
}
