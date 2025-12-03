import Link from 'next/link'
import React from 'react'
import { MdOutlineChevronRight } from 'react-icons/md'
import InvestmentView from './components/InvestmentView'

export default function page({ params: {id} }) {
  return (
    <>
    {/* BREADCRUMBS */}
    <section className='w-[100%] '>
        <ul className='mx-auto py-1 w-[90%] border-y border-slate-300 flex items-center justify-start gap-1'>
            <li><Link href={`/`}>Home</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/admin`}>Admin</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/admin/investment`}>Investments</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/admin/investment/${id}`} className='font-semibold'>
              View Investment</Link></li>
        </ul>
    </section>

    {/*  */}
    <InvestmentView id={id} />

    </>
  )
}
