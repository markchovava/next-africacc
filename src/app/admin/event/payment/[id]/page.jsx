import { checkAuthCookie } from "@/cookie/authCookie";
import Link from "next/link";
import React from 'react'
import { MdOutlineChevronRight } from "react-icons/md";
import EventPaymentView from "./components/EventPaymentView";



export default async function page({ params: {id} }) {
  checkAuthCookie();
 
  return (
    <>
    {/* BREADCRUMBS */}
    <section className='w-[100%]'>
        <ul className='mx-auto py-1 w-[90%] border-y border-slate-300 flex items-center justify-start gap-1'>
            <li><Link href={`/`}>Home</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/admin`}>Admin</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/admin/event/payment`}>Event Payments</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/admin/event/payment/${id}`} className='font-semibold'>
              View Event Payment</Link></li>
        </ul>
    </section>

    {/* PAGE TITLE */}
    <section className='w-[100%]'>
      <div className='w-[90%] mx-auto flex items-center justify-center'>
        <h6 className='text-center text-[3rem] pt-[3rem] pb-[2rem] text-transparent bg-gradient-to-br bg-clip-text from-slate-500 to-slate-700'>
        View Event Payment</h6>
      </div>
    </section>

    {/*  */}
    <EventPaymentView id={id} />

    </>
  )

}
