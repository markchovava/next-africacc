"use client";
import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useZxing } from "react-zxing";
import { IoClose } from 'react-icons/io5';
import { toastifyDarkBounce } from '@/libs/toastify';
import { qrcodeLoginAction } from '@/actions/authActions';
import { tokenMembership } from '@/tokens/tokenMembership';
import { tokenRole } from '@/tokens/tokenRole';
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


export default function QRCodeLoginModal({isModal, setIsModal}) {
  const router = useRouter();
  const [data, setData] = useState({});
  const [errQrMsg, setErrQrMsg] = useState({});
  const [isPending, startTransition] = useTransition();
  const [isQrScan, setIsQrScan] = useState(true);
  const [scanInput, setScanInput] = useState();
  const { setMembershipToken } = tokenMembership();
  const { setAuthToken } = tokenAuth();
  const { setRoleToken } = tokenRole();
  const { ref } = useZxing({
      onDecodeResult(result) {
        setScanInput(result.getText());
        console.log(result);
      },
      paused: isQrScan
  });


  async function postQrData() {
      if(!scanInput){
        const message = 'QR Code is required.';
        toast.warn(message, toastifyDarkBounce);
        setErrQrMsg({qrcode: message});
        return;
      }
      if(isQrScan == false){
        const message = 'Close the QRCode Scanner to submit.';
        toast.warn(message, toastifyDarkBounce);
        return;
      }
      const formData = {
        code: scanInput,
      }
      try{
        const res = await qrcodeLoginAction(formData);
        startTransition(() => res);
        if(res?.status == 0){
          const message = res?.message;
          setErrQrMsg({code: message});
          toast.warn(message, toastifyDarkBounce);
          return;
        }
        if(res?.status == 2){
          const message = res?.message;
          setErrQrMsg({code: message});
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
          router.push('/opportunity'); 
        }
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
      }
  }


  console.log('scanInput');
  console.log(scanInput);

  
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
                  {isQrScan 
                  ? 'Open QRCode Scanner' 
                  : 'Close QRCode Scanner'} 
                </button>
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

            <form action={postQrData} method='POST' className=''>
            {scanInput && 
              <div className='mb-6'>
                <p className='mb-1'>QR Code:</p>
                <span className='text-green-600 font-medium'>{scanInput}</span>
              </div>
            }
           
              <div className='mb-4 flex items-center justify-center'>
                <button type='submit' className='btn__form px-12 py-5'>
                  {isPending ? 'Processing' : 'Submit' }
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
