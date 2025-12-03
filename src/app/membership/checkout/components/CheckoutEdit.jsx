"use client";
import { axiosClientAPI } from '@/api/axiosClientAPI';
import Loader from '@/components/Loader';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import { tokenMOrder } from '@/tokens/tokenMemberOrder';
import { tokenMembership } from '@/tokens/tokenMembership';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';



export default function CheckoutEdit() {
    const router = useRouter();
    const [data, setData] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const { getMOrderToken, removeMOrderToken } = tokenMOrder();
    const { setMembershipToken } = tokenMembership();
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
    }};
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    /* GET DATA */
    async function getData() {
        if(getMOrderToken()){
            try{
            const result = await axiosClientAPI.get(`member-order/${getMOrderToken()}`, config)
            .then((response) => {
                setData(response.data.data)
            })
            } catch (error) {
            console.error(`Error: ${error}`)
            }   
        }
    } 
    /* CALCULATE TOTAL */
    function orderTotal() {
        if(data.duration){
            const duration = Number(data?.duration);
            const fee = Number(data?.member_fee);
            return duration * fee;
        }
        return 0;
    }

    async function postData(){
        if(!data.duration){
            toast.warn('Duration is required.', toastifyDarkBounce);
            setIsSubmit(false);
            return;
        }
        const formData = {
            member_order_id: Number(getMOrderToken()),
            duration: Number(data?.duration),
            paid_amount: orderTotal(),
        }
        try{
            const result = await axiosClientAPI.post(`member-order-checkout`, formData, config)
            .then((response) => {
                if(response.data.status == 1){
                  toast.success(response?.data?.message, toastifyDarkBounce);
                  setMembershipToken(response?.data?.membership_id),
                  removeMOrderToken();
                  setIsSubmit(false);
                  router.push(`/membership/order`);
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
        getData()
    }, []);


    useEffect(() => { 
        isSubmit === true && postData() 
    }, [isSubmit])


    if(!data) { return (<Loader />) }


  return (
    <>
    <section className='w-[100%] mt-[4rem] mb-[4rem]'>
        <div className='mx-auto w-[90%]'>
            <section className='w-[100%] grid grid-cols-3 p-6 bg-white drop-shadow-lg'>
                <div className='w-[100%] col-span-2'>
                    <h4 className='font-light leading-none text-[2rem] border-b border-slate-300 pb-3 mb-5'>
                        Basic Information
                    </h4>
                    {/*  */}
                    <div className='mb-4'>
                        <p className='font-light'>Name</p>
                        <div className='font-light text-2xl'>
                            {data?.member_order_info?.name}
                        </div>
                    </div>
                    {/* PHONE NUMBER */}
                    <div className='mb-4'>
                        <p className='font-light'>Phone Number:</p>
                        <div className='font-light text-2xl'>
                            {data?.member_order_info?.phone}
                        </div>
                    </div>
                    {/* ADDRESS */}
                    <div className='mb-4'>
                        <p className='font-light'>Address:</p>
                        <div className='font-light text-2xl'>
                            {data?.member_order_info?.address}
                        </div>
                    </div>
                    {/* EMAIL */}
                    <div className='mb-4'>
                        <p className='font-light'>Email:</p>
                        <div className='font-light text-2xl'>
                            {data?.member_order_info?.email}
                        </div>
                    </div>
                    {/* COUNTRY */}
                    <div className='mb-4'>
                        <p className='font-light'>Country:</p>
                        <div className='font-light text-2xl'>
                            {data?.member_order_info?.country}
                        </div>
                    </div>
                    <h4 className='font-light leading-none text-[2rem] border-b border-slate-300 pt-6 pb-4 mb-4'>
                        Membership Information
                    </h4>
                    {/* MEMBERSHIP */}
                    <div className='mb-4'>
                        <p className='font-light'>Membership:</p>
                        <div className='font-light text-2xl'>
                            {data?.membership?.name}
                        </div>
                    </div>
                    {/* MEMBERSHIP FEE */}
                    <div className='mb-4'>
                        <p className='font-light'>Membership Fee:</p>
                        <div className='font-light text-2xl'>
                            { '$' + data?.membership?.fee?.toFixed(2) }
                        </div>
                    </div>

                </div>
                <div className='w-[100%] col-span-1 flex items-center justify-end px-6'>
                    <div className='w-[75%] p-5 bg-white drop-shadow-lg'>
                        <h4 className='font-light leading-none text-[2rem] border-b border-slate-300 pt-6 pb-4 mb-4'>
                            Billing
                        </h4>
                        {/*  */}
                        <div className='w-[100%] mb-4'>
                            <p className='mb-1 font-light'>Amount:</p>
                            <div className='w-[100%] text-xl'>
                                <span className='pr-1'>{ '$' + data?.membership?.fee?.toFixed(2) }</span> 
                                <span>per month.</span>
                            </div>
                        </div>
                        {/*  */}
                        <div className='w-[100%] mb-4'>
                            <p className='mb-1 font-light'>Number of Months:</p>
                            <select
                                name='duration'
                                onChange={handleInput}
                                className='w-[100%] rounded-xl border border-slate-300 outline-none py-2 px-3'>
                                <option value=''>Select an option.</option>
                                {[...Array(12)].map((i, key) => (
                                    <option key={key} value={key+1}>{key+1}</option>
                                ))}
                            </select>
                        </div>
                        {/*  */}
                        <div className='w-[100%] mb-4'>
                            <p className='mb-1'>Total:</p>
                            <div className='leading-none w-[100%] text-2xl bg-slate-200 p-3 font-medium'>
                                { '$' + (orderTotal()).toFixed(2) }
                            </div>
                        </div>

                        <div className='w-[100%]'>
                            <button
                                onClick={() => setIsSubmit(true)}
                                className='rounded-xl transition-all ease-in-out text-white py-4 w-[100%] text-center bg-gradient-to-br from-green-500 to-cyan-700 hover:bg-gradient-to-br hover:to-green-500 hover:from-cyan-700'>
                                {isSubmit === true ? 'Processing' : 'Submit' }
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </section>
    </>
  )
}
