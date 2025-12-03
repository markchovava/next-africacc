"use client";
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useZxing } from "react-zxing";
import { toast } from 'react-toastify';
import { toastifyDarkBounce } from '@/libs/toastify';
import { qrcodeRegisterAction } from '@/actions/authActions';
import { tokenMembership } from '@/tokens/tokenMembership';
import { tokenRole } from '@/tokens/tokenRole';
import { useRouter } from 'next/navigation';
import { setRoleCookie } from '@/cookie/roleCookieClient';
import { tokenAuth } from '@/tokens/tokenAuth';
import { setAuthCookie } from '@/cookie/authCookieClient';


const contentVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1,
        transition: {
            type: 'spring',
            duration: 1, 
          }
        },
};


export default function QRCodeRegisterModal({isModal, setIsModal}) {
  const router = useRouter();
  const [data, setData] = useState({});
  const [errQrMsg, setErrQrMsg] = useState({});
  const [isQrSubmit, setIsQrSubmit] = useState(false);
  const [isQrScan, setIsQrScan] = useState(true);
  const [scanInput, setScanInput] = useState();
  const { setMembershipToken } = tokenMembership();
  const { setAuthToken } = tokenAuth();
  const { setRoleToken } = tokenRole();
  const { ref } = useZxing({
      onDecodeResult(result) {
        setScanInput(result.getText())
      },
      paused: isQrScan
  });

  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value })
  }

  async function postQrData() {
      if(!scanInput){
        const message = 'QR Code is required.';
        toast.warn(message, toastifyDarkBounce);
        setErrQrMsg({qrcode: message});
        setIsQrSubmit(false);
        return;
      }
      if(!data.name){
        const message = 'Full Name is required.';
        toast.warn(message, toastifyDarkBounce);
        setErrQrMsg({name: message});
        setIsQrSubmit(false);
        return;
      }
      if(!data.email){
        const message = 'Email is required.';
        toast.warn(message, toastifyDarkBounce);
        setErrQrMsg({email: message})
        setIsQrSubmit(false);
        return;
      }
      if(!data.password){
        const message = 'Password is required.';
        toast.warn(message, toastifyDarkBounce);
        setErrQrMsg({password: message});
        setIsQrSubmit(false);
        return;
      }
      if(!data.password_confirmation){
        const message = 'Confirm Password is required.';
        toast.warn(message, toastifyDarkBounce);
        setErrQrMsg({password_confirmation: message});
        setIsQrSubmit(false);
        return;
      }
      if(data.password != data.password_confirmation){
        const message = 'The Password do not match.';
        toast.warn(message, toastifyDarkBounce);
        setErrQrMsg({password_confirmation: message});
        setIsQrSubmit(false);
        return;
      }
      const formData = {
        name: data.name, 
        email: data.email, 
        password: data.password,
        code: scanInput,
      }

      try{
        const res = await qrcodeRegisterAction(formData);
        if(res?.status == 0){
          const message = res?.message;
          setErrQrMsg({code: message});
          toast.warn(message, toastifyDarkBounce);
          setIsQrSubmit(false);
          return;
        }
        if(res?.status == 2){
          const message = res?.message;
          setErrQrMsg({code: message});
          toast.warn(message, toastifyDarkBounce);
          setIsQrSubmit(false);
          return;
        }
        if(res?.status == 3){
          const message = res?.message;
          setErrQrMsg({email: message});
          toast.warn(message, toastifyDarkBounce);
          setIsQrSubmit(false);
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
          setIsQrSubmit(false);    
          router.push('/event/checkout');
        }
      
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsQrSubmit(false); 
      }
  }

  useEffect(() => { 
    isQrSubmit && postQrData(); 
  }, [isQrSubmit]);

  
  return (
    <>
    <AnimatePresence>
    {isModal &&
    <motion.section
      variants={contentVariant}
      initial='hidden'
      animate='visible'
      exit='hidden' 
      className='w-[100vw] h-[100vh] fixed top-0 left-0 z-50 overflow-hidden'>
        <div className='absolute z-0 top-0 left-0 w-[100%] h-[100%] bg-black opacity-40'></div>
        <div className='w-[100%] h-[100%] absolute z-10 overflow-auto scroll__width py-[6rem]'>
          <section className='mx-auto md:w-[50%] w-[70%] bg-white text-black p-6 rounded-2xl'>
            {/* CLOSE */}
            <div className='flex items-center justify-end mb-3'>
              <button onClick={() => setIsModal(false)} className='hover:text-red-600 transition-all ease-in-out duration-200'>
                  <IoClose className='text-2xl' />
              </button>
            </div>
              <div className='flex items-center justify-center mb-4'>
              <button 
                  onClick={() => {
                      setIsQrScan(!isQrScan);
                  }}
                  className='px-[2rem] py-3 rounded-xl text-white bg-gradient-to-br from-blue-500 to-cyan-700 hover:bg-gradient-to-br hover:from-cyan-700 hover:to-blue-500 transition ease-in-out duration-200'>
                  Click to Scan </button>
              </div>

            {/* SCAN */}
            <section className=' mb-6'>
              <div className='w-[100%] flex justify-center items-start mb-3'>
                <div className='md:w-[50%] w-[100%] aspect-[4/3] rounded-xl bg-white overflow-hidden drop-shadow-xl'>
                <div className='"w-[100%] h-[100%] bg-white flex items-center justify-center absolute z-0 text-[1.4rem] text-center p-4 font-bold text-slate-600'>
                    Show the position of the QR Code.
                </div>
                {isQrScan == false &&
                  <div className={`${isQrScan == false ? 'w-[100%]' : 'hidden' } absolute z-10`}>
                    <div className="w-[100%] h-[100%] rounded-xl overflow-hidden">
                        <video ref={ref} className="w-[100%] h-[100%] object-cover bg-white drop-shadow-xl"/>
                    </div>
                  </div>
                }
                </div>
              </div>
              { errQrMsg.qrcode &&
                <p className='text-red-500 text-sm text-center'>{errQrMsg.qrcode}</p> 
              }

            </section>

            <form action={() => setIsQrSubmit(true)} method='POST' className=''>
            {scanInput && 
              <div className='mb-4'>
                <p className='mb-1'>QR Code:</p>
                <span className='text-green-600 font-medium'>{scanInput}</span>
              </div>
            }
              <div className='mb-4'>
                <p className='mb-2'>Full Name:</p>
                <input type='text' 
                  name='name' 
                  value={data?.name} 
                  onChange={handleInput} 
                  placeholder='Enter the Full Name here...' 
                  className='w-[100%] p-3 outline-none border border-slate-200 rounded-2xl' />
                { errQrMsg.name &&
                <p className='text-red-500 text-sm'>{errQrMsg.name}</p> 
                }
              </div>
              <div className='mb-4'>
                <p className='mb-2'>Email:</p>
                <input type='text' 
                  name='email' 
                  value={data?.email} 
                  onChange={handleInput} placeholder='Enter the Email here...' 
                  className='w-[100%] p-3 outline-none border border-slate-200 rounded-2xl' />
                { errQrMsg.email &&
                <p className='text-red-500 text-sm'>{errQrMsg.email}</p> 
                }
              </div>
              <div className='mb-4'>
                <p className='mb-2'>Password:</p>
                <input type='password' 
                  name='password' 
                  value={data?.password} 
                  onChange={handleInput} placeholder='Enter the Password here...' 
                  className='w-[100%] p-3 outline-none border border-slate-200 rounded-2xl' />
                { errQrMsg.password &&
                <p className='text-red-500 text-sm'>{errQrMsg.password}</p> 
                }
              </div>
              <div className='mb-6'>
                <p className='mb-2'>Confirm Password:</p>
                <input type='password' name='password_confirmation' 
                    value={data?.password_confirmation} 
                    onChange={handleInput}
                    placeholder='Enter the Password here...' 
                    className='w-[100%] p-3 outline-none border border-slate-200 rounded-2xl' />
                { errQrMsg.password_confirmation &&
                <p className='text-red-500 text-sm'>{errQrMsg.password_confirmation}</p> 
                }
              </div>
              <div className='mb-4'>
                <button type='submit' className='btn__form w-[100%] py-5'>
                  {isQrSubmit ? 'Processing' : 'Submit' }
                </button>
              </div>
            </form>

            

          </section>
        </div>
    </motion.section>
    }
    </AnimatePresence>
    </>
  )
}
