"use client";
import { baseURL } from '@/api/baseURL';
import { trimString } from '@/libs/trimString';
import { tokenMembership } from '@/tokens/tokenMembership';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong, FaCaretRight } from 'react-icons/fa6';
import { IoSearchOutline } from "react-icons/io5";


export default function Opportunity({ dbData, sectorsData }) {
  const [data, setData] = useState(dbData?.data);
  const [sectors, setSectors] = useState(sectorsData?.data);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const { getMembershipToken } = tokenMembership()
  /* PAGINATION */
  const [nextURL, setNextURL] = useState(dbData?.links.prev);
  const [prevURL, setPrevURL] = useState(dbData?.links.next);
  /* PAGINATION DATA */
  async function paginationHandler(url) {
    try{
       const result = await axios.get(url)
       .then((response) => {
          setData(response.data.data)
          setPrevURL(response.data.links.prev)
          setNextURL(response.data.links.next)
       })
    } catch (error) {
       console.error(`Error: ${error}`)
    }     
  }

   /* GET DATA */
   async function getData() {
    try{
      const result = await axios.get(`${baseURL}opportunity`)
      .then((response) => {
        setData(response.data.data)
        setPrevURL(response.data.links.prev)
        setNextURL(response.data.links.next)
      })
    } catch (error) {
      console.error(`Error: ${error}`);
      console.error(`Error Message: ${error.message}`);
      console.error(`Error Response: ${error.response}`);
    }   
  }   
  
  /* search DATA */
  async function searchData() {
    if(search === ''){
      getData();
      setIsSearch(false);
      return;
    }
    try{
      const result = await axios.get(`${baseURL}opportunity?search=${search}`)
      .then((response) => {
        setData(response.data.data)
        setPrevURL(response.data.links.prev)
        setNextURL(response.data.links.next)
        setIsSearch(false);
      })
    } catch (error) {
      console.error(`Error: ${error}`)
      console.error(`Error Message: ${error.message}`);
      console.error(`Error Response: ${error.response}`);
      setIsSearch(false);
    }   
  } 

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    isSearch === true && searchData();
  }, [isSearch]);




  return (
    <>
    <section className='w-[100%] pt-[4rem] pb-[8rem]'>
        <div className='mx-auto w-[90%]'>
          {/*  */}
          <section className='w-[100%] flex md:flex-row flex-col items-start justify-start gap-6'>
            {/* SIDEBAR */}
            <div className='lg:w-[20%] md:w-[30%] w-[100%] px-2 py-[2rem] drop-shadow-md bg-gradient-to-br from-white to-slate-200'>
                <h3 className='text-[2rem]'>Sector</h3>
                { sectors.length > 0 &&
                  <ul className='ml-2'>
                    {sectors.map((i, key) => (
                      <li key={key} className='group mb-2'>
                          <Link href={`/sector/${i.slug}`} className='flex items-center justify-start gap-2 group-hover:translate-x-1 transition-all ease-in-out'>
                              <FaCaretRight className='group-hover:translate-x-1 transition-all ease-in-out' /> 
                              {i.name}
                          </Link>
                      </li>
                    ))}
                  </ul>
                }
            </div>
            {/* MAIN */}
            <div className='lg:w-[80%] md:w-[70%] w-[100%]'>
              <section className='w-[100%]'>
                <h3 className='pt-[2rem] text-[2.4rem] leading-tight text-center mb-1'>
                  Search for an Investment Opportunity:
                </h3>
                {/* SEARCH */}
                <div className='mx-auto w-[90%] flex items-center justify-start'>
                    <input 
                    type='text' 
                    name='search'
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Enter the Name here...'
                    className='md:w-[85%] w-[80%] font-light outline-none rounded-l-full border-y border-l border-slate-300 py-4 px-7' />
                    <button 
                      onClick={() => setIsSearch(true)}
                      className='md:w-[15%] w-[20%] text-center flex items-center justify-center rounded-r-full border border-slate-300 py-4 px-5'>
                      {isSearch == true 
                      ? <span className='animate-pulse w-[20px] h-[20px] rounded-full bg-slate-900'></span> 
                      : <IoSearchOutline className='text-[1.59rem] ' />
                      }
                    </button>
                </div>

                {/* CONTENT */}
                <div>
                  {/*  */}
                  { data.length > 0 ?
                    data.map((i, key) => (
                    <div key={key} className='px-5 py-6 mb-6 flex md:flex-row flex-col items-center justify-start gap-8 transition-all ease-in-out bg-white drop-shadow-md hover:drop-shadow-lg'>
                      <div className='w-[100%] lg:w-[25%] drop-shadow-md overflow-hidden aspect-[5/4] bg-slate-300 rounded-xl'>
                        <img src={baseURL + i?.opportunity_images[0]?.image} className='w-[100%] h-[100%] object-cover' />
                      </div>
                      <div className='w-[100%] lg:w-[75%] flex md:flex-row flex-col items-center justify-start gap-4'>
                        {/*  */}
                        <div className='w-[100%] lg:w-[80%]'>
                          <h4 className='md:text-[2rem] text-[2rem] font-light'>{i.name}</h4>
                          <p className='text-lg font-light mb-1'>
                            {i.short_description ? trimString(i.short_description, 120) : 'Not added.'}
                          </p>
                          { i?.sectors &&
                            <p className='mb-1'>
                              { i?.sectors.map((a, key) => ( 
                                  key+1 < i.sectors.length ? a.name + ',' : a.name      
                              )) 
                              }
                            </p>
                          }
                          <p className='text-green-800 italic'>{i?.country?.name}</p>
                        </div>
                        {/*  */}
                        <div className='w-[100%] lg:w-[20%] flex items-center justify-center'>
                        { getMembershipToken() ? 
                            <Link href={`/opportunity/${i.id}`} className='py-3 px-6 text-sm transition-all ease-in-out bg-white bg-gradient-to-br hover:from-slate-300 hover:to-slate-800 hover:text-white border border-slate-500 text-slate-600 hover:border-slate-500'>
                            View More</Link>
                            :
                            <Link href={`/membership`} className='py-3 px-6 text-sm transition-all ease-in-out bg-white bg-gradient-to-br hover:from-slate-300 hover:to-slate-800 hover:text-white border border-slate-500 text-slate-600 hover:border-slate-500'>
                            Become a Member to view more.</Link>
                          }
                        </div>
                      </div>
                    </div>
                  ))
                  :
                  <div className='w-[100%] py-[3rem]'>
                    <h4 className='text-[2.5rem] font-light flex items-center justify-center'>
                      No data available.
                    </h4>
                  </div>
                  }
                 
                </div>

              </section>
            </div>
          </section>
         

        </div>

        {/* PAGINATION */}
        <div className='mx-auto w-[90%] flex items-center justify-end gap-3 pt-[2rem]'>
            {prevURL &&
            <button 
              onClick={() => paginationHandler(prevURL)}
                className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-slate-500 to-slate-800'>
                <FaArrowLeftLong className='text-slate-600 group-hover:-translate-x-2 duration-200 transition-all ease-in-out ' /> 
                Prev
            </button>
            }
            {nextURL &&
            <button
              onClick={() => paginationHandler(nextURL)}
                className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-slate-500 to-slate-800'>
                Next <FaArrowRightLong className='text-slate-600 group-hover:translate-x-2 duration-200 transition-all ease-in-out' />
            </button>
            }
        </div>

    </section>
    </>
  )
}
