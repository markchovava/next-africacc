"use client";
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CountryData from '@/data/CountryData.json';
import { FaArrowRightLong } from 'react-icons/fa6';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';



export default function InvestmentEdit({ id }) {
  const router = useRouter();
  const [data, setData] = useState();
  const { getAuthToken } = tokenAuth();
  const [errMsg, setErrMsg] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${getAuthToken()}`
  }};
  /* HANDLE INPUT */
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
  /* POST DATA */
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
    if(!data.profession){
        const message = 'Profession is required.';
        setErrMsg({profession: message});
        toast.warn(message, toastifyDarkBounce);
        setIsSubmit(false);
        return;
    }
    const formData = {
      opportunity_id: id,
      name: data?.name,
      phone: data?.phone,
      email: data?.email,
      address: data?.address,
      country: data?.country,
      company_name: data?.company_name,
      profession: data?.profession,
    };  
    try{
        const result = await axiosClientAPI.post(`investment`, formData, config)
        .then((response) => {
            if(response.data.status == 0){
              const res = response.data;
              toast.warn(res.message, toastifyDarkBounce);
              setIsSubmit(false);
              router.push(`/opportunity/investment`);
            }
            if(response.data.status == 1){
              const res = response.data;
              toast.success(res.message, toastifyDarkBounce);
              setIsSubmit(false);
              router.push(`/opportunity/investment`);
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
    getData();
  }, []);
  useEffect(() => {
    isSubmit === true && postData();
  }, [isSubmit]);

  if(!data) { return (<Loader />) }


  return (
    <>
    <section className='w-[100%] pt-[4rem] pb-[8rem]'>
      <div className='mx-auto w-[90%]'>
        <h3 className='text-[2.2rem] pb-8 text-center'>
           Investment Form
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
            <button 
                onClick={() => setIsSubmit(true)}
                className='group text-lg px-[4rem] py-5 flex items-center justify-center gap-2 rounded-xl text-white hover:drop-shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-800 '>
                {isSubmit == true
                ? <>Processing</> 
                : <> Submit
                <FaArrowRightLong className='group-hover:translate-x-1 transition-all ease-in-out' />
                </>
                }
            </button>
        </div>
      </div>
    </section>
    </>
  )
}
