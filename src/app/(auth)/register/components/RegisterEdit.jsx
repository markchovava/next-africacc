"use client";
import Link from 'next/link'
import React, { useEffect, useState, useTransition } from 'react'
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { toastifyDarkBounce } from '@/libs/toastify';
import { useRouter } from 'next/navigation';
import { tokenAuth } from '@/tokens/tokenAuth';
import { tokenMembership } from '@/tokens/tokenMembership';
import { tokenRole } from '@/tokens/tokenRole';
import { setAuthCookie } from '@/cookie/authCookieClient';
import { setRoleCookie } from '@/cookie/roleCookieClient';
import { registerAction } from '@/actions/authActions';
import QRCodeRegisterModal from './QRCodeRegisterModal';



export default function RegisterEdit() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errMsg, setErrMsg] = useState({});
  const { setAuthToken } = tokenAuth()
  const { setRoleToken } = tokenRole()
  const { setMembershipToken } = tokenMembership();

  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  async function postData() {
      if(!data.name) {
        const message = 'Full Name is required.';
        setErrMsg({name: message});
        toast.warn(message, toastifyDarkBounce);
        return;
      }
      if(!data.email) {
        const message = 'Email is required.';
        setErrMsg({email: message});
        toast.warn(message, toastifyDarkBounce);
        return;
      }
      if(!data.password) {
        const message = 'Password is required.';
        setErrMsg({password: message});
        toast.warn(message, toastifyDarkBounce);
        return;
      }
      if(!data.password_confirmation) {
        const message = 'Password Confirmation is required.';
        setErrMsg({password_confirmation: message});
        toast.warn(message, toastifyDarkBounce);
        return;
      }
      if(data.password != data.password_confirmation) {
        const message = 'Password does not match.';
        setErrMsg({password_confirmation: message});
        toast.warn(message, toastifyDarkBounce);
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
        const res = await registerAction(formData);
        startTransition(() => res);
        if(res?.status == 0){
          const message = res?.message;
          setErrMsg({email: message});
          toast.warn(message, toastifyDarkBounce);
          return;
        }
        if(res?.status == 1){
          toast.success(res?.message, toastifyDarkBounce);
          /* ROLE */
          setRoleToken(res?.role_level);
          setRoleCookie(res?.role_level)
          /* AUTH */
          setAuthToken(res?.auth_token);
          setAuthCookie(res?.auth_token);
          /* MEMBERSHIP */
          res?.membership_id && setMembershipToken(res?.membership_id);   
          router.push('/membership/add'); 
        }
      
        } catch (error) {
            console.error(`Error: ${error}`);
      }
  }




  return (
    <>
    <section className='w-[100%] py-[5rem]'>
        <div className='mx-auto lg:w-[50%] w-[80%] bg-white drop-shadow-md p-[1.6rem]'>
            <h3 className='text-[2rem] mb-6 text-center text-yellow-600'>Register Form</h3>
            <div className='flex items-center justify-center py-4'>
              <button onClick={() => setIsModal(true)} className='px-6 py-3 rounded-xl border border-cyan-600 transition-all ease-in-out duration-200 text-white bg-gradient-to-br from-cyan-500 to-green-700 hover:bg-gradient-to-tl hover:from-cyan-500 hover:to-green-700'>
                Register with QR Code
              </button>
            </div>

            <form action={postData}>
              {/* FULL NAME */}
              <div className='w-[100%] mb-4'>
                  <p className='mb-2 font-light'>Full Name:</p>
                  <input 
                      type='text'
                      name='name'
                      value={data?.name}
                      onChange={handleInput} 
                      placeholder='Enter your Full Name here...'
                      className='w-[100%] p-4 outline-none border border-slate-300 rounded-lg' />
                  {errMsg.name &&
                    <small className='text-red-600'>
                      {errMsg.name}
                    </small>
                  }
              </div>
              {/* EMAIL */}
              <div className='w-[100%] mb-4'>
                  <p className='mb-2 font-light'>Email:</p>
                  <input 
                      type='text'
                      name='email'
                      value={data?.email}
                      onChange={handleInput} 
                      placeholder='Enter your email here...'
                      className='w-[100%] p-4 outline-none border border-slate-300 rounded-lg' />
                  {errMsg.email &&
                    <small className='text-red-600'>
                      {errMsg.email}
                    </small>
                  }

              </div>
              {/* PASSWORD */}
              <div className='w-[100%] mb-4'>
                  <p className='mb-2 font-light'>Password:</p>
                  <input 
                      type='password' 
                      name='password'
                      value={data?.password}
                      onChange={handleInput} 
                      placeholder='Enter Password here...'
                      className='w-[100%] p-4 outline-none border border-slate-300 rounded-lg' />
                  {errMsg.password &&
                    <small className='text-red-600'>
                      {errMsg.password}
                    </small>
                  }
              </div>
              {/* PASSWORD CONFIRMATION */}
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
              {/* SUBMIT */}
              <div className='w-[100%] mb-4'>
                <button type='submit'
                  className='w-[100%] rounded-lg py-4 text-white transition-all ease-in-out bg-gradient-to-br from-yellow-500 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-500 hover:from-yellow-700 hover:drop-shadow-md'>
                  { isPending ? 'Processing' : 'Submit' }
                </button>
              </div>
            </form>

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
              Do have an account? 
              <Link href='/login' className='text-green-600 underline hover:no-underline transition-all ease-in-out'>
                Login here</Link>
            </div>
        </div>
    </section>

    <QRCodeRegisterModal isModal={isModal} setIsModal={setIsModal} />
</>
  )
}
