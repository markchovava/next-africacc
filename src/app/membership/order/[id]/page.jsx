import Link from 'next/link'
import React from 'react'
import { MdOutlineChevronRight } from 'react-icons/md'
import MemberOrderView from './components/MemberOrderView'

export default function page({ params: {id} }) {
  return (
    <>
    {/* HEADER */}
    <section 
        style={{backgroundImage: `url('/assets/img/5_1/01.jpg')`}} 
        className='w-[100%] lg:aspect-[5/1] aspect-[5/2] relative bg-center bg-fixed bg-cover bg-no-repeat'>
        <div className='w-[100%] h-[100%] absolute top-0 left-0 opacity-25 bg-gradient-to-br from-slate-700 to-black'></div>
        <div className='w-[100%] h-[100%] lg:text-[4.6rem] text-[2.8rem] text-center leading-none font-medium flex items-center justify-center text-white drop-shadow-md'>
            Subscription Information
        </div>
    </section>

    {/* BREADCRUMBS */}
    <section className='w-[100%] bg-white drop-shadow-md py-1'>
        <ul className='mx-auto w-[90%] flex items-center justify-start gap-1'>
            <li><Link href={`/`}>Home</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/membership`}>Membership</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/membership/order`}>Membership Subscriptions</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/membership/order/${id}`} className='font-semibold'>
            Subscription Information</Link></li>
        </ul>
    </section>


    <MemberOrderView id={id} />

    </>
  )
}
