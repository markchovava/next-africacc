"use client";
import { axiosClientAPI } from '@/api/axiosClientAPI';
import Loader from '@/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link';
import React, { useEffect, useState, useTransition } from 'react'
import { FaSearch } from 'react-icons/fa';
import { FaArrowLeftLong, FaArrowRightLong, FaEye } from 'react-icons/fa6';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import GenerateQrCodeModal from './GenerateQrCodeModal';
import { toast } from 'react-toastify';
import { toastifyDarkBounce } from '@/libs/toastify';
import { MainContextState } from '@/context/MainContext';
import { qrcodeDeleteApiAction, qrcodeListApiAction, qrcodeListByStatusApiAction, qrcodePaginationApiAction, qrcodeSearchApiAction } from '@/actions/qrcodeActions';



export default function QRCodeList({ dbData }) {
    const { qrcodeState, qrcodeDispatch } = MainContextState();
    const [isPending, startTransition] = useTransition();
    const [isStatus, setIsStatus] = useState(false);
    const [status, setStatus] = useState();
    const [isModal, setIsModal] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
      qrcodeDispatch({type: 'ADD_DATA', payload: {
        items: dbData?.data,
        prevURL: dbData?.links?.prev,
        nextURL: dbData?.links?.next,
      }});
    }, []);

    /* PAGINATION DATA */
    async function paginationHandler(url) {
      try{
        const res = await qrcodePaginationApiAction(url)
        qrcodeDispatch({type: 'ADD_DATA', payload: {
            items: res?.data,
            prevURL: res?.links?.prev,
            nextURL: res?.links?.next,
        }});
    } catch (error) {
        console.error(`Error: ${error}`);
        console.error(`Error Message: ${error.message}`);
        console.error(`Error Response: ${error.response}`);
    }    
    }
    /* GET DATA STATUS */
    async function getStatusData() {
        if(!status) {
            await getData();
            setIsStatus(false);
            return;
        }
        try{
          const res = await qrcodeListByStatusApiAction(status);
          qrcodeDispatch({type: 'ADD_DATA', payload: {
              items: res?.data,
              prevURL: res?.links.prev,
              nextURL: res?.links.next,
          }});
          setIsStatus(false);
          } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsStatus(false);
        } 
    }
    /* GET DATA */
    async function getData() {
      try{
        const res = await qrcodeListApiAction();
        qrcodeDispatch({type: 'ADD_DATA', payload: {
            items: res?.data,
            prevURL: res?.links.prev,
            nextURL: res?.links.next,
        }});
        console.log(res)
      
        } catch (error) { 
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
      }
    }

    /* search DATA */
    async function getSearchData() {
      if(!search) {
        await getData();
        return;
      }
      try{
        const res = await qrcodeSearchApiAction(search);
        startTransition(() => res);
        qrcodeDispatch({type: 'ADD_DATA', payload: {
            items: res?.data,
            prevURL: res?.links.prev,
            nextURL: res?.links.next,
        }});
        } catch (error) {
          console.error(`Error: ${error}`);
          console.error(`Error Message: ${error.message}`);
          console.error(`Error Response: ${error.response}`);
      }
    } 

    /* DELETE DATA */
    async function deleteData(id) {
        try{
        const res = await qrcodeDeleteApiAction(id)
        if(res?.status == 1) {
          toast.success(res.message, toastifyDarkBounce);
          await getData();
          return;
        }
        } catch (error) {
          console.error(`Error: ${error}`);
          console.error(`Error Message: ${error.message}`);
          console.error(`Error Response: ${error.response}`);
        }   
    }   

    useEffect(() => { 
        isStatus && getStatusData();
    }, [isStatus]);


    if(!qrcodeState?.items) { return <Loader /> }


  return (
    <>
    {/* TOP */}
    <section className='w-[100%]'>
      <div className='w-[90%] mx-auto flex items-center justify-between pb-[1rem]'>
        <form action={getSearchData} className='w-[45%] flex items-center justify-start'>
          <input 
            type='text' 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Enter Code here...'
            className='w-[85%] h-[3rem] rounded-l-lg p-3 outline-none border border-slate-300' />
          <button type='submit'
            className='w-[15%] h-[3rem] border-y border-r rounded-r-lg text-lg border-slate-300 flex items-center justify-center p-3'>
            {isPending
            ? <span className='animate-pulse w-[15px] h-[15px] rounded-full bg-slate-900'></span> 
            : <FaSearch />
          }
          </button>
        </form>
        <div className='flex items-center justify-end gap-6'>
          <Link 
            href='/admin/qrcode/qrcode-image' 
            className='p-3 transition-all ease-in-out duration-200 text-white rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-800 hover:bg-gradient-to-tr hover:from-yellow-500 hover:to-yellow-800'>
            QR Code Images
          </Link>
          <button onClick={() => setIsModal(true)} 
            className='p-3 transition-all ease-in-out duration-200 text-white rounded-2xl bg-gradient-to-br from-green-500 to-green-800 hover:bg-gradient-to-tr hover:from-green-500 hover:to-green-800'>
            Generate
          </button>
          <select onChange={(e) => {
            setStatus(e.target.value);
            setIsStatus(true);
            }} 
            className='p-3 outline-none rounded-xl border border-slate-200 hover:border-slate-400'>
            <option value=''>All</option>
            <option value='Available'>Available</option>
            <option value='Used'>Used</option>
          </select>
        </div>
      </div>
    </section>

    <section className="w-[100%] lg:overflow-hidden overflow-scroll">
      {/* TABLE TITLES */}
      <section className='lg:w-[100%] w-[70rem]'>
        <div className='w-[90%] text-lg py-2 mx-auto flex items-center justify-start font-bold font-white bg-slate-200 '>
          <div className='w-[35%] border-r border-white px-3 py-2'>QRCODE</div>
          <div className='w-[25%] border-r border-white px-3 py-2'>USER</div>
          <div className='w-[25%] border-r border-white px-3 py-2'>STATUS</div>
          <div className='w-[15%] px-3 py-2'>ACTION</div>
        </div>
      </section>
      {/* TABLE DATA */}
      <section className='lg:w-[100%] w-[70rem]'>
        { qrcodeState?.items?.length > 0 ?
        qrcodeState?.items?.map((i, key) => (
            <div key={key} className='w-[90%] text-lg border-x border-b border-slate-300 mx-auto flex items-center justify-start '>
            <div className='w-[35%] border-r border-blue-300 px-3 py-2 flex items-center justify-between'>
                {i.code}
            </div>
            <div className='w-[25%] border-r border-blue-300 px-3 py-2'>
                {i?.user?.name ? i.user?.name : 'Not added.'}
            </div>
            <div className='w-[25%] border-r border-blue-300 px-3 py-2'>
                { i?.status ? 
                <span className='px-2 py-1 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 text-white'>
                    {i?.status}
                </span>
                : 'Not added.' }
            </div>
            <div className='w-[15%] px-3 py-2 text-xl flex items-center justify-start gap-4'>
                <Link title='View' href={`/admin/qrcode/${i.id}`}> 
                <FaEye className='hover:text-blue-500 duration-150 hover:scale-110 transition-all ease-in'/> 
                </Link>
                <Link title='Edit' href={`/admin/qrcode/edit/${i.id}`}> 
                <MdEdit className='hover:text-green-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                </Link>  
                <button title='Delete'> 
                    <MdDeleteForever 
                    onClick={() => deleteData(i.id)}
                    className='hover:text-red-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                </button>
            </div>
            </div>
        ))
        :
        <div className="mx-auto w-[50rem] lg:w-[90%] flex items-center justify-center py-8">
            <h5 className='p-3 text-4xl font-light'>No Data Available...</h5>
        </div>
        }
      </section>
    </section>

    {/* PAGINATION */}
    <section className='w-[100%] mt-[2rem] mb-[4rem]'>
      <div className='mx-auto w-[90%] flex items-center justify-end gap-3'>
            {qrcodeState?.prevURL &&
              <button 
                onClick={() => paginationHandler(qrcodeState?.prevURL)}
                className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-slate-500 to-slate-700'>
                <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-slate-500' /> 
                  Prev 
              </button>
            }
            {qrcodeState?.nextURL &&
            <button
              onClick={() => paginationHandler(qrcodeState?.nextURL)}
              className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-slate-500 to-slate-700'>
                Next <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out text-slate-500' />
            </button>
            }
        
      </div>
    </section>

    {/*  */}
    <GenerateQrCodeModal isModal={isModal} setIsModal={setIsModal} getData={getData} />

    </>
  )
}
