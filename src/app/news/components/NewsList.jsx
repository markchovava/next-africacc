"use client";
import { baseURL } from '@/api/baseURL';
import { formatDate } from '@/libs/formatDate';
import { tokenMembership } from '@/tokens/tokenMembership';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { IoSearchOutline } from "react-icons/io5";


export default function NewsList({ dbData }) {
  const [data, setData] = useState(dbData?.data);
  const [meta, setMeta] = useState(dbData?.meta);
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [nextURL, setNextURL] = useState(dbData?.links?.next)
  const [prevURL, setPrevURL] = useState(dbData?.links?.prev)
  const { getMembershipToken } = tokenMembership();
  /* PAGINATION DATA */
  async function paginationHandler(url) {
    try{
       const result = await axios.get(url)
       .then((response) => {
          setData(response.data.data)
          setMeta(response.data.meta)
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
      const result = await axios.get(`${baseURL}news`)
      .then((response) => {
        setData(response.data.data)
        setMeta(response.data.meta)
        setPrevURL(response.data.links.prev)
        setNextURL(response.data.links.next)
      })
    } catch (error) {
      console.error(`Error: ${error}`);
      console.error(`Error Message: ${error.message}`);
      console.error(`Error Response: ${error.response}`);
    }   
  } 

   /* SEARCH DATA */
   async function searchData() {
    if(search === ''){
      getData();
      setIsSearch(false);
      return;
    }
    try{
      const result = await axios.get(`${baseURL}news?search=${search}`)
      .then((response) => {
        setData(response.data.data)
        setMeta(response.data.meta)
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
    isSearch == true && searchData();
  }, [isSearch]);



  return (
    <>
    {/* EVENTS */}
    <section className="w-[100%] pt-[6rem] pb-[2rem]">
        <div className='w-[90%] mx-auto'>
          {/* SEARCH */}
          <section className='lg:pt-[5rem] pt-[3rem] pb-[2rem] flex flex-col items-center justify-center'>
            <h3 className='lg:text-[3rem] text-[2.4rem] text-center mb-4 leading-none'>Search News and Updates</h3>
            <div className='lg:w-[80%] w-[100%] flex items-center justify-center'>
                <input 
                type='text'
                name='search' 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Enter Title here...' 
                className='lg:w-[90%] w-[80%] px-5 h-[3.6rem] outline-none border-y border-l border-slate-300 rounded-l-full' />
                <button
                type='submit' 
                onClick={ () => setIsSearch(true) }
                className='lg:w-[10%] w-[20%] h-[3.6rem] rounded-r-full p-3 border border-slate-300 h-inherit flex items-center justify-center'>
                { isSearch === true 
                ? <span className='animate-pulse w-[18px] h-[18px] rounded-full bg-slate-700'></span> 
                : <IoSearchOutline className='text-[1.8rem] text-slate-700' />
                }
                </button>
            </div>
          </section>
          
          <div className='w-[100%] flex items-center justify-between gap-4'>
            <h3 className="lg:text-[2.5rem] text-[1.8rem] leading-tight mb-3">
              The latest news and updates
            </h3>
          </div>

          <section className="w-[100%] grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-8">
            {/*  */}
            {data.map((i, key) => (
              <div key={key} className="group w-[100%] p-4 bg-white drop-shadow-md">
                <div className="w-[100%] aspect-[2/1] overflow-hidden mb-4">
                  <img
                    src={baseURL + i.image} 
                    className="w-[100%] h-[100%] object-cover group-hover:scale-105 transition-all ease-in-out"
                    alt='Image' />
                </div>
                <p className="text-md mb-3">{formatDate(i.created_at)}</p>
                <h5 className='text-2xl font-light leading-none mb-4'>
                  {i.title}
                </h5>
                <div className="flex mb-4">
                  <Link 
                    href={getMembershipToken() ? `/news/${i.id}` : '/member-restrict'} 
                    className="group text-green-800 px-6 py-4 border border-green-800 flex items-center justify-center gap-2 transition-all ease-in-out ">
                    Click More. 
                    <FaArrowRightLong 
                    className="group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
                  </Link>
                </div>
              </div>
            ))}
            
          </section>

        </div>


        {/* PAGINATION */}
        <section className='w-[100%] mt-[2rem] mb-[4rem]'>
            <div className='mx-auto text-lg w-[90%] flex items-center justify-end gap-3'>
                    {prevURL &&
                    <button 
                        onClick={() => paginationHandler(prevURL)}
                        className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-slate-500 to-slate-700'>
                        <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-slate-500' /> 
                        Prev 
                    </button>
                    }
                    {nextURL &&
                    <button
                    onClick={() => paginationHandler(nextURL)}
                    className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-slate-500 to-slate-700'>
                        Next <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out text-slate-500' />
                    </button>
                    }
                
            </div>
        </section>

        
    </section>
    </>
  )
}
