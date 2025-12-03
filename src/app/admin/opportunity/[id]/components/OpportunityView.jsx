"use client";
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



export default function OpportunityView({ id }) {
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
      const result = await axiosClientAPI.get(`opportunity/${id}`, config)
      .then((response) => {
        console.log(response.data.data)
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
            href={`/admin/opportunity/edit/${id}`} 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            Edit
          </Link>
        </div>

        {/* VIEW INFO */}
        <section className='w-[100%] bg-white drop-shadow-md py-[2rem] px-4 text-lg'>
          {/*  */}
          {data?.opportunity_images?.length > 0 &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Images:</div>
            <div className='w-[80%] grid grid-cols-2 gap-6'>
              {data.opportunity_images.map((i, key) => (
                <div key={key} className='h-[10rem] aspect-[10/7] rounded-xl overflow-hidden bg-slate-300'>
                  <img src={baseURL + i.image} className='w-[100%] h-[100%] object-cover' />
                </div>
              ))}
            </div>
          </div>
          }
  
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Name:</div>
            <div className='w-[80%]'>
                {data.name}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Slug:</div>
            <div className='w-[80%]'>
                {data.slug}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Country:</div>
            <div className='w-[80%]'>
                {data.country?.name ? data.country?.name : 'Not added.'}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Short Description:</div>
            <div className='w-[80%]'>
                {data.short_description}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Description:</div>
            <div className='w-[80%]'>
                <div className='article' dangerouslySetInnerHTML={{ __html: data.description }}></div>
            </div>
          </div>
          {/*  */}
          {data.sectors &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Sectors:</div>
            <div className='w-[80%]'>
              { data?.sectors.map((i, key) => ( 
                        key+1 < data.sectors.length ? i.name + ',' : i.name      
                    )) 
              }
            </div>
          </div>
          }
          {/*  */}
          {data.status &&
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Status:</div>
            <div className='w-[80%]'>
                <span className='rounded-xl px-2 py-2 bg-cyan-600 text-white'>
                  {data.status}
                </span>
            </div>
          </div>
          }
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Priority:</div>
            <div className='w-[80%]'>
                {data.priority}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Investment Amount:</div>
            <div className='w-[80%]'>
                {data?.amount ? data.amount : 'Not added.'}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Expected Return:</div>
            <div className='w-[80%]'>
                {data?.expected_return ? data?.expected_return : 'Not added'}
            </div>
          </div>
          {/*  */}
          <div className='flex lg:flex-row flex-col lg:items-center justify-start lg:gap-4 gap-2 mb-6'>
            <div className='w-[20%] font-light'>Author:</div>
            <div className='w-[80%]'>
                {data?.user?.name ? data?.user?.name : data?.user?.email}
            </div>
          </div>



        </section>

      </div>
    </section>
    </>
  )
}

