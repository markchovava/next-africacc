"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import UserQrCode from './UserQrCode';



export default function ProfileView() {
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
      const result = await axiosClientAPI.get(`profile`, config)
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
            href={`/admin/profile/edit`} 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            Edit
          </Link>
        </div>

        {/* VIEW INFO */}
        <section className='w-[100%] bg-white drop-shadow-md py-[2rem] px-6 text-lg'>
          {/* IMAGE */}
          { data.image &&
            <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
                <div className='w-[20%] font-light'>Image:</div>
                <div className='w-[80%]'>
                    <div className='h-[10rem] aspect-[5/4] rounded-xl overflow-hidden bg-slate-400'>
                    <img src={baseURL + data.image} className='w-[100%] h-[100%] object-cover' />
                    </div>
                </div>
            </div>
          }
          {/* NAME */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Name:</div>
            <div className='w-[80%]'>
                {data.name}
            </div>
          </div>
          {/* GENDER */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Code:</div>
            <div className='w-[80%]'>
                {data.code}
            </div>
          </div>
          {/* GENDER */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Gender:</div>
            <div className='w-[80%]'>
                {data.gender}
            </div>
          </div>
          {/* PHONE */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Phone:</div>
            <div className='w-[80%]'>
                {data.phone}
            </div>
          </div>
          {/* PHONE */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Email:</div>
            <div className='w-[80%]'>
                {data.email}
            </div>
          </div>
          {/* PHONE */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Address:</div>
            <div className='w-[80%]'>
                {data.address}
            </div>
          </div>
          {/* COUNTRY */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Country:</div>
            <div className='w-[80%]'>
                {data.country}
            </div>
          </div>
          {/* ROLE */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>User Level:</div>
            <div className='w-[80%]'>
                {data?.role?.name ? data?.role?.name : 'Not added yet.'}
            </div>
          </div>
          {data?.qrcode?.code &&
          <>
            {/* CODE */}
            <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
              <div className='w-[20%] font-light'>Code:</div>
              <div className='w-[80%]'>
                  {data?.qrcode?.code}
              </div>
            </div>
            {/* QRCODE */}
            <div className='flex lg:flex-row flex-col lg:items-start justify-start lg:gap-4 gap-2 mb-6'>
              <div className='w-[20%] font-light lg:pt-2'>QR Code:</div>
              <div className='w-[80%]'>
                  <UserQrCode dbData={data?.qrcode?.code} />
              </div>
            </div>
          </>
          }
          {/* ROLE */}
          {data?.membership?.name &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Membership:</div>
            <div className='w-[80%]'>
                {data?.membership?.name ? 'Is Member' : 'Not added yet.'}
            </div>
          </div>
          }
        
          



        </section>

      </div>
    </section>
    </>
  )
}
