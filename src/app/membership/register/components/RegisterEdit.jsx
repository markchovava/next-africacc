"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { toastifyDarkBounce } from '@/libs/toastify';
import { baseURL } from '@/api/baseURL';
import axios from 'axios';
import { useRouter } from 'next/navigation';



export default function RegisterEdit() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errMsg, setErrMsg] = useState({});

  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const postData = async () => {
      if(!data.name) {
        const message = 'Name is required.';
        setErrMsg({name: message});
        toast.warn(message, toastifyDarkBounce)
        setIsSubmit(false);
        return;
      }
      if(!data.email) {
        const message = 'Email is required.';
        setErrMsg({email: message});
        toast.warn(message, toastifyDarkBounce)
        setIsSubmit(false);
        return;
      }
      if(!data.password) {
        const message = 'Password is required.';
        setErrMsg({password: message});
        toast.warn(message, toastifyDarkBounce);
        setIsSubmit(false);
        return;
      }
      if(!data.password_confirmation) {
        const message = 'Password Confirmation is required.';
        setErrMsg({password_confirmation: message});
        toast.warn(message, toastifyDarkBounce);
        setIsSubmit(false);
        return;
      }
      if(data.password != data.password_confirmation) {
        const message = 'Password does not match.';
        setErrMsg({password_confirmation: message});
        toast.warn(message, toastifyDarkBounce);
        setIsSubmit(false);
        return;
      }
      /*  */
      const formData = {
        email: data.email,
        password: data.password,
        name: data.name,
      };
      /*  */
      try{
        const result = await axios.post(`${baseURL}register`, formData)
        .then((response) => {
          if(response.data.status == 0){
            const message = response.data.message;
            setErrMsg({email: message});
            toast.warn(message, toastifyDarkBounce);
            setIsSubmit(false);
            return;
          }
          if(response.data.status == 1){
            toast.success(response.data.message, toastifyDarkBounce);
            router.push('/membership/login'); 
            setIsSubmit(false);    
          }
        
        })
        } catch (error) {
            console.error(`Error: ${error}`);
            setIsSubmit(false); 
      }
  }

  useEffect(() => {
    isSubmit == true && postData();
  }, [isSubmit]);


  return (
    <>
    <section className='w-[100%] py-[5rem]'>
        <div className='mx-auto lg:w-[50%] w-[80%] bg-white drop-shadow-md p-[1.6rem]'>
            <h3 className='text-[2rem] mb-6 text-center text-yellow-600'>Register Form</h3>
            <div className='w-[100%] mb-4'>
                <p className='mb-2 font-light'>Full Name:</p>
                <input 
                    type='text'
                    name='name'
                    onChange={handleInput} 
                    placeholder='Enter your Full Name here...'
                    className='w-[100%] p-4 outline-none border border-slate-300 rounded-lg' />
                {errMsg.name &&
                  <small className='text-red-600'>
                    {errMsg.name}
                  </small>
                }
            </div>
            <div className='w-[100%] mb-4'>
                <p className='mb-2 font-light'>Email:</p>
                <input 
                    type='text'
                    name='email'
                    onChange={handleInput} 
                    placeholder='Enter your email here...'
                    className='w-[100%] p-4 outline-none border border-slate-300 rounded-lg' />
                {errMsg.email &&
                  <small className='text-red-600'>
                    {errMsg.email}
                  </small>
                }

            </div>
            <div className='w-[100%] mb-4'>
                <p className='mb-2 font-light'>Password:</p>
                <input 
                    type='password' 
                    name='password'
                    onChange={handleInput} 
                    placeholder='Enter Password here...'
                    className='w-[100%] p-4 outline-none border border-slate-300 rounded-lg' />
                {errMsg.password &&
                  <small className='text-red-600'>
                    {errMsg.password}
                  </small>
                }
            </div>
            <div className='w-[100%] mb-6'>
                <p className='mb-2 font-light'>Confirm Password:</p>
                <input 
                    type='password' 
                    name='password_confirmation'
                    onChange={handleInput} 
                    placeholder='Enter Confirm Password here...'
                    className='w-[100%] p-4 outline-none border border-slate-300 rounded-lg' />
                {errMsg.password_confirmation &&
                  <small className='text-red-600'>
                    {errMsg.password_confirmation}
                  </small>
                }
            </div>
    
            <div className='w-[100%] mb-4'>
               <button 
                onClick={() => setIsSubmit(true)} 
                className='w-[100%] rounded-lg py-4 text-white transition-all ease-in-out bg-gradient-to-br from-yellow-500 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-500 hover:from-yellow-700 hover:drop-shadow-md'>
                { isSubmit == true ? 'Processing' : 'Submit' }
               </button>
            </div>
            <div className='w-[100%] pt-2 pb-6 flex items-center justify-center font-light text-yellow-600'>
              Or Register with
            </div>
            <div className='w-[100%] mb-4'>
               <button className='w-[100%] bg-white flex items-center justify-center gap-1 rounded-lg py-4 transition-all ease-in-out border-2 border-slate-300 hover:drop-shadow-md'>
                <FaGoogle className='text-blue-600 text-xl' /> 
                <span className='text-slate-700 font-light'>
                    Register with Google.</span>
               </button>
            </div>
            <div className='w-[100%] py-4 flex items-center justify-center gap-2 font-light'>
              Don't have an account? 
              <Link href='/membership/login' className='text-green-600 underline hover:no-underline transition-all ease-in-out'>
                Login here</Link>
            </div>
        </div>
    </section>
</>
  )
}
