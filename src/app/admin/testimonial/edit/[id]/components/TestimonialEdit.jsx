"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';



export default function TestimonialEdit({id}) {
    const router = useRouter();
    const [data, setData] = useState();
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
        const result = await axiosClientAPI.get(`testimonial/${id}`, config)
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
          email: data?.email,
          priority: data?.priority,
        }

        try{
            const result = await axiosClientAPI.post(`testimonial/${id}`, formData, config)
            .then((response) => {
                if(response.data.status == 1){
                    toast.success(response.data.message, toastifyDarkBounce);
                    setIsSubmit(false);
                    router.push(`/admin/testimonial/${id}`);
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

    if(!data) {return (<Loader />)}

  return (
    <>
    <section className='w-[100%] pb-[6rem]'>
      <div className='w-[90%] mx-auto'>
        {/* LINK */}
        <div className='flex items-center justify-end mb-6'>
          <Link 
            href={`/admin/testimonial/${id}`} 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            View
          </Link>
        </div>

        {/* NAME */}
        <div className='w-[100%] mb-4'>
          <p className='leading-none font-light mb-1'>Name:</p>
          <input 
            type='text' 
            name='name'
            value={data?.name} 
            placeholder='Enter Name here...'
            onChange={handleInput} 
            className='w-[100%] py-3 px-4 outline-none border border-slate-300 rounded-lg' />
        </div>

        {/* EMAIL & PRIORITY */}
        <div className='w-[100%] grid grid-cols-2 gap-6 mb-4'>
          <div className='w-[100%]'>
            <p className='leading-none font-light mb-1'>Email:</p>
            <input type='text'  
              name='email'
              value={data?.email}
              onChange={handleInput}
              placeholder='Enter an Email here...'
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
          </div>
          <div className='w-[100%]'>
            <p className='leading-none font-light mb-1'>Priority:</p>
            <select  
              name='priority'
              onChange={handleInput}
              className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300'>
                <option value=''>Select an option.</option>
                {[...Array(12)].map((i, key) => (
                    <option key={key} value={key+1} selected={data.priority == key+1 && 'selected'}>
                      {key+1}</option>
                ))}
            </select>
          </div>
        </div>
       
        {/* DESCRIPTION */}
        <div className='w-[100%] mb-4'>
          <p className='leading-none font-light mb-2'>Description:</p>
          <div className='w-[100%] mb-4'>
          <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className='p-4 rounded-lg border border-slate-300 outline-none w-[100%] h-[8rem]'></textarea>
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
