import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import { MdOutlineChevronRight } from "react-icons/md";
import Contact from './components/Contact';


export default function page() {
  return (
    <>
        {/* HEADER */}
        <section 
            style={{backgroundImage: `url('/assets/img/5_1/01.jpg')`}} 
            className='w-[100%] lg:aspect-[5/1] aspect-[5/2] relative bg-center bg-fixed bg-cover bg-no-repeat'>
            <div className='w-[100%] h-[100%] absolute top-0 left-0 opacity-25 bg-gradient-to-br from-slate-700 to-black'></div>
            <div className='w-[100%] h-[100%] lg:text-[4.6rem] text-[2.8rem] font-medium flex items-center justify-center text-white drop-shadow-md'>
                Contact Us
            </div>
        </section>

        {/* BREADCRUMBS */}
        <section className='w-[100%]'>
            <ul className='mx-auto py-1 border-y border-slate-300 w-[90%] flex items-center justify-start gap-1'>
                <li><Link href={`/`}>Home</Link></li>
                <li><MdOutlineChevronRight /></li>
                <li><Link href={`/contact`} className='font-semibold'>Contact Us</Link></li>
            </ul>
        </section>

        <Contact />
    </>
  )
}
