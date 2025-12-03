"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import RichTextEditor from '@/components/RichTextEditor';


export default function CountryAdd() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [data, setData] = useState({});
  const [images, setImages] = useState({});
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
      description: description,
      priority: data?.priority,
      slug: data?.slug,
      portrait: data?.portrait,
      landscape: data?.landscape,
    }

    try{
        const result = await axiosClientAPI.post(`sector`, formData, config)
        .then((response) => {
            if(response.data.status == 1){
              toast.success(response.data.message, toastifyDarkBounce);
              setIsSubmit(false);
              router.push(`/admin/sector`);
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
            href={`/admin/sector`} 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            View List
          </Link>
        </div>
        <div className='w-[100%] grid grid-cols-2 gap-6 mb-4'>
          <div className='w-[100%]'>
            <p className='mb-1'>Name:</p>
            <input 
              type='text' 
              name='name'
              onChange={handleInput}
              placeholder='Enter Name here...' 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
          </div>
          <div className='w-[100%]'>
            <p className='mb-1'>Slug:</p>
            <input 
              type='text' 
              name='slug'
              onChange={handleInput}
              placeholder='Enter Slug here...' 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
          </div>
        </div>
        {/*  */}
        <div className='w-[100%] mb-4'>
          <p className='mb-1'>Description:</p>
          <div className='w-[100%] h-auto mb-12 overflow-hidden'>
              <RichTextEditor content={description} setContent={setDescription} />
          </div>
        </div>
        {/*  */}
        <div className='w-[100%] mb-4'>
          <p className='mb-2'>Priority:</p>
          <select
            name='priority'
            onChange={handleInput}
            className='w-[100%] p-3 rounded-lg outline-none border border-slate-300'>
            <option value=''>Select an option.</option>
            {[...Array(12)].map((i, key) => (
              <option key={key} value={key+1}>{key+1}</option>
            ))}
          </select>
        </div>
        {/*  */}
        <div className='w-[100%] grid grid-cols-5 gap-6 mb-4'>
            <div className='col-span-3'>
              <p className='mb-2'>Landscape:</p>
              <input 
                type='file' 
                name='landscape'
                onChange={(e) => {
                  setData({ ...data, landscape: e.target.files[0] })
                  setImages({ ...images, landscape: URL.createObjectURL(e.target.files[0]) })
                }}
                className='w-[100%] p-3 rounded-lg outline-none border border-slate-300 mb-4' />
              <div className='aspect-[5/1] h-[9rem] overflow-hidden border border-slate-300 rounded-lg'>
                <img src={images.landscape} className='w-[100%] h-[100%] object-cover' />
              </div>
            </div>
            <div className='col-span-2'>
              <p className='mb-2'>Portrait:</p>
              <input 
                type='file' 
                name='portrait'
                onChange={(e) => {
                  setData({ ...data, portrait: e.target.files[0] })
                  setImages({ ...images, portrait: URL.createObjectURL(e.target.files[0]) })
                }}
                className='w-[100%] p-3 rounded-lg outline-none border border-slate-300 mb-4' />
                 <div className='aspect-[5/4] h-[9rem] overflow-hidden border border-slate-300 rounded-lg'>
                <img src={images.portrait} className='w-[100%] h-[100%] object-cover' />
              </div>
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
