"use client";
import { baseURL } from '@/api/baseURL';
import { formatDate } from '@/libs/formatDate';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import { tokenEventCart } from '@/tokens/tokenEventCart';
import { tokenMembership } from '@/tokens/tokenMembership';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';



export default function EventView({ dbData }) {
    const router = useRouter();
    const [data, setData] = useState({
        ...dbData?.data,
        number_of_people: 1,
        event_total: dbData?.data?.joining_fee,
    });
    const { setEventCartToken, getEventCartToken } = tokenEventCart();
    const { getAuthToken } = tokenAuth()
    const [isSubmit, setIsSubmit] = useState(false);
    const [errMsg, setErrMsg] = useState({});
    const { getMembershipToken } = tokenMembership();


    async function postData() {
        if(!data?.number_of_people){
            const message = 'The Number of people is required.';
            setErrMsg({number_of_people: message});
            toast.warn(message, toastifyDarkBounce);
            setIsSubmit(false);
            return;
        }
        const formData = {
            cart_token: getEventCartToken() ?? null,
            event_id: data.id,
            joining_fee: data?.joining_fee,
            number_of_people: data?.number_of_people,
            event_total: data?.event_total,
        }
        try{
            const result = await axios.post(`${baseURL}event-cart`, formData)
            .then((response) => {
                if(response.data.status == 1){
                  const res = response.data;
                  toast.success(res.message, toastifyDarkBounce);
                  setEventCartToken(res.cart_token);
                  setIsSubmit(false);
                  if(getAuthToken()) {
                      router.push(`/event/checkout`);
                  } else {
                    router.push(`/event/login`);
                  }
                }
            });    
            } catch (error) {
                console.error(`Error: ${error}`);
                console.error(`Error Message: ${error.message}`);
                console.error(`Error Response: ${error.response}`);
                setIsSubmit(false);
          }
    }

    useEffect(() => { 
        isSubmit === true && postData() 
    }, [isSubmit]);




  return (
    <>
    <section className='w-[100%] pt-[4rem] pb-[2rem]'>
        <div className='mx-auto w-[90%] grid md:grid-cols-5 grid-cols-1 gap-6'>
            <div className='col-span-3'>
                {/* NAME */}
                <div className='mb-[2rem]'>
                    <p className='mb-1 leading-none'>Name:</p>
                    <p className='leading-none text-[2.6rem] font-light'>{data?.name}</p>
                </div>
                {/* STATUS */}
                <div className='mb-[2rem]'>
                    <p className='mb-3 leading-none'>Status:</p>
                    <p className='leading-none text-lg'>
                        <span className='rounded-xl px-2 py-1 bg-gradient-to-br from-green-600 to-cyan-700 text-white'>
                            {data?.status}</span>
                    </p>
                </div>
                {/* LOCATION */}
                <div className='mb-[2rem]'>
                    <p className='mb-1 leading-none'>Date:</p>
                    <p className='leading-none text-2xl font-light'>{formatDate(data?.date)}</p>
                </div>
                 {/* LOCATION */}
                 {getMembershipToken() &&
                 <div className='mb-[2rem]'>
                    <p className='mb-1 leading-none'>Location:</p>
                    <p className='leading-none text-2xl font-light'>{data?.location}</p>
                </div>
                 }
                 {/* DURATION */}
                 <div className='mb-[2rem]'>
                    <p className='mb-1 leading-none'>Duration:</p>
                    <p className='leading-none text-2xl font-light'>{data?.duration}</p>
                </div>

                 {/* DESCRIPTION */}
                 {getMembershipToken() &&
                 <div className='mb-[2rem]'>
                    <p className='mb-1 leading-none'>Description:</p>
                    <div className='article text-lg font-light' 
                        dangerouslySetInnerHTML={{ __html: data.description }}></div>
                </div>
                 }



            </div>

            <div className='col-span-2 bg-white drop-shadow-lg border flex items-center justify-end p-6'>
                <div className='w-[60%] bg-white drop-shadow-lg p-3 rounded-xl'>
                    {/*  */}
                    <div className='w-[100%] flex items-center justify-between gap-2 mb-3'>
                        <div className='font-light'>Joining Fee:</div>
                        <div className=''>
                            {data?.joining_fee ? '$' + data?.joining_fee.toFixed(2) : 'Not Added.'}
                        </div>
                    </div>
                    <div className='w-[100%] flex items-center justify-between gap-2 mb-3'>
                        <div className='font-light leading-none'>Number of people:</div>
                        <div className='w-[50%]'>
                            <input 
                            type='number'
                            name='number_of_people'
                            value={data?.number_of_people}
                            min={1} 
                            onChange={(e) => {
                                setData({...data, 
                                    number_of_people: Number(e.target.value), 
                                    event_total: data.joining_fee * Number(e.target.value) })
                            }}
                            className='rounded-lg w-[100%] outline-none p-2 border border-slate-300' />
                        {errMsg?.number_of_people &&
                        <div className='text-red-700'>{errMsg?.number_of_people}</div>
                        }
                        </div>
                    </div>
                    <div className='w-[100%] mb-2'>
                        {}
                        <button 
                            onClick={ () => setIsSubmit(true) } 
                            className='w-[100%] rounded-xl text-center p-2 text-white transition-all ease-in-out bg-gradient-to-br from-green-600 to-cyan-700 hover:bg-gradient-to-br hover:to-green-700 hover:from-cyan-700'>
                            {getAuthToken() ?
                            <>
                            <span className='mr-1'>
                                {data?.event_total ? '$' + data?.event_total.toFixed(2) : '$' + (0).toFixed(2)}
                            </span>
                            Checkout 
                            </>
                            :
                            <>
                            <span className='mr-1'>
                                {data?.event_total ? '$' + data?.event_total.toFixed(2) : '$' + (0).toFixed(2)}
                            </span>
                            Login to Proceed 
                            </>
                            }

                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
    </>
  )
}
