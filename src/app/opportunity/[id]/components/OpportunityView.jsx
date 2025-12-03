"use client";
import { baseURL } from '@/api/baseURL';
import { tokenMembership } from '@/tokens/tokenMembership';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";



export default function OpportunityView({id, dbData}) {
    const [data, setData] = useState(dbData?.data);
    const [isActive, setActive] = useState(dbData?.data?.opportunity_images[0]?.image)
    const { getMembershipToken } = tokenMembership();



  return (
    <>
    <section className='w-[100%] pt-[5rem] pb-[6rem]'>
        {/*  */}
        <div className='w-[90%] mx-auto flex lg:flex-row flex-col justify-start items-center gap-6 lg:mb-[2rem] mb-[1rem]'>
            <div className='lg:w-[45%] w-[100%]'>
                <div className='w-[100%] aspect-[4/3] rounded-xl overflow-hidden bg-slate-400 mb-4'>
                    <img src={baseURL + isActive} className='w-[100%] h-[100%] object-cover' />
                </div>
                { data?.opportunity_images &&
                    <ul className='w-[100%] grid grid-cols-4 gap-4'>
                        {data?.opportunity_images?.map((i, key) => (
                            <li key={key} 
                                onClick={() => setActive(i.image)} 
                                className='w-[100%] bg-blue-500 aspect-[5/4] overflow-hidden rounded-xl '>
                                <img src={baseURL + i.image} className='w-[100%] h-[100%] object-cover transition-all ease-in-out hover:scale-110' />
                            </li>

                        ))}
                        
                    </ul>
                }
            </div>
            <div className='lg:w-[55%] w-[100%] p-[1rem]'>
                <h4 className='text-[2.4rem] leading-tight mb-4'>
                    {data?.name}
                </h4>
                {data?.sectors?.length > 0 &&
                <div className='mb-4'>
                    <p className='font-light'>Sectors</p>
                    <p className='text-lg'>
                    { data?.sectors.map((i, key) => ( 
                        key+1 < data.sectors.length ? i.name + ',' : i.name      
                    )) 
                    }
                    </p>
                </div>
                }
                <p className='font-light mb-3 text-lg'>
                    {data?.short_description}
                </p>
                <div className='flex items-center justify-start gap-2 mb-3'>
                    <p className='font-light'>Status:</p>
                    <p className='bg-cyan-700 text-white py-1 px-3 rounded-xl'>
                        {data?.status}
                    </p>
                </div>
                
                {getMembershipToken() &&
                <>
                    <div className='mb-4'>
                        <p className='font-light leading-none mb-1'> Investments Amount:</p>
                        <p className='text-[2rem] leading-none text-green-700'> 
                            {data?.amount ? data?.amount : 'Not added.'}
                        </p>
                    </div>
                    <div className='mb-4'>
                        <p className='font-light leading-none mb-1'>Expected Return:</p>
                        <p className='text-[2rem] leading-none text-blue-700'> 
                            {data?.expected_return ? data?.expected_return : 'Not added.'}
                        </p>
                    </div>
                </>
                }
                <div className='mb-6'>
                    <p className='font-light leading-none mb-2'>Country:</p>
                    <p className='font-bold leading-none'>
                        {data?.country?.name}
                    </p>
                </div>
            </div>
        </div>
        {/*  */}
        {getMembershipToken() &&
        <>
            <div className='mx-auto lg:w-[70%] w-[80%] text-lg font-light'>
                <h3 className='font-light text-[1.6rem] leading-none mb-3'>Description</h3>
                <div className='article text-lg' dangerouslySetInnerHTML={{ __html: data?.description }}></div>
            </div>
            <div className='pt-[2rem] pb-[2rem] flex items-center justify-center'>
                <Link href={`/opportunity/investment/edit/${data.id}`}>
                <button className='flex items-center justify-center gap-2 group transition-all ease-in-out drop-shadow-md rounded-xl py-6 px-12 bg-gradient-to-br from-yellow-400 to-yellow-800 text-white hover:bg-gradient-to-br hover:from-yellow-500 hover:to-yellow-900'>
                    Invest <FaArrowRightLong className='group-hover:translate-x-1 transition-all ease-in-out' />
                </button>
                </Link>
            </div>
        </>
        }
    </section>
    </>
  )
}
