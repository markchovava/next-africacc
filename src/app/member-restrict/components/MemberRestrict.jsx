"use client";
import { tokenAuth } from '@/tokens/tokenAuth';
import { tokenMembership } from '@/tokens/tokenMembership';
import Link from 'next/link';
import React from 'react';


export default function MemberRestrict() {
    const { getAuthToken } = tokenAuth();
    const { getMembershipToken } = tokenMembership();
  return (
    <>
    <section className='w-[100%] pt-[5rem] pb-[8rem]'>
        <div className='mx-auto w-[94%]'>
            <h4 className='leading-tight text-[3rem] font-light mb-4'>
                Sorry, you are required to be register as a Member first before you view this information.</h4>
            <div className='flex items-center justify-start gap-5 text-lg'>
                
            {getAuthToken() ? 
                <>
                <Link href='/membership'>
                    <button className='px-8 py-6 rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-800 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-800 hover:drop-shadow-lg'>
                        Become a member
                    </button>
                </Link>
                </> 
                : 
                <>
                <Link href='/login'>
                <button className='px-8 py-6 rounded-xl text-white bg-gradient-to-br from-green-500 to-green-800 hover:bg-gradient-to-br hover:to-green-500 hover:from-cyan-800 hover:drop-shadow-lg'>
                    Login as a Member
                </button>
                </Link>
                </>
                }
               
            </div>
        </div>
    </section>
    </>
  )
}




