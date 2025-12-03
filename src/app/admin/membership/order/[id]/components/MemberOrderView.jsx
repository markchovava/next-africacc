"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import Loader from '@/components/Loader';
import { formatDate } from '@/libs/formatDate';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



export default function MemberOrderView({ id }) {
  const [data, setData] = useState();
  const { getAuthToken } = tokenAuth()
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
  }};

  /* GET DATA */
  async function getData() {
    try{
      const result = await axiosClientAPI.get(`member-order/${id}`, config)
      .then((response) => {
        setData(response.data.data)
      })
    } catch (error) {
      console.error(`Error: ${error}`)
    }   
  }  

  useEffect(() => {
    getData()
  }, []);


  if(!data){ return ( <Loader /> ) }


  return (
    <>
    <section className='w-[100%] pb-[6rem]'>
      <div className='w-[90%] mx-auto'>
        {/* LINK */}
        <div className='flex items-center justify-end mb-6'>
          <Link 
            href={`/admin/membership/order`} 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            View List
          </Link>
        </div>

        {/* VIEW INFO */}
        <section className='w-[100%] bg-white drop-shadow-md py-[2rem] px-4 text-lg'>
            {/*  */}
            <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>Name:</div>
            <div className='w-[80%]'>
                {data.membership?.name}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>Member Fee:</div>
            <div className='w-[80%]'>
                {data.membership?.fee ? '$' + data.membership?.fee.toFixed(2) : 'Not added.'}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>Status:</div>
            <div className='w-[80%]'>
                <span className='bg-green-700 text-white px-2 py-1 rounded-full'>
                    {data.status ? data.status : 'Not added.'}
                </span>
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>Amount Paid:</div>
            <div className='w-[80%]'>
                {data.paid_amount ? '$' + data.paid_amount.toFixed(2) : 'Not added.'}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>Duration:</div>
            <div className='w-[80%]'>
                {data.duration ? data.duration + ' months' : 'Not added.'}
            </div>
          </div>
          {/*  */}
          {data.start_date &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>Start Date:</div>
            <div className='w-[80%]'>
                {data.start_date ? formatDate(data.start_date) : 'Not added.'}
            </div>
          </div>
          }
          {data?.end_date &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>End Date:</div>
            <div className='w-[80%]'>
                {data?.end_date ? formatDate(data?.end_date) : 'Not added.'}
            </div>
          </div>
          }
          {/* ------------ */}
          <div className='mb-2 border-t border-slate-300 pt-4 pb-2'>
                <h4 className='leading-none font-light text-3xl'>User Information</h4>
            </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>Full Name:</div>
            <div className='w-[80%]'>
                {data.member_order_info?.name}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>Phone Number:</div>
            <div className='w-[80%]'>
                {data.member_order_info?.phone}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>Email:</div>
            <div className='w-[80%]'>
                {data.member_order_info?.email}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>Address:</div>
            <div className='w-[80%]'>
                {data.member_order_info?.address}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>Country:</div>
            <div className='w-[80%]'>
                {data.member_order_info?.country}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>Profession:</div>
            <div className='w-[80%]'>
                {data.member_order_info?.profession}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='lg:w-[20%] font-light'>Company Name:</div>
            <div className='w-[80%]'>
                {data.member_order_info?.company_name}
            </div>
          </div>



        </section>

      </div>
    </section>
    </>
  )
}
