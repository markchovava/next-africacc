"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import { toastifyDarkBounce } from '@/libs/toastify';
import Loader from '@/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CountryData from '@/data/CountryData.json';



export default function UserEdit() {
  const router = useRouter();
  const [data, setData] = useState();
  const [errMsg, setErrMsg] = useState({});
  const [image, setImage] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const { getAuthToken } = tokenAuth();
  const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${getAuthToken()}`
  }};

  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value })
  }

  /* GET DATA */
  async function getData() {
    try{
      const result = await axiosClientAPI.get(`profile`, config)
      .then((response) => {
        const res = response.data.data
        setData(res);
        setImage(baseURL + res.image);
      
      })
    } catch (error) {
      console.error(`Error: ${error}`)
    }   
  }  
  
  const postData = async () => {
    if(!data.name) {
        const message = 'Name is required.';
        toast.warn(message, toastifyDarkBounce);
        setErrMsg({name: message});
        return;
    }
    if(!data.email) {
        const message = 'Email is required.';
        toast.warn(message, toastifyDarkBounce);
        setErrMsg({email: message});
        return;
    }
    const formData = {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      gender: data?.gender,
      country: data?.country,
      address: data?.address,
      image: data?.image,
    }

    try{
        const result = await axiosClientAPI.post(`profile`, formData, config)
        .then((response) => {
            if(response.data.status == 0) {
                const message = response.data.message;
                toast.warn(message, toastifyDarkBounce);
                setErrMsg({email: message});
                return;
            }
            if(response.data.status == 1){
              toast.success(response.data.message, toastifyDarkBounce);
              setIsSubmit(false);
              router.push(`/admin/profile`);
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


  if(!data) { return ( <Loader />) }




  return (
    <>
    <section className='w-[100%] pb-[6rem]'>
      <div className='w-[90%] mx-auto'>
        {/* LINK */}
        <div className='flex items-center justify-end mb-6'>
          <Link 
            href={`/admin/user`} 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            View List
          </Link>
        </div>
        {/* IMAGE */}
        <div className='w-[100%] mb-4'>
          <p className='mb-1'>Image:</p>
          <input 
            type='file' 
            name='image'
            onChange={(e) => {
              setData({...data, image: e.target.files[0] })
              setImage(URL.createObjectURL(e.target.files[0]))
            }}
            className='w-[50%] py-3 px-4 mb-4 rounded-lg outline-none border border-slate-300' />
          <div className='w-[20%] overflow-hidden aspect-[5/4] border border-slate-300 rounded-xl'>
            <img src={image} className='w-[100%] h-[100%] object-cover' alt='Image' />
          </div>
        </div>
        {/* NAME */}
        <div className='w-[100%] mb-4'>
          <p className='mb-1'>Name:</p>
          <input 
            type='text' 
            name='name'
            value={data?.name}
            onChange={handleInput}
            placeholder='Enter Name here...' 
            className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
          {errMsg.name &&
            <div className='text-red-600'>{errMsg.name}</div>
          }
        </div>
        {/* GENDER */}
        <div className='w-[100%] mb-4'>
          <p className='mb-1'>Gender:</p>
          <select
            name='gender'
            onChange={handleInput}
            placeholder='Enter Name here...' 
            className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300'>
            <option value=''>Select an option.</option>
            <option value='Male' selected={data?.gender == 'Male' && 'selected'}>Male</option>
            <option value='Female' selected={data?.gender == 'Female' && 'selected'}>Female</option>
          </select>
        </div>
        {/*  */}
        <div className='w-[100%] grid grid-cols-2 gap-6 mb-4'>
          <div className='w-[100%]'>
            <p className='mb-1'>Phone:</p>
            <input 
              type='text' 
              name='phone'
              value={data?.phone}
              onChange={handleInput}
              placeholder='Enter Phone here...' 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
          </div>
          <div className='w-[100%]'>
            <p className='mb-1'>Email:</p>
            <input 
              type='text' 
              name='email'
              value={data?.email}
              onChange={handleInput}
              placeholder='Enter Email here...' 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
            {errMsg.email &&
                <div className='text-red-600'>{errMsg.email}</div>
            }
          </div>
        </div>
        {/* ADDRESS */}
        <div className='w-[100%] mb-4'>
          <p className='mb-1'>Address:</p>
          <textarea 
            name='address'
            value={data?.address}
            onChange={handleInput}
            placeholder='Enter Address here...' 
            className='w-[100%] h-[10rem] p-3 rounded-lg outline-none border border-slate-300'></textarea>
        </div>
        {/* COUNTRY */}
        <div className='w-[100%] mb-4'>
          <p className='mb-1'>Country:</p>
          <select 
            name='country'
            onChange={handleInput}
            placeholder='Enter Country name here...' 
            className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300'>
              <option value=''>Select an option.</option>
              {CountryData.map((i, key) => (
                <option key={key} value={i.name} selected={data?.country == i.name && 'selected'}>
                  {i.name}
                </option>
              ))}
          </select>
        </div>
       
       
        <div className='flex items-center justify-center py-[1rem]'>
          <button onClick={() => setIsSubmit(true)} className='btn__primary'>
            {isSubmit == true ? 'Processing' : 'Submit'}
          </button>
        </div>
      </div>
    </section>
    </>
  )
}

