"use client";
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';




export default function PasswordEdit() {
    const router = useRouter();
    const [data, setData] = useState({});
    const [errMsg, setErrMsg] = useState({});
    const { getAuthToken } = tokenAuth();
    const [isSubmit, setIsSubmit] = useState(false);
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${getAuthToken()}`
    }};

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value })
    }

    const postData = async () => {
        if(!data.password) {
            const message = 'Password is required.';
            toast.warn(message, toastifyDarkBounce);
            setErrMsg({password: message});
            setIsSubmit(false);
            return;
        }
        if(!data.password_confirmation) {
            const message = 'Password Confirmation is required.';
            toast.warn(message, toastifyDarkBounce);
            setErrMsg({password_confirmation: message});
            setIsSubmit(false);
            return;
        }
        if(data.password !== data.password_confirmation) {
            const message = 'Password does not match.';
            toast.warn(message, toastifyDarkBounce);
            setErrMsg({password_confirmation: message});
            setIsSubmit(false);
            return;
        }
        /*  */
        const formData = {
          password: data?.password
        }
        try{
            const result = await axiosClientAPI.post(`password`, formData, config)
            .then((response) => {
                if(response.data.status == 0) {
                    const message = response.data.message;
                    toast.warn(message, toastifyDarkBounce);
                    setErrMsg({password: message});
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
        isSubmit === true && postData();
      }, [isSubmit]);


  return (
    <>
     <section className='w-[100%] pb-[6rem]'>
      <div className='w-[90%] mx-auto'>
        {/* LINK */}
        <div className='flex items-center justify-end mb-6'>
          <Link 
            href={`/admin/profile`} 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            View Profile
          </Link>
        </div>
       
        {/* PASSWORD */}
        <div className='w-[100%] mb-4'>
          <p className='mb-1'>Password:</p>
          <input 
            type='password' 
            name='password'
            onChange={handleInput}
            placeholder='Enter Password here...' 
            className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
          {errMsg.password &&
            <div className='text-red-600'>{errMsg.password}</div>
          }
        </div>
        {/* PASSWORD */}
        <div className='w-[100%] mb-4'>
          <p className='mb-1'>Password:</p>
          <input 
            type='password' 
            name='password_confirmation'
            onChange={handleInput}
            placeholder='Enter Password Confirmation here...' 
            className='w-[100%] py-3 px-4 rounded-lg outline-none border border-slate-300' />
          {errMsg.password_confirmation &&
            <div className='text-red-600'>{errMsg.password_confirmation}</div>
          }
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
