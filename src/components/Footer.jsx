import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { FaCaretRight, FaFacebook, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { IoLogoInstagram } from 'react-icons/io5';

export default function Footer() {
  return (
    <>
        <section className='w-[100%] text-white bg-gradient-to-br from-green-700 to-green-950'>
            <div className='mx-auto pt-[4rem] pb-[2rem] w-[90%] grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-8'>
                <div className='w-[100%]'>
                    <h3 className='font-medium text-xl tracking-wider mb-2'>
                        About Africa Capital Club</h3>
                    <ul className='ml-2'>
                        <li className='group'>
                            <Link href='/about' className='flex items-center justify-start gap-2 group-hover:translate-x-1 transition-all ease-in-out'>
                                <FaCaretRight className='group-hover:translate-x-1 transition-all ease-in-out' /> 
                                About Us 
                            </Link>
                        </li>
                        <li className='group'>
                            <Link href='/opportunity' className='flex items-center justify-start gap-2 group-hover:translate-x-1 transition-all ease-in-out'>
                                <FaCaretRight className='group-hover:translate-x-1 transition-all ease-in-out' /> 
                                Opportunities
                            </Link>
                        </li>
                        <li className='group'>
                            <Link href='/country' className='flex items-center justify-start gap-2 group-hover:translate-x-1 transition-all ease-in-out'>
                                <FaCaretRight className='group-hover:translate-x-1 transition-all ease-in-out' /> 
                                Countries
                            </Link>
                        </li>
                        <li className='group'>
                            <Link href='/privacy-policy' className='flex items-center justify-start gap-2 group-hover:translate-x-1 transition-all ease-in-out'>
                                <FaCaretRight className='group-hover:translate-x-1 transition-all ease-in-out' /> 
                                Privacy Policy
                            </Link>
                        </li>
                        <li className='group'>
                            <Link href='/contact' className='flex items-center justify-start gap-2 group-hover:translate-x-1 transition-all ease-in-out'>
                                <FaCaretRight className='group-hover:translate-x-1 transition-all ease-in-out' /> 
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='w-[100%]'>
                    <h3 className='font-medium text-xl tracking-wider mb-2'>
                        Resources</h3>
                    <ul className='ml-2'>
                        <li className='group'>
                            <Link href='/membership' className='flex items-center justify-start gap-2 group-hover:translate-x-1 transition-all ease-in-out'>
                                <FaCaretRight className='group-hover:translate-x-1 transition-all ease-in-out' /> 
                                Membership </Link></li>
                        <li className='group'>
                            <Link href='/partner' className='flex items-center justify-start gap-2 group-hover:translate-x-1 transition-all ease-in-out'>
                                <FaCaretRight className='group-hover:translate-x-1 transition-all ease-in-out' /> 
                                Partners
                            </Link>
                        </li>
                        <li className='group'>
                            <Link href='/news' className='flex items-center justify-start gap-2 group-hover:translate-x-1 transition-all ease-in-out'>
                                <FaCaretRight className='group-hover:translate-x-1 transition-all ease-in-out' /> 
                                 News
                            </Link>
                        </li>
                        <li className='group'>
                            <Link href='/event' className='flex items-center justify-start gap-2 group-hover:translate-x-1 transition-all ease-in-out'>
                                <FaCaretRight className='group-hover:translate-x-1 transition-all ease-in-out' /> 
                                Events</Link></li>
                    </ul>
                </div>
                <div className='w-[100%]'>
                    <h3 className=' text-lg tracking-wider mb-2'>
                        00971 4447 4669</h3>
                    <h3 className='text-lg tracking-wider mb-2'>
                        info@africacapitalclub.com
                    </h3>
                    <p>
                        Meydan Grandstand, <br /> 
                        6th Floor,  <br />
                        Meydon Road, <br />
                        Nad Al Sheba, <br />
                        Dubai, UAE. <br />
                    </p>
                </div>
                <div className='w-[100%]'>
                    <div className='flex flex-col justify-center items-center mb-2'>
                        <div className='aspect-[1/1] w-[6.5rem]'>
                            <img src='/assets/logo/small.png' className='w-[100%] h-[100%] object-fill' alt='Logo' />
                        </div>
                        <div>
                            <h2 className='uppercase text-[1.6rem] font-medium'>
                                Africa Capital Club</h2>
                            <p className='tracking-wide text-center'>Africa Economic & Investment Promotion Hub</p>
                        </div>
                    </div>
                    <div className='flex text-slate-800 items-center justify-center gap-3 text-3xl'>
                        <Link href='#' className='hover:scale-110 transition-all ease-in-out'>
                            <FaFacebook style={{fill: 'white'}} /></Link>
                        <Link href='#' className='hover:scale-110 transition-all ease-in-out'>
                            <IoLogoInstagram style={{fill: 'white'}} /></Link>
                        <Link href='#' className='hover:scale-110 transition-all ease-in-out'>
                            <FaYoutube style={{fill: 'white'}} /></Link>
                        <Link href='#' className='hover:scale-110 transition-all ease-in-out'>
                            <FaWhatsapp style={{fill: 'white'}} /></Link>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}


