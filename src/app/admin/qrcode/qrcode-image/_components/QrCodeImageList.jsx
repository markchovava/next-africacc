"use client";
import Link from 'next/link';
import React, { useEffect, useRef, useState, useTransition } from 'react'
import { FaSearch } from 'react-icons/fa';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { MainContextState } from '@/context/MainContext';
import Loader from '@/components/Loader';
import { baseURL } from '@/api/baseURL';
import { qrcodeListApiAction, qrcodeListByNumApiAction, 
  qrcodeListByNumStatusApiAction, qrcodeListByStatusApiAction, 
  qrcodePaginationApiAction, qrcodeSearchApiAction } from '@/actions/qrcodeActions';



export default function QrCodeImageList({ dbData }) {
  const { qrcodeState, qrcodeDispatch } = MainContextState();
  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isStatus, setIsStatus] = useState(false);
  const [status, setStatus] = useState('');
  const [isQrNum, setIsQrNum] = useState(false);
  const [qrNum, setQrNum] = useState();

  useEffect(() => {
    qrcodeDispatch({type: 'ADD_DATA', payload: {
      items: dbData?.data,
      prevURL: dbData?.links?.prev,
      nextURL: dbData?.links?.next,
    }});
  }, []);

  async function paginateHandler(url) {
      try{
          const res = await qrcodePaginationApiAction(url)
          qrcodeDispatch({type: 'ADD_DATA', payload: {
              items: res?.data,
              prevURL: res?.links?.prev,
              nextURL: res?.links?.next,
          }});
      } catch (error) {
         console.error(`Error: ${error}`)
      } 
  }

  async function getData(){
    try{
      const res = await qrcodeListApiAction();
      qrcodeDispatch({type: 'ADD_DATA', payload: {
          items: res?.data,
          prevURL: res?.links.prev,
          nextURL: res?.links.next,
      }});
    
      } catch (error) {
          console.error(`Error: ${error}`); 
    }
  }

  async function getDataByStatus(stat){
    if(qrNum){
      await getDataByNumStatus(status, qrNum)
      return;
    }
    try{
      const res = await qrcodeListByStatusApiAction(stat);
      qrcodeDispatch({type: 'ADD_DATA', payload: {
          items: res?.data,
          prevURL: res?.links.prev,
          nextURL: res?.links.next,
      }});
      setIsStatus(false);
      } catch (error) {
          console.error(`Error: ${error}`); 
    }
  }

  async function getDataByNumStatus(stat, num){
    console.log('NuM STATUS', stat, num);
    if(!stat) {
      await getDataByNum(num);
      return;
    }
    if(!num) {
      await getDataByStatus(stat);
      return;
    }
      try{
        const res = await qrcodeListByNumStatusApiAction(stat, num);
        qrcodeDispatch({type: 'ADD_DATA', payload: {
            items: res?.data,
            prevURL: res?.links.prev,
            nextURL: res?.links.next,
        }});
        setIsStatus(false);
        setIsQrNum(false);
        } catch (error) {
            console.error(`Error: ${error}`); 
      }
  }

  async function getDataByNum(num){
    if(status){
      getDataByNumStatus(status, num)
      return;
    }
      try{
        const res = await qrcodeListByNumApiAction(num);
        qrcodeDispatch({type: 'ADD_DATA', payload: {
            items: res?.data,
            prevURL: res?.links.prev,
            nextURL: res?.links.next,
        }});
        setIsQrNum(false);
        } catch (error) {
            console.error(`Error: ${error}`); 
      }
  }

  async function getSearchData(){
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
      }
  }


  useEffect(() => {
    isStatus && getDataByStatus(status);
  }, [isStatus]);

  useEffect(() => {
    isQrNum && getDataByNum(qrNum);
  }, [isQrNum]);
   

  if(!qrcodeState?.items) { return <Loader /> }

  /* SUBMITTED TO THE API */
  let images = []
  if(qrcodeState?.items) {
    qrcodeState?.items.map((i) => (
      images = [...images, {
        code: i.code,
        url: `${baseURL}assets/img/qrcode/${i.code}.png`}
      ]
    ));
  }



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
            href='/admin/qrcode' 
            className='p-3 transition-all ease-in-out duration-200 text-white rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-800 hover:bg-gradient-to-tr hover:from-yellow-500 hover:to-yellow-800'>
            QR Code
          </Link>
          <Link
            href={`/admin/qrcode/qrcode-zip?images=${encodeURIComponent(JSON.stringify(images))}`} 
            target='_blank'
            className='p-3 transition-all ease-in-out duration-200 text-white rounded-2xl bg-gradient-to-br from-green-500 to-green-800 hover:bg-gradient-to-tr hover:from-green-500 hover:to-green-800'>
            Download
          </Link>
          {/* STATUS */}
          <select onChange={(e) => {
            setStatus(e.target.value);
            setIsStatus(true);
            }} 
            className='p-3 outline-none rounded-xl border border-slate-200 hover:border-slate-400'>
            <option value=''>All</option>
            <option value='Available'>Available</option>
            <option value='Used'>Used</option>
          </select>
          {/*  */}
          <select onChange={(e) => {
            setQrNum(e.target.value);
            setIsQrNum(true);
            }} 
            className='p-3 outline-none rounded-xl border border-slate-200 hover:border-slate-400'>
            <option value={12}>Select Amount</option>
            {[...Array(5)].map((i, key) => (
              <option key={key} value={key+1}>{key+1}</option>
            ))}
            {[...Array(5)].map((i, key) => (
              <option key={key} value={(key+1) * 10}>{(key+1) * 10}</option>
            ))}
          </select>
        </div>
      </div>
    </section>


    <section className='w-[100%] mt-[1rem] mb-[6rem]'>
        
      {/* MAIN CONTENT */}
      { qrcodeState?.items.length > 0 ?
        <div className='mx-auto w-[90%] grid lg:grid-cols-4 grid-cols-2 gap-8'>
            {/* COL */}
            {qrcodeState?.items?.map((i, key) => (
            <div className='w-[100%] flex items-center justify-center bg-white drop-shadow-lg'>
                <div className='w-[100%] py-4'>
                  <img src={`${baseURL}assets/img/qrcode/${i.code}.png`} className='w-[100%] object-fill' />
                </div>
            </div>   
            ))}
        </div> 
        :
        <div className='w-[90%] mx-auto py-[2rem] font-light flex items-center justify-center text-[2rem]'>
          No Data Available.
        </div>
      }

      {/* PAGINATION */}
      <section className='w-[100%] mt-[2rem] mb-[4rem]'>
        <div className='mx-auto w-[90%] flex items-center justify-end gap-3'>
          {qrcodeState?.prevURL &&
            <button 
                onClick={() => paginateHandler(qrcodeState?.prevURL) }
                className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-slate-500 to-slate-700'>
                <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-slate-500' /> 
                Prev 
            </button>
          }
          {qrcodeState?.nextURL &&
            <button
              onClick={() => paginateHandler(qrcodeState?.nextURL) }
              className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-slate-500 to-slate-700'>
              Next 
              <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out text-slate-500' />
            </button>
          }  
        </div>
      </section>

    </section>
    </>
  )
}
