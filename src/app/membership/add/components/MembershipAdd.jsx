"use client";
import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import CountryData from '@/data/CountryData.json';
import { toastifyDarkBounce } from '@/libs/toastify';
import { toast } from 'react-toastify';
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { tokenAuth } from '@/tokens/tokenAuth';
import { useRouter } from 'next/navigation';
import { tokenMOrder } from '@/tokens/tokenMemberOrder';
import Loader from '@/components/Loader';
import { tokenMembership } from '@/tokens/tokenMembership';
import Link from 'next/link';




export default function MembershipAdd({ dbData }) {
    const router = useRouter();
    const { getMembershipToken } = tokenMembership()
    const [data, setData] = useState();
    const [errMsg, setErrMsg] = useState({});
    const [dbMembership, setDbMembership] = useState(dbData?.data);
    const [membership, setMembership] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const { setMOrderToken } = tokenMOrder();
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getAuthToken()}`
    }};
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value });
    }
    /* GET DATA */
    async function getData() {
        try{
        const result = await axiosClientAPI.get(`profile`, config)
        .then((response) => {
            const res = response.data.data;
            setData({...data, 
                name: res?.name,
                email: res?.email,
                phone: res?.phone,
                address: res?.address,
                country: res?.country,
                company_name: res?.company_name,
                profession: res?.profession,
            })
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }  

    const postData = async () => {
        if(!data.name){
            const message = 'Name is required.';
            setErrMsg({name: message});
            toast.warn(message, toastifyDarkBounce);
            setIsSubmit(false);
            return;
        }
        if(!data.email){
            const message = 'Email is required.';
            setErrMsg({email: message});
            toast.warn(message, toastifyDarkBounce);
            setIsSubmit(false);
            return;
        }
        if(!data.phone){
            const message = 'Phone Number is required.';
            setErrMsg({phone: message});
            toast.warn(message, toastifyDarkBounce);
            setIsSubmit(false);
            return;
        }
        if(!data.address){
            const message = 'Address is required.';
            setErrMsg({address: message});
            toast.warn(message, toastifyDarkBounce);
            setIsSubmit(false);
            return;
        }
        if(!data.country){
            const message = 'Country is required.';
            setErrMsg({country: message});
            toast.warn(message, toastifyDarkBounce);
            setIsSubmit(false);
            return;
        }
        if(!data.who_join){
            const message = 'Who wants to join is required.';
            setErrMsg({who_join: message});
            toast.warn(message, toastifyDarkBounce);
            setIsSubmit(false);
            return;
        }
        if(!data.profession){
            const message = 'Profession is required.';
            setErrMsg({profession: message});
            toast.warn(message, toastifyDarkBounce);
            setIsSubmit(false);
            return;
        }
        const formData = {
          name: data?.name,
          phone: data?.phone,
          email: data?.email,
          address: data?.address,
          country: data?.country,
          who_join: data?.who_join,
          company_name: data?.company_name,
          membership_id: dbMembership[0]?.id,
          profession: data?.profession,
          member_fee: dbMembership[0]?.fee
        };  
        try{
            const result = await axiosClientAPI.post(`member-order`, formData, config)
            .then((response) => {
                if(response.data.status == 1){
                  const res = response.data;
                  setMOrderToken(response?.data?.member_order);
                  toast.success(res.message, toastifyDarkBounce);
                  setIsSubmit(false);
                  router.push(`/membership/checkout`);
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
    }, [])


    useEffect(() => {
        isSubmit === true && postData();
    }, [isSubmit]);


    if(!data) {
        return (<Loader />)
    }



  return (
    <>
        <section className='py-[4rem]'>
            <div className='w-[90%] mx-auto bg-white drop-shadow-md p-[1.6rem]'>
                <h3 className='text-[2.2rem] pb-8 text-center'>
                    Membership Registration Form
                </h3>
               
                {/* NAME & EMAIL */}
                <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-4 mb-4'>
                    {/* NAME */}
                    <div className='w-[100%]'>
                        <p className='font-light mb-1'>Full Name:<span className='text-red-600'>*</span></p>
                        <input type='text'
                            name='name'
                            onChange={handleInput}
                            value={data?.name}
                            placeholder='Enter your First Name...' 
                            className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300' />
                        { errMsg.name &&
                            <div className='text-red-600'>{errMsg.name}</div>
                        }
                    </div>
                    {/* EMAIL */}
                    <div className='w-[100%]'>
                        <p className='font-light mb-1'>Email:<span className='text-red-600'>*</span></p>
                        <input 
                            type='email'
                            name='email' 
                            onChange={handleInput}
                            value={data?.email}
                            placeholder='Enter your Last Name...' 
                            className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300' />
                        { errMsg.email &&
                            <div className='text-red-600'>{errMsg.email}</div>
                        }
                    </div>
                </div>
                {/* PHONE & COUNTRY */}
                <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-4 mb-4'>
                    {/* PHONE */}
                    <div className='w-[100%]'>
                        <p className='font-light mb-1'>Phone:<span className='text-red-600'>*</span></p>
                        <input type='text'
                            name='phone'
                            onChange={handleInput}
                            value={data?.phone}
                            placeholder='Enter your Phone...' 
                            className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300' />
                        { errMsg.phone &&
                            <div className='text-red-600'>{errMsg.phone}</div>
                        }
                    </div>
                    {/* COUNTRY */}
                    <div className='w-[100%]'>
                        <p className='mb-1 font-light'>Country:<span className='text-red-600'>*</span></p>
                        <select 
                            name='country'
                            onChange={handleInput}
                            className='w-[100%] font-light py-3 px-4 rounded-lg outline-none border border-slate-300'>
                            <option value=''>Select an option.</option>
                            {CountryData.map((i, key) => (
                                <option 
                                    key={key} 
                                    value={i.name} 
                                    selected={data?.country === i.name && 'selected'}>
                                    {i.name}
                                </option>
                            ))}
                        </select>
                        { errMsg.country &&
                            <div className='text-red-600'>{errMsg.country}</div>
                        }
                    </div>
                </div>
                {/* ADDRESS */}
                <div className='mb-4'>
                    <p className='mb-1 font-light'>Address:*</p>
                    <input type='text'
                        name='address'
                        onChange={handleInput}
                        value={data?.address}
                        placeholder='Enter your Address here...' 
                        className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300' />
                    { errMsg.address &&
                        <div className='text-red-600'>{errMsg.address}</div>
                    }
                </div>
                {/* WHO WANTS TO JOIN & COUNTRY */}
                <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-4 mb-4'>
                    {/* WHO WANTS TO JOIN */}
                    <div className='w-[100%]'>
                        <p className='font-light mb-1'>Who wants to join:<span className='text-red-600'>*</span></p>
                        <select type='text'
                            name='who_join'
                            onChange={handleInput}
                            value={data?.who_join}
                            placeholder='Enter your Phone...' 
                            className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300'>
                            <option value=''>Select an option.</option>
                            <option value='Corporate'>Corporate</option>
                            <option value='Individual'>Individual</option>
                        </select>
                        { errMsg.who_join &&
                            <div className='text-red-600'>{errMsg.who_join}</div>
                        }
                    </div>
                    {/* WEBSITE */}
                    <div className='w-[100%]'>
                        <p className='mb-1 font-light'>Website:<span className='text-red-600'>*</span></p>
                        <input type='text'
                            name='website'
                            onChange={handleInput}
                            value={data?.website}
                            placeholder='Enter your Website...' 
                            className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300' />
                    </div>
                </div>
                {/* PROFESSION & COMPANY NAME */}
                <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-4 mb-4'>
                    {/* PROFESSION */}
                    <div className=' w-[100%]'>
                        <p className='font-light mb-1'>Job Title (Profession):</p>
                        <input 
                            type='text'
                            name='profession'
                            onChange={handleInput}
                            value={data?.profession}
                            placeholder='Enter your Profession here...' 
                            className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300' />
                        {errMsg.profession &&
                            <div className='text-red-600'>{errMsg.profession}</div>}
                    </div>
                    {/* COMPANY NAME */}
                    <div className='w-[100%]'>
                        <p className='font-light mb-1'>Company Name:</p>
                        <input 
                            type='text' 
                            name='company_name'
                            onChange={handleInput}
                            value={data?.company_name}
                            placeholder='Enter your Company Name here...' 
                            className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300' />
                    </div>
                </div>
                
                {/* BUTTON */}
                <div className='flex items-center justify-center pt-4 pb-6'>
                    {getMembershipToken() ? 
                    <>
                    <Link href='/membership/order' 
                        className='group text-lg px-12 py-4 flex items-center justify-center gap-2 rounded-xl text-white hover:drop-shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-800 '>
                        My Subscriptions
                        <FaArrowRightLong className='group-hover:translate-x-1 transition-all ease-in-out' />
                    </Link>
                    </>
                    : 
                    <button 
                        onClick={() => setIsSubmit(true)}
                        className='group text-lg px-12 py-4 flex items-center justify-center gap-2 rounded-xl text-white hover:drop-shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-800 '>
                        {dbMembership[0]?.fee && <>
                        <span className='mr-1'>
                            {'$' + dbMembership[0]?.fee.toFixed(2)}
                        </span>
                        </>}
                        {isSubmit 
                        ? <>Processing</> 
                        : <> Proceed to Checkout
                        <FaArrowRightLong className='group-hover:translate-x-1 transition-all ease-in-out' />
                        </>
                        }
                    </button>
                    }
                </div>
                
            </div>
        </section>
    </>
  )
}
