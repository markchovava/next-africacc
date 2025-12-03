"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import Loader from '@/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'



export default function InvestmentView({ id }) {
    const [data, setData] = useState();
    const [opportunity, setOpportunity] = useState();
    const { getAuthToken } = tokenAuth()
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
    }};
    /* GET DATA */
    async function getData() {
      try{
        const result = await axiosClientAPI.get(`investment/${id}`, config)
        .then((response) => {
          setData(response?.data?.data)
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
    }  
    /* GET DATA */
    async function getOpportunity() {
      try{
        const result = await axiosClientAPI.get(`investment-opportunity-view?investment_id=${id}`, config)
        .then((response) => {
          setOpportunity(response?.data?.data)
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
    }  

    useEffect(() => {
      getOpportunity();
      getData(); 
    }, []);


    if(!data){ return ( <Loader /> ) }


  return (
    <>
    <section className='w-[100%] pt-[4rem] pb-[8rem]'>
      {/* LINK */}
      <div className='w-[90%] mx-auto flex items-center justify-end mb-6'>
          <Link
            href={`/opportunity/investment`} 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            View List
          </Link>
        </div>

      <div className='mx-auto w-[90%] bg-white drop-shadow-lg px-6 py-8 text-lg'>
        <h4 className='mb-4 leading-none font-light text-3xl'>Investment Information</h4>
        {/*  */}
        <div className='w-[100%] flex lg:flex-row flex-col justify-start lg:items-center gap-3 mb-4'>
          <div className='leading-tight font-light w-[20%]'>Opportunity</div>
          <div className='leading-tight w-[80%]'>{opportunity?.name}</div>
        </div>
        {/*  */}
        {data?.status &&
        <div className='w-[100%] flex lg:flex-row flex-col justify-start lg:items-center gap-3 mb-4'>
          <div className='leading-tight font-light w-[20%]'>Investment Status</div>
          <div className='leading-tight w-[80%]'>
            <span className='px-2 py-1 text-white rounded-xl bg-cyan-600'>{data?.status}</span>
          </div>
        </div>
        }
         {/*  */}
         {opportunity?.sectors?.length > 0 &&
         <div className='w-[100%] flex lg:flex-row flex-col justify-start lg:items-center gap-3 mb-4'>
          <div className='leading-tight font-light w-[20%]'>Sectors</div>
          <div className='leading-tight w-[80%]'>
            {opportunity?.sectors?.map((i, key) => (
              opportunity?.sectors?.length < (key + 1) ? i?.name + ', ' : i?.name
            ))}
          </div>
         </div>
         }
         {/*  */}
         <div className='w-[100%] flex lg:flex-row flex-col justify-start lg:items-center gap-3 mb-4'>
          <div className='leading-tight font-light w-[20%]'>Country</div>
          <div className='leading-tight w-[80%]'>{opportunity?.country?.name}</div>
        </div>
         {/*  */}
         <div className='w-[100%] flex lg:flex-row flex-col justify-start lg:items-center gap-3 mb-4'>
          <div className='leading-tight font-light w-[20%]'>Amount</div>
          <div className='leading-tight w-[80%]'>{opportunity?.amount}</div>
        </div>
         {/*  */}
         <div className='w-[100%] flex lg:flex-row flex-col justify-start lg:items-center gap-3 mb-8'>
          <div className='leading-tight font-light w-[20%]'>Expected Return</div>
          <div className='leading-tight w-[80%]'>{opportunity?.expected_return}</div>
        </div>

        <div className='mb-2 border-t border-slate-300 pt-4 pb-2'>
            <h4 className='leading-none font-light text-3xl'>Investor Information</h4>
        </div>
        {/*  */}
        <div className='w-[100%] flex lg:flex-row flex-col justify-start lg:items-center gap-3 mb-4'>
          <div className='leading-tight font-light w-[20%]'>Name:</div>
          <div className='leading-tight w-[80%]'>{data?.name}</div>
        </div>
        {/*  */}
        <div className='w-[100%] flex lg:flex-row flex-col justify-start lg:items-center gap-3 mb-4'>
          <div className='leading-tight font-light w-[20%]'>Phone:</div>
          <div className='leading-tight w-[80%]'>{data?.phone}</div>
        </div>
        {/*  */}
        <div className='w-[100%] flex lg:flex-row flex-col justify-start lg:items-center gap-3 mb-4'>
          <div className='leading-tight font-light w-[20%]'>Email:</div>
          <div className='leading-tight w-[80%]'>{data?.email}</div>
        </div>
        {/*  */}
        <div className='w-[100%] flex lg:flex-row flex-col justify-start lg:items-center gap-3 mb-4'>
          <div className='leading-tight font-light w-[20%]'>Address:</div>
          <div className='leading-tight w-[80%]'>{data?.address}</div>
        </div>
        {/*  */}
        <div className='w-[100%] flex lg:flex-row flex-col justify-start lg:items-center gap-3 mb-4'>
          <div className='leading-tight font-light w-[20%]'>Country:</div>
          <div className='leading-tight w-[80%]'>{data?.country}</div>
        </div>
        {/*  */}
        <div className='w-[100%] flex lg:flex-row flex-col justify-start lg:items-center gap-3 mb-4'>
          <div className='leading-tight font-light w-[20%]'>Profession:</div>
          <div className='leading-tight w-[80%]'>{data?.profession}</div>
        </div>
        {/*  */}
        <div className='w-[100%] flex lg:flex-row flex-col justify-start lg:items-center gap-3 mb-4'>
          <div className='leading-tight font-light w-[20%]'>Company Name:</div>
          <div className='leading-tight w-[80%]'>{data?.company_name}</div>
        </div>




      </div>
    </section>
    </>
  )
}
