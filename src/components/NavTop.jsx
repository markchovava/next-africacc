"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { removeAuthCookie } from '@/cookie/authCookieClient';
import { removeRoleCookie } from '@/cookie/roleCookieClient';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import { tokenRole } from '@/tokens/tokenRole';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaAngleDown } from "react-icons/fa";
import { toast } from 'react-toastify';



export default function NavTop() {
    const router = useRouter();
    const { getAuthToken, removeAuthToken } = tokenAuth();
    const { removeRoleToken } = tokenRole();
    const [isLogout, setIsLogout] = useState(false);
    const [isActive, setIsActive] = useState({
        zero: false,
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false,
        nine: false,
        ten: false,
        eleven: false,
        twelve: false,
        thirteen: false,
    })
 
  

  return (
    <section className="hidden lg:block w-[100%] text-white bg-green-800 relative z-50">
        <div className="w-[94%] mx-auto px-3 py-2 flex justify-between items-center">
            {/* ADMINISTRATION LINKS */}
            <ul className="flex items-center justify-start gap-4">
                {/* SETTINGS */}
                <li className="relative z-20">
                    <button 
                        onClick={() => setIsActive({one: !isActive.one})} 
                        className="flex items-center justify-start gap-1">
                        Settings <FaAngleDown /> 
                    </button>
                    <ul className={`absolute z-100 ${isActive.one == true ? 'block' : 'hidden'} rounded-b-lg overflow-hidden drop-shadow-md top-[130%] transition-all ease-in-out duration-150 left-[-0.5rem] w-[10rem] border border-white bg-green-800`}>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-1'>
                            <Link href='/admin/role' className=''>Roles</Link>
                        </li>
                    </ul>
                </li>
                {/* USERS */}
                <li className="relative z-20">
                    <button 
                        onClick={() => setIsActive({two: !isActive.two})} 
                        className="flex items-center justify-start gap-1">
                        Users & QR Codes <FaAngleDown /> </button>
                    <ul className={`absolute z-100 ${isActive.two == true ? 'block' : 'hidden'} rounded-b-lg overflow-hidden drop-shadow-md top-[130%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-green-800`}>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/user' className=''>User List</Link>
                        </li>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/qrcode' className=''>QRCode List</Link>
                        </li>
                    </ul>
                </li>
                {/* MEMBERSHIPS */}
                <li className="relative z-20">
                    <button 
                        onClick={() => setIsActive({ten: !isActive.ten})} 
                        className="flex items-center justify-start gap-1">
                        Memberships <FaAngleDown /> </button>
                    <ul className={`absolute z-100 ${isActive.ten == true ? 'block' : 'hidden'} rounded-b-lg overflow-hidden drop-shadow-md top-[130%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-green-800`}>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/membership' className=''>Membership List</Link>
                        </li>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/membership/order' className=''>Member Subscriptions</Link>
                        </li>
                    </ul>
                </li>
                {/* COUNTRY */}
                <li className="relative z-20">
                    <button 
                        onClick={() => setIsActive({three: !isActive.three})} 
                        className="flex items-center justify-start gap-1">
                        Countries <FaAngleDown /> </button>
                    <ul className={`absolute z-100 ${isActive.three == true ? 'block' : 'hidden'} rounded-b-lg overflow-hidden drop-shadow-md top-[130%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-green-800`}>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/country/add' className='leading-tight'>Add Country</Link>
                        </li>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/country' className='leading-tight'>Country List</Link>
                        </li>
                    </ul>
                </li>
                {/* SECTOR */}
                <li className="relative z-20">
                    <button 
                        onClick={() => setIsActive({four: !isActive.four})} 
                        className="flex items-center justify-start gap-1">
                        Sectors <FaAngleDown /> </button>
                    <ul className={`absolute z-100 ${isActive.four == true ? 'block' : 'hidden'} rounded-b-lg overflow-hidden drop-shadow-md top-[130%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-green-800`}>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/sector/add' className='leading-tight'>Add Sector</Link>
                        </li>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/sector' className='leading-tight'>Sector List</Link>
                        </li>
                    </ul>
                </li>
                {/* OPPORTUNITY */}
                <li className="relative z-20">
                    <button
                        onClick={() => setIsActive({five: !isActive.five})} 
                        className="flex items-center justify-start gap-1">
                        Opportunities <FaAngleDown /> </button> 
                    <ul className={`absolute z-100 ${isActive.five == true ? 'block' : 'hidden'} rounded-b-lg overflow-hidden drop-shadow-md top-[130%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-green-800`}>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/opportunity/add' className='leading-tight'>Add Opportunity</Link>
                        </li>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/opportunity' className='leading-tight'>Opportunity List</Link>
                        </li>
                    </ul>
                </li>
                {/* EVENTS & NEWS */}
                <li className="relative z-20">
                    <button
                        onClick={() => setIsActive({eight: !isActive.eight})} 
                        className="flex items-center justify-start gap-1">
                        Event & News <FaAngleDown /> </button> 
                    <ul className={`absolute z-100 ${isActive.eight == true ? 'block' : 'hidden'} rounded-b-lg overflow-hidden drop-shadow-md top-[130%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-green-800`}>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/news' className='leading-tight'>News List</Link>
                        </li>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/event' className='leading-tight'>Events List</Link>
                        </li>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/event/payment' className='leading-tight'>Events Payments</Link>
                        </li>
                    </ul>
                </li>
                {/* INVESTMENTS */}
                <li className="relative z-20">
                    <button
                        onClick={() => setIsActive({nine: !isActive.nine})} 
                        className="flex items-center justify-start gap-1">
                        Investments <FaAngleDown /> </button> 
                    <ul className={`absolute z-100 ${isActive.nine == true ? 'block' : 'hidden'} rounded-b-lg overflow-hidden drop-shadow-md top-[130%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-green-800`}>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/investment' className='leading-tight'>Investment List</Link>
                        </li>
                    </ul>
                </li>
                {/* TESTIMONIALS */}
                <li className="relative z-20">
                    <button
                        onClick={() => setIsActive({twelve: !isActive.twelve})} 
                        className="flex items-center justify-start gap-1">
                        Testimonials <FaAngleDown /> 
                    </button> 
                    <ul className={`absolute z-100 ${isActive.twelve == true ? 'block' : 'hidden'} rounded-b-lg overflow-hidden drop-shadow-md top-[130%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-green-800`}>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/testimonial/add' className='leading-tight'>Add Testimonial</Link>
                        </li>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/testimonial' className='leading-tight'>Testimonial List</Link>
                        </li>
                    </ul>
                </li>
                {/* PARTNERS */}
                <li className="relative z-20">
                    <button
                        onClick={() => setIsActive({thirteen: !isActive.thirteen})} 
                        className="flex items-center justify-start gap-1">
                        Partners <FaAngleDown /> 
                    </button> 
                    <ul className={`absolute z-100 ${isActive.thirteen == true ? 'block' : 'hidden'} rounded-b-lg overflow-hidden drop-shadow-md top-[130%] transition-all ease-in-out duration-150 left-[-0.5rem]  w-[10rem] border border-white bg-green-800`}>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/partner/add' className='leading-tight'>Add Partner</Link>
                        </li>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/partner' className='leading-tight'>Partners List</Link>
                        </li>
                    </ul>
                </li>
               
            </ul>
            
            <ul className="flex items-center justify-start gap-4">
                {/* PROFILE */}
                <li className="relative z-20">
                    <button
                        onClick={() => setIsActive({seven: !isActive.seven})} 
                        className="flex items-center justify-start gap-1">
                        Profile <FaAngleDown /> </button> 
                    <ul className={`absolute z-120 ${isActive.seven == true ? 'block' : 'hidden'} rounded-b-lg overflow-hidden drop-shadow-md top-[130%] transition-all ease-in-out duration-150 right-[-0.5rem]  w-[10rem] border border-white bg-green-800`}>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/profile' className=''>Profile</Link>
                        </li>
                        <li className='w-[100%] hover:bg-green-900 px-3 py-2'>
                            <Link href='/admin/password' className=''>Password</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        
    </section>
  )
}
