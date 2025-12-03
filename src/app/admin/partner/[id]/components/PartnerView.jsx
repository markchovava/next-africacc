"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



export default function PaetnerView({ id }) {
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
      const result = await axiosClientAPI.get(`partner/${id}`, config)
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
            href={`/admin/partner/edit/${id}`} 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            Edit
          </Link>
        </div>

        {/* VIEW INFO */}
        <section className='w-[100%] bg-white drop-shadow-md py-[2rem] px-4 text-lg'>
          {/* IMAGE */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Image:</div>
            <div className='w-[80%]'>
                <div className='h-[10rem] aspect-[5/3] rounded-xl overflow-hidden bg-slate-400'>
                  <img src={baseURL + data.image} className='w-[100%] h-[100%] object-cover' />
                </div>
            </div>
          </div>
          {/* NAME */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Name:</div>
            <div className='w-[80%]'>
                {data.name}
            </div>
          </div>
          {/* LINK */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Link:</div>
            <div className='w-[80%]'>
                {data.link}
            </div>
          </div>
          {/* PRIORITY */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Priority:</div>
            <div className='w-[80%]'>
                <span className='py-1 px-2 rounded-xl bg-cyan-700 text-white'>{data.priority}</span>
            </div>
          </div>
        


        </section>

      </div>
    </section>
    </>
  )
}
