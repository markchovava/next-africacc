"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';


import RichTextEditor from '@/components/RichTextEditor';


export default function MembershipEdit({id}) {
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

    /* GET DATA */
    async function getData() {
        try{
        const result = await axiosClientAPI.get(`membership/${id}`, config)
        .then((response) => {
            const res = response.data.data;
            setData(res)
            setDescription(res.description)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }  

    const postData = async () => {
        const formData = {
            name: data?.name,
            description: description,
            slug: data?.slug,
            level: 1,
            priority: 1,
            fee: data.fee
        }

        try{
            const result = await axiosClientAPI.post(`membership/${id}`, formData, config)
            .then((response) => {
                if(response.data.status == 1){
                    toast.success(response.data.message, toastifyDarkBounce);
                    setIsSubmit(false);
                    router.push(`/admin/membership/${id}`);
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
        isSubmit === true && postData();
    }, [isSubmit]);


  return (
    <>
    <section className='w-[100%] pb-[6rem]'>
      <div className='w-[90%] mx-auto'>
        {/* LINK */}
        <div className='flex items-center justify-end mb-6'>
          <Link 
            href={`/admin/membership/${id}`} 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            View
          </Link>
        </div>

        {/* NAME & SLUG */}
        <div className='w-[100%] grid grid-cols-2 gap-6 mb-4'>
          <div className='w-[100%]'>
            <p className='mb-1'>Name:</p>
            <input 
              type='text' 
              name='name'
              onChange={handleInput}
              value={data?.name}
              placeholder='Enter Name here...' 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
          </div>
          <div className='w-[100%]'>
            <p className='mb-1'>Slug:</p>
            <input 
              type='text' 
              name='slug'
              value={data?.slug}
              onChange={handleInput}
              placeholder='Enter Slug here...' 
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
          </div>
        </div>

        {/* PRIORITY & LEVEL */}
       {/*  <div className='w-[100%] grid grid-cols-2 gap-6 mb-4'>
          <div className='w-[100%]'>
            <p className='mb-1'>Priority:</p>
            <select  
              name='priority'
              onChange={handleInput}
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300'>
                <option value=''>Select an option.</option>
                {[...Array(12)].map((i, key) => (
                    <option key={key} value={key+1} selected={data.priority === key+1 && 'selected'}>
                        {key+1}</option>
                ))}
            </select>
          </div>
          <div className='w-[100%]'>
            <p className='mb-1'>Level:</p>
            <select  
              name='level'
              onChange={handleInput}
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300'>
                <option value=''>Select an option.</option>
                {[...Array(4)].map((i, key) => (
                    <option key={key} value={key+1} selected={data.level === key+1 && 'selected'}>{key+1}</option>
                ))}
            </select>
          </div>
        </div> */}

        {/* FEE */}
        <div className='w-[100%] mb-4'>
          <p className='leading-none mb-2'>Fee:</p>
          <input 
            type='number' 
            name='fee' 
            onChange={handleInput} 
            value={data?.fee}
            placeholder='Enter Fee here...'
            className='w-[100%] py-3 px-4 outline-none border border-slate-300 rounded-lg' />
        </div>
       
        {/* DESCRIPTION */}
        <div className='w-[100%] mb-4'>
          <p className='mb-2'>Description:</p>
          <div className='w-[100%] h-auto mb-12 overflow-hidden'>
              <RichTextEditor content={description} setContent={setDescription} />
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
