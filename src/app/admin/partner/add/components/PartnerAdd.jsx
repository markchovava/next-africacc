"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { toastifyDarkBounce } from '@/libs/toastify';
import Loader from '@/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CountryData from '@/data/CountryData.json';


export default function PartnerAdd() {
  const router = useRouter();
  const [data, setData] = useState({});
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

  const postData = async () => {
    const formData = {
      name: data?.name,
      priority: data?.priority,
      link: data?.link,
      image: data?.image,
    }
    try{
        const result = await axiosClientAPI.post(`partner`, formData, config)
        .then((response) => {
            if(response.data.status == 1){
              toast.success(response.data.message, toastifyDarkBounce);
              setIsSubmit(false);
              router.push(`/admin/partner`);
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
      isSubmit === true && postData();
  }, [isSubmit]);


  return (
    <>
    <section className='w-[100%] pb-[6rem]'>
      <div className='w-[90%] mx-auto'>
        {/* LINK */}
        <div className='flex items-center justify-end mb-6'>
          <Link 
            href={`/admin/partner`} 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            View List
          </Link>
        </div>
        {/* IMAGE */}
        <div className='w-[100%] mb-4'>
          <p className='mb-1 leading-none font-light'>Image:</p>
          <input 
            type='file' 
            name='image'
            onChange={(e) => {
              setData({...data, image: e.target.files[0] })
              setImage(URL.createObjectURL(e.target.files[0]))
            }}
            className='w-[50%] py-3 px-4 mb-4 rounded-lg outline-none border border-slate-300' />
          <div className='w-[20%] overflow-hidden aspect-[5/3] border border-slate-300 rounded-xl'>
            <img src={image} className='w-[100%] h-[100%] object-cover' alt='Image' />
          </div>
        </div>
        {/* NAME */}
        <div className='w-[100%] mb-4'>
          <p className='mb-1 leading-none font-light'>Name:</p>
          <input 
            type='text' 
            name='name'
            onChange={handleInput}
            placeholder='Enter Name here...' 
            className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
        </div>
        {/*  */}
        <div className='w-[100%] grid grid-cols-2 gap-6 mb-4'>
          <div className='w-[100%]'>
            <p className='mb-1 leading-none font-light'>Link:</p>
            <input 
              type='text' 
              name='link'
              onChange={handleInput}
              placeholder='Enter Link here...' 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
          </div>
          <div className='w-[100%]'>
            <p className='mb-1 leading-none font-light'>Priority:</p>
            <select 
              name='priority'
              onChange={handleInput}
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300'>
              <option value=''>Select an option.</option>
              {[...Array(12)].map((i, key) => (
                <option value={key+1}>{key+1}</option>
              ))}
            </select>
          </div>
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
