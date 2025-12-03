"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/components/Loader';
import { formatDate } from '@/libs/formatDate';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



export default function EventPaymentView({ id }) {
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
        const result = await axiosClientAPI.get(`event-order/${id}`, config)
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

    if(!data) { return (<Loader />) }


  return (
    <>
    <section className='w-[100%] pt-[4rem] pb-[6rem]'>
      <div className='w-[90%] mx-auto'>
        {/* LINK */}
        <div className='flex items-center justify-end mb-6'>
          <Link 
            href={`/event/event-order`} 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            View List
          </Link>
        </div>

        {/* VIEW INFO */}
        <section className='w-[100%] bg-white drop-shadow-md py-[2rem] px-6 text-lg'>

            <h4 className='font-light text-[2.2rem] mb-6'>Event Info</h4>
         
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Event Name:</div>
            <div className='w-[80%]'>
                {data?.event?.name}
            </div>
          </div>
          {/*  */}
          {data?.event?.date &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Event Date:</div>
            <div className='w-[80%]'>
                {data?.event?.date ? formatDate(data?.event?.date) : 'Not added yet.'}
            </div>
          </div>
          }
          {data?.event?.duration &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Duration:</div>
            <div className='w-[80%]'>
                {data?.event?.duration}
            </div>
          </div>
          }
          {/*  */}
          {data?.event?.location &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Location:</div>
            <div className='w-[80%]'>
                {data?.event?.location}
            </div>
          </div>
          }
          {/*  */}
          {data?.number_of_people &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Number of People:</div>
            <div className='w-[80%]'>
                {data?.number_of_people > 1 ? data?.number_of_people + ' people' : data?.number_of_people + ' person' }
            </div>
          </div>
          }
          {/*  */}
          {data?.event_total &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Paid Total:</div>
            <div className='w-[80%]'>
                {data?.event_total ? '$' + data?.event_total?.toFixed(2) : 'Not added yet.'}
            </div>
          </div>
          }

          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Status:</div>
            <div className='w-[80%]'>
                <span className='px-2 py-1 rounded-xl bg-cyan-700 text-white'>{data?.status}</span>
            </div>
          </div>
          {/*  */}
          {data?.joining_fee &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Joining Fee:</div>
            <div className='w-[80%]'>
                {data?.joining_fee ? '$' + data?.joining_fee?.toFixed(2) : 'Not added yet.'}
            </div>
          </div>
          }
           {/*  */}
           <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Payment Method:</div>
            <div className='w-[80%]'>
                {data?.payment_method}
            </div>
          </div>
          

        <h4 className='font-light text-[2.2rem] pt-4 mb-6'>Basic Info</h4>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Name:</div>
            <div className='w-[80%]'>
                {data?.name}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Phone:</div>
            <div className='w-[80%]'>
                {data?.phone}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Email:</div>
            <div className='w-[80%]'>
                {data?.email}
            </div>
          </div>
          {/*  */}
          { data?.address &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Address:</div>
            <div className='w-[80%]'>
                {data?.address}
            </div>
          </div> }
          
          {/*  */}
          {data?.company_name &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Company Name:</div>
            <div className='w-[80%]'>
                {data?.company_name}
            </div>
          </div>
          }
          {/*  */}
          {data?.country &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Country:</div>
            <div className='w-[80%]'>
                {data?.country}
            </div>
          </div>
          }
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Phone:</div>
            <div className='w-[80%]'>
                {data?.phone}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Email:</div>
            <div className='w-[80%]'>
                {data?.email}
            </div>
          </div>
        
        </section>

      </div>
    </section>
    </>
  )
}
