"use client";
import Link from 'next/link'
import { FaFacebook, FaWhatsapp, FaYoutube } from 'react-icons/fa6'
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoInstagram } from 'react-icons/io5';



export default function Contact() {
  return (
    <>
     {/* CONTACT */}
    <section className='w-[100%] py-[4rem]'>
        <div className='mx-auto w-[90%] grid lg:grid-cols-2 grid-cols-1 gap-4'>
            <div className='w-[100%] lg:aspect-auto aspect-[5/3] bg-slate-300 flex items-center justify-center'>
                Google Maps</div>
            <div className='w-[100%] p-4'>
                <h3 className='text-[2rem] mb-4'>Contact Form</h3>
                {/*  */}
                <div className='w-[100%] mb-3'>
                    <p className='mb-1 font-light'>Name:</p>
                    <input type='text' placeholder='Enter your Name here...' className='w-[100%] rounded-lg py-2 px-3 outline-none border border-slate-200' />
                </div>
                {/*  */}
                <div className='w-[100%] mb-3'>
                    <p className='mb-1 font-light'>
                        Email:<span className='text-red-600'>*</span>
                    </p>
                    <input type='text' placeholder='Enter your Email here...' className='w-[100%] rounded-lg py-2 px-3 outline-none border border-slate-200' />
                </div>
                {/*  */}
                <div className='w-[100%] mb-3'>
                    <p className='mb-1 font-light'>
                        Message:<span className='text-red-600'>*</span>
                    </p>
                    <textarea type='text' placeholder='Enter your Message here...' className='w-[100%] h-[8rem] rounded-lg py-2 px-3 outline-none border border-slate-200'></textarea>
                </div>
                <div className='flex items-center justify-center'>
                    <button 
                        type='submit' 
                        className='transition-all ease-in-out text-slate-600 hover:text-white border border-slate-500 hover:bg-gradient-to-br hover:from-slate-500 hover:to-slate-800 rounded-xl px-8 py-4'>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </section>

    <section className='w-[100%] pb-[4rem]'>
        <div className='mx-auto w-[90%] grid lg:grid-cols-3 grid-cols-1 gap-8'>
            {/*  */}
            <div className='w-[100%] bg-white drop-shadow-lg p-4'>
                <h3 className='text-[1.6rem] mb-2'>Address</h3>
                <p className='text-lg font-light mb-4'>
                    Meydan Grandstand, <br /> 
                    6th Floor,  <br />
                    Meydon Road, <br />
                    Nad Al Sheba, <br />
                    Dubai, UAE. <br />
                </p>
            </div>
            {/*  */}
            <div className='w-[100%] bg-white drop-shadow-lg p-4'>
                <h3 className='text-[1.6rem] mb-2'>Contact Details</h3>
                <ul className='font-light'>
                    <li className='flex text-lg items-center justify-start gap-2 mb-2'>
                        <FaPhoneAlt /> <span>00971 4447 4669</span>
                    </li>
                    <li className='flex text-lg items-center justify-start gap-2 mb-2'>
                        <MdOutlineEmail /> <span>info@africacapitalclub.com</span>
                    </li>
                </ul>
            </div>
            {/*  */}
            <div className='w-[100%] bg-white drop-shadow-lg p-4'>
                <h3 className='text-[1.6rem] mb-2'>Social Media Links</h3>
                <div className='flex text-slate-800 items-center justify-start gap-3 text-3xl'>
                    <Link href='#' className='hover:scale-110 transition-all ease-in-out'>
                        <FaFacebook className='text-blue-700' /></Link>
                    <Link href='#' className='hover:scale-110 transition-all ease-in-out'>
                        <IoLogoInstagram className='text-pink-700' /></Link>
                    <Link href='#' className='hover:scale-110 transition-all ease-in-out'>
                        <FaYoutube className='text-red-600' /></Link>
                    <Link href='#' className='hover:scale-110 transition-all ease-in-out'>
                        <FaWhatsapp className='text-green-600' /></Link>
                </div>
            </div>
        </div>
    </section>

    </>
  )
}
