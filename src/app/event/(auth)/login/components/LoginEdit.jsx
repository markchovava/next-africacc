"use client";
import { loginAction } from '@/actions/authActions';
import { baseURL } from '@/api/baseURL';
import { setAuthCookie } from '@/cookie/authCookieClient';
import { setRoleCookie } from '@/cookie/roleCookieClient';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import { tokenMembership } from '@/tokens/tokenMembership';
import { tokenRole } from '@/tokens/tokenRole';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-toastify';
import QRCodeLoginModal from './QRCodeLoginModal';




export default function LoginEdit() {
  const router = useRouter();
  const { setAuthToken } = tokenAuth()
  const { setRoleToken } = tokenRole()
  const [data, setData] = useState({});
  const { setMembershipToken } = tokenMembership();
  const [isSubmit, setIsSubmit] = useState(false);
  const [errMsg, setErrMsg] = useState({});
  const [isModal, setIsModal] = useState(false);
  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  
  const postData = async () => {
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
    const formData = {
      email: data.email,
      password: data.password,
    };
    try{
      const res = await loginAction(formData);
        if(res?.status == 0){
          const message = res?.message;
          setErrMsg({email: message});
          toast.warn(message, toastifyDarkBounce);
          setIsSubmit(false);
          return;
        }
        if(res?.status == 2){
          const message = res?.message;
          setErrMsg({password: message});
          toast.warn(message, toastifyDarkBounce);
          setIsSubmit(false);
          return;
        }
        if(res?.status == 1){
          toast.success(res?.message, toastifyDarkBounce);
          setRoleToken(res?.role_level);
          setRoleCookie(res?.role_level)
          setAuthToken(res?.auth_token);
          setAuthCookie(res?.auth_token);
          res?.membership_id && setMembershipToken(res?.membership_id);
          setIsSubmit(false);    
          router.push('/event/checkout'); 
        }

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
                <h3 className='text-[2rem] mb-6 text-center text-yellow-600'>Login Form</h3>
                <div className='flex items-center justify-center py-4'>
                  <button 
                    onClick={() => 
                    setIsModal(true)} 
                    className='px-6 py-3 rounded-xl border border-cyan-600 transition-all ease-in-out duration-200 text-white bg-gradient-to-br from-cyan-500 to-green-700 hover:bg-gradient-to-tl hover:from-cyan-500 hover:to-green-700'>
                    Login with QR Code
                  </button>
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
                <div className='w-[100%] mb-6 flex items-center justify-end'>
                   <Link href='#' className='font-light text-green-700 underline hover:no-underline transition-all ease-in-out'>
                    Forgot password?
                   </Link>
                </div>
                <div className='w-[100%] mb-4'>
                   <button onClick={() => setIsSubmit(true)} className='w-[100%] rounded-lg py-4 text-white transition-all ease-in-out bg-gradient-to-br from-yellow-500 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-500 hover:from-yellow-700 hover:drop-shadow-md'>
                    {isSubmit == true ? 'Processing' : 'Submit'}
                   </button>
                </div>
                <div className='w-[100%] pt-2 pb-6 flex items-center justify-center font-light text-yellow-600'>
                  Or Login with
                </div>
                <div className='w-[100%] mb-4'>
                   <button className='w-[100%] bg-white flex items-center justify-center gap-1 rounded-lg py-4 transition-all ease-in-out border-2 border-slate-300 hover:drop-shadow-md'>
                    <FaGoogle className='text-blue-600 text-xl' /> 
                    <span className='text-slate-700 font-light'>
                        Login with Google.</span>
                   </button>
                </div>
                <div className='w-[100%] py-4 flex items-center justify-center gap-2 font-light'>
                  Don't have an account? 
                  <Link href='/event/register' className='text-green-600 underline hover:no-underline transition-all ease-in-out'>
                    Register here</Link>
                </div>
            </div>
        </section>

        <QRCodeLoginModal isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}
