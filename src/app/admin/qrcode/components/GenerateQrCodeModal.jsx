"use client";
import { qrcodeStoreByNumApiAction } from '@/actions/qrcodeActions';
import { toastifyDarkBounce } from '@/libs/toastify';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useTransition } from 'react';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';


const contentVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1,
        transition: {
            type: 'spring',
            duration: 1, }},
};

export default function GenerateQrCodeModal({ isModal, setIsModal, getData }) {
    const [isPending, startTransition] = useTransition();
    const [isSubmit, setIsSubmit] = useState(false);
    const [inputData, setInputData] = useState({});
    const handleInput = (e) => {
        setInputData({...inputData, [e.target.name]: e.target.value})
    }

    async function postData(){
        if(!inputData.quantity) {
            const message = 'Quantity is required.';
            toast.warn(message, toastifyDarkBounce);
            return;
        }
        const formData = {
            quantity: Number(inputData?.quantity),
        };
        
       try{
            const res = await qrcodeStoreByNumApiAction(formData);
            startTransition(() => res);
            await getData();
            toast.success(res.message, toastifyDarkBounce);
            setIsModal(false);
          } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsModal(false);
          }  
    }




  return (
    <>
    <AnimatePresence>
    { isModal &&
    <motion.section 
    variants={contentVariant}
    initial='hidden'
    animate='visible'
    exit='hidden'
    className='w-[100vw] h-[100vh] fixed top-0 left-0 z-50 overflow-hidden'>
        <div className='absolute z-0 top-0 left-0 w-[100%] h-[100%] bg-black opacity-40'></div>
        <div className='w-[100%] h-[100%] absolute z-10 overflow-auto scroll__width py-[6rem]'>
            <section className='mx-auto w-[60%] bg-white text-black p-6 rounded-2xl'>
                <div className='flex items-center justify-end'>
                <button onClick={() => setIsModal(false)} className='hover:text-red-600 transition-all ease-in-out duration-200'>
                    <IoClose className='text-2xl' />
                </button>
                </div>
                <form action={postData} className='W-[100%]'>
                    <h3 className='text-[2rem] font-light mb-4'>Generate QR Code</h3>
                    {/* QUANTITY */}
                    <div className='w-[100%] mb-6'>
                        <p className='font-light mb-2'>Quantity:</p>
                        <select name='quantity' onChange={handleInput}
                            className='w-[100%] transition-all ease-in-out outline-none border border-slate-200 hover:border-slate-400 p-3'>
                            <option value=''>Select an option.</option>
                            <option value={1}>1</option>
                            {[...Array(4)].map((i, key) => (
                                <option key={key} value={(key+1) * 25}>{(key+1) * 25}</option>
                            ))}
                            {[...Array(10)].map((i, key) => (
                                <option key={key} value={(key+1) * 200}>{(key+1) * 200}</option>
                            ))}
                        </select>
                    </div>
                    <div className='w-[100%] flex items-center justify-center'>
                        <button type='submit' className='btn__form py-4 px-12'>
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
