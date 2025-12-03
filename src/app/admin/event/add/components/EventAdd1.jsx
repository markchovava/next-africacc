"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



export default function EventAdd1() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [description, setDescription] = useState('');
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
      date: data?.date,
      status: data.status,
      duration: data?.duration,
      priority: data?.priority,
      slug: data?.slug,
      location: data?.location,
      joining_fee: data?.joining_fee,
    }
    try{
        const result = await axiosClientAPI.post(`event`, formData, config)
        .then((response) => {
            if(response.data.status == 1){
              toast.success(response.data.message, toastifyDarkBounce);
              setIsSubmit(false);
              router.push(`/admin/event`);
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
            href='/admin/event' 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            View List
          </Link>
        </div>

        {/* NAME */}
        <div className='w-[100%] mb-4'>
          <p className='mb-1'>Name:</p>
          <input 
              type='text' 
              name='name'
              onChange={handleInput}
              placeholder='Enter Name here...' 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
        </div>
        {/* ADDRESS */}
        <div className='w-[100%] mb-4'>
          <p className='mb-1'>Location / Venue:</p>
          <input 
              type='text' 
              name='location'
              onChange={handleInput}
              placeholder='Enter Address here...' 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
        </div>
        {/* STATUS & JOINING FEE */}
        <div className='w-[100%] grid md:grid-cols-2 grid-cols-1 gap-6 mb-4'>
          <div className='w-[100%]'>
            <p className='mb-1'>Status:</p>
            <select 
                name='status'
                onChange={handleInput}
                placeholder='Enter  here...' 
                className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300'>
                <option value=''>Select an option.</option>
                <option value='Upcoming' >Upcoming</option>
                <option value='Completed' >Completed</option>
            </select>
          </div>
          <div className='w-[100%]'>
          <p className='mb-1'>Joining Fee:</p>
          <input 
              type='number' 
              name='joining_fee'
              onChange={handleInput}
              placeholder='Enter Fee here...' 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
        </div>

        </div>

        {/* PRIORITY & SLUG */}
         <div className='w-[100%} grid md:grid-cols-2 grid-cols-1 gap-6 mb-4'>
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
        <div className='w-[100%] grid md:grid-cols-2 grid-cols-1 gap-6 mb-4'>
          <div className='w-[100%]'>
            <p className='mb-1'>Date:</p>
            <input 
              type='date' 
              name='date'
              onChange={handleInput}
              placeholder='Enter Date here...' 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
          </div>
          <div className='w-[100%]'>
            <p className='mb-1'>Duration:</p>
            <select 
              name='duration'
              onChange={handleInput} 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300'>
                <option value=''>Select an option</option>
                <option value='All Day'>All Day</option>
                <option value='Half Day'>Half Day</option>
                <option value='To be decided'>To be decided</option>
            </select>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className='w-[100%] mb-8'>
            <p className='mb-1'>Description:</p>
            <div className='w-[100%] h-[10rem] mb-12'>
            <ReactQuill theme="snow" 
                className='h-[100%] w-[100%]' value={description} 
                onChange={setDescription} />
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
