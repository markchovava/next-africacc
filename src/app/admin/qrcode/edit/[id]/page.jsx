import React from 'react'
import QrCodeEdit from './components/QrCodeEdit'
import Link from 'next/link'
import { MdOutlineChevronRight } from 'react-icons/md'
import { qrcodeViewApiAction } from '@/actions/qrcodeActions';




export default async function page({ params: {id} }) {
  const qrcodeData = await qrcodeViewApiAction(id);


  return (
    <>
    {/* BREADCRUMBS */}
    <section className='w-[100%]'>
        <ul className='mx-auto py-1 w-[90%] border-y border-slate-300 flex items-center justify-start gap-1'>
            <li><Link href={`/`}>Home</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/admin`}>Admin</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li><Link href={`/admin/qrcode`}>QR Code</Link></li>
            <li><MdOutlineChevronRight /></li>
            <li>
              <Link href={`/admin/qrcode/edit/${id}`} 
              className='font-semibold'>
                Edit Assign QR Code </Link>
            </li>
        </ul>
    </section>

    {/* PAGE TITLE */}
    <section className='w-[100%]'>
      <div className='w-[90%] mx-auto flex items-center justify-center'>
        <h6 className='text-center text-[3rem] pt-[3rem] pb-[2rem] text-transparent bg-gradient-to-br bg-clip-text from-slate-500 to-slate-700'>
            Assign QR Code</h6>
      </div>
    </section>


    <QrCodeEdit id={id} dbData={qrcodeData} />
    </>
  )
}
