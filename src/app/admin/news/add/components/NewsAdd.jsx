"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/components/Loader';
import RichTextEditor from '@/components/RichTextEditor';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';




export default function NewsAdd() {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [data, setData] = useState({});
    const [image, setImage] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${getAuthToken()}`
    }};

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value })
    }

    async function postData() {
        const formData = {
        title: data?.title,
        description: description,
        image: data?.image,
        priority: data?.priority,
        slug: data?.slug,
        status: data?.status,
        }
        try{
            const result = await axiosClientAPI.post(`news`, formData, config)
            .then((response) => {
                if(response.data.status == 1){
                toast.success(response.data.message, toastifyDarkBounce);
                setIsSubmit(false);
                router.push(`/admin/news`);
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
            href={`/admin/news`} 
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
                setImage(URL.createObjectURL(e.target.files[0]))
                setData({...data, image: e.target.files[0]})
              }}
              className='w-[40%] py-3 mb-2 rounded-lg outline-none ' />
            <div className='h-[10rem] aspect-[5/3] overflow-hidden rounded-xl border border-slate-300'>
                <img src={image} className='h-[100%] w-[100%] object-cover' alt='Image' />
            </div>

        </div>
        {/* TITLE */}
        <div className='w-[100%] mb-4'>
          <p className='mb-1'>Title:</p>
          <input 
              type='text' 
              name='title'
              onChange={handleInput}
              placeholder='Enter Title here...' 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
        </div>
        {/* PRIORITY & STATUS */}
        <div className='w-[100%] grid grid-cols-2 gap-6 mb-4'>
            <div className='w-[100%]'>
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
          <div className='w-[100%]'>
            <p className='mb-1'>Status:</p>
            <select 
              name='status'
              onChange={handleInput} 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300'>
                <option value=''>Select an option</option>
                <option value='Published'>Published</option>
                <option value='Unpublished'>Unpublished</option>
            </select>
          </div>
        </div>
         {/* SLUG */}
         <div className='w-[100%] mb-4'>
          <p className='mb-1'>Slug:</p>
          <input 
              type='text' 
              name='slug'
              onChange={handleInput}
              placeholder='Enter Slug here...' 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
        </div>
        <div className='w-[100%]'>
            <p className='mb-1'>Description:</p>
            <div className='w-[100%] h-auto mb-12 overflow-hidden'>
              <RichTextEditor content={description} setContent={setDescription} />
            </div>
        </div>
        {/* SUBMIT BUTTON */}
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
