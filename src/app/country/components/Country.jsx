"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import MapData from '@/data/MapData.json'
import { IoSearchOutline } from 'react-icons/io5';
import { baseURL } from '@/api/baseURL';
import axios from 'axios';




export default function Country({ dbData }) {
    const [data, setData] = useState(dbData?.data);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
  
     /* GET DATA */
     async function getData() {
      try{
        const result = await axios.get(`${baseURL}country-all`)
        .then((response) => {
          setData(response.data.data)
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
        const result = await axios.get(`${baseURL}country-all?search=${search}`)
        .then((response) => {
          setData(response.data.data)
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

    <section className='w-[100%] pt-[4rem] pb-[6rem]'>
        <div className='mx-auto w-[90%]'>
           
            {/* SEARCH */}
            <section className='w-[100%] pb-[3rem]'>
                <h3 className='text-[3rem] text-center font-medium pt-[3rem] pb-4 leading-tight'>
                    Search Country:
                </h3>
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
            </section>

            <div className='flex items-end justify-end'>
                <p className='text-green-800 pb-4'>{data.length} Countries.</p>
            </div>

            <section className='w-[100%] grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-8'>
                {data.length > 0 ?
                    data.map((i, key) => (
                    <div key={key} className='group w-[100%] rounded-xl bg-white p-4 drop-shadow hover:drop-shadow-lg transition-all ease-in-out'>
                        <div className='bg-green-200 rounded-xl overflow-hidden w-[100%] aspect-[10/7] mb-1'>
                            <img 
                            src={baseURL + i.portrait} 
                            className='w-[100%] h-[100%] transition-all ease-in-out group-hover:scale-110 object-cover' />
                        </div>
                        <div>
                            <Link href={`/country/${i.slug}`} className='text-green-700 underline hover:no-underline'>
                                {i.name}
                            </Link>
                            <p className='text-sm italic font-light'>
                                {i?.opportunities?.length} Opportunities
                            </p>
                        </div>
                    </div>
                ))
                :   
                <div className='text-[2.6rem] font-light py-[3rem] flex items-center justify-center'>
                    Data is not Available.
                </div>
                }
            </section>

           

            
        </div>
    </section>
    </>
  )
}
