import Link from 'next/link';
import React from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import MemberOption from './components/MemberOption';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Carousel from '@/components/Carousel';
import { getMembershipByNum } from '@/api/getMemberships';
import { getCountries } from '@/api/getCountries';
import { getTestimonialsByNum } from '@/api/getTestimonials';



export default async function page() {
    const [memberData, countriesData, testimonialsData ] = await Promise.all([getMembershipByNum(3), getCountries(), getTestimonialsByNum(4)]);

  return (
    <>
        {/* HEADER */}
        <section 
            style={{backgroundImage: `url('/assets/img/5_1/05.jpg')`}} 
            className='w-[100%] relative lg:aspect-[5/1] aspect-[5/2] bg-center bg-fixed bg-cover bg-no-repeat'>
            <div className='w-[100%] h-[100%] absolute top-0 left-0 opacity-25 bg-gradient-to-br from-slate-700 to-black'></div>
            <div className='w-[100%] h-[100%] lg:text-[4.6rem] text-[2.8rem] font-medium flex items-center justify-center text-white drop-shadow-md'>
                Membership
            </div>
        </section>

        {/* BREADCRUMBS */}
        <section className='w-[100%] bg-white drop-shadow-md py-1'>
            <ul className='mx-auto w-[90%] flex items-center justify-start gap-1'>
                <li><Link href={`/`}>Home</Link></li>
                <li><FaAngleRight /></li>
                <li><Link href={`/`} className='font-semibold'>Membership</Link></li>
            </ul>
        </section>

        {/* <MembershipInfo /> */}

        <MemberOption dbData={memberData} />

        <TestimonialCarousel dbData={testimonialsData} />

        <Carousel dbData={countriesData} />
    </>
  )
}
