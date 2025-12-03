import React from 'react'
import OpportunityView from './components/OpportunityView'
import Link from 'next/link'
import { MdOutlineChevronRight } from 'react-icons/md'
import { getOpportunity } from '@/api/getOpportunities';



export default async function page({ params: {id} }) {
  const opportunityData = await getOpportunity(id);
  
  return (
    <>
    {/* BREADCRUMBS */}
    <section className='w-[100%] '>
        <ul className='mx-auto py-1 w-[90%] border-y border-slate-300 flex items-center justify-start gap-1'>
            <li><Link href={`/`}>Home</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/opportunity`}>Opportunities</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/opportunity/${id}`} className='font-semibold'>
            {opportunityData?.data?.name}</Link></li>
        </ul>
    </section>

    <OpportunityView dbData={opportunityData} />
    </>
  )
}
