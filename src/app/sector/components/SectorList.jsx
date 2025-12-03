"use client"
import { baseURL } from '@/api/baseURL';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5';



export default function SectorList({ dbData }) {
    console.log('dbData')
    console.log(dbData)
    const [data, setData] = useState(dbData?.data);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
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
        const result = await axios.get(`${baseURL}sector`)
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
        const result = await axios.get(`${baseURL}sector?search=${search}`)
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
    <section className='w-[100%] h-auto pt-[4rem] pb-[6rem]'>
        <div className='mx-auto w-[90%]'>
            <section className='w-[100%] pb-[2rem]'>
                <h3 className='pt-[2rem] text-[2.4rem] leading-tight text-center mb-2'>
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
            </section>

            {/*  */}
            {data.length > 0 ?
            <>
            <section className='w-[100%] grid grid-cols-4 gap-8'>
                {/* COLS */}
                {data.map((i, key) => (
                    <div key={key} className='group transition-all ease-in-out bg-white rounded-lg drop-shadow-md hover:drop-shadow-lg p-4'>
                        <div className='w-[100%] mb-3 bg-slate-200 aspect-[4/3] rounded-lg overflow-hidden'>
                            <img 
                            src={baseURL + i.portrait} 
                            className='w-[100%] h-[100%] object-cover ease-in-out transition-all group-hover:scale-110' 
                            alt='Image' />
                        </div>
                        <div className='font-light text-lg mb-2'>
                            <h3 className='leading-none'>{i.name}</h3>
                        </div>
                        <div className='pt-3 mb-4'>
                            <Link href={`/sector/${i.slug}`} className='px-6 py-3 text-white rounded-lg bg-gradient-to-br from-green-600 to-cyan-700 hover:bg-gradient-to-br hover:to-green-600 hover:from-cyan-700'>
                            Click for more.
                            </Link>
                        </div>
                    </div>
                ))}
            </section>
            </>
            :
            <>
            <section className='w-[100%] py-[4rem]'>
                <h4 className='text-[2.5rem] font-light flex items-center justify-center'>
                    No data available.
                </h4>
            </section>
            </>
            }

        </div>
    </section>
    </>  
    )
}
