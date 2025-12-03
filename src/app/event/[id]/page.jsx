import { getEvent, getEvents } from '@/api/getEvents'
import Link from 'next/link'
import React from 'react'
import { MdOutlineChevronRight } from 'react-icons/md'
import EventView from './components/EventView'
import { trimString } from '@/libs/trimString'
import CarouselEvent from './components/CarouselEvent'





export default async function page({ params: {id} }) {
    const [eventData, eventsData] = await Promise.all([getEvent(id), getEvents()])


  return (
    <>

    {/* HEADER */}
    <section 
        style={{backgroundImage: `url('/assets/img/5_1/01.jpg')`}} 
        className='w-[100%] lg:aspect-[5/1] aspect-[5/2] relative bg-center bg-fixed bg-cover bg-no-repeat'>
        <div className='w-[100%] h-[100%] absolute top-0 left-0 opacity-25 bg-gradient-to-br from-slate-700 to-black'></div>
        <div className='w-[100%] h-[100%] lg:text-[4.6rem] text-[2.8rem] text-center leading-none font-medium flex items-center justify-center text-white drop-shadow-md'>
        {trimString(eventData?.data?.name, 30)}
        </div>
    </section>

    {/* BREADCRUMBS */}
    <section className='w-[100%] '>
        <ul className='mx-auto py-1 w-[90%] border-y border-slate-300 flex items-center justify-start gap-1'>
            <li><Link href={`/`}>Home</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/meeting-events`}>Meeting & Events</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/event`} >Events</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/event/${id}`} className='font-semibold'>
              {trimString(eventData?.data?.name, 20)}</Link>
            </li>
        </ul>
    </section>

    <EventView dbData={eventData} />

    <CarouselEvent dbData={eventsData} />



    </>
  )
}
