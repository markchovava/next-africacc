"use client";
import React, { useRef, useState } from 'react'
import Loader from '@/components/Loader';
import { baseURL } from '@/api/baseURL';
import FileSaver, { saveAs } from 'file-saver';
import { tokenAuth } from '@/tokens/tokenAuth';


export default function QrCodeView({ dbData, id }) {
  const { getAuthToken } = tokenAuth()
  const [data, setData] = useState(dbData?.data);
  const imgURL = `${baseURL}assets/img/qrcode/${data?.code}.png`;
  const imgName = data?.code + '.png';
  const qrCodeRef = useRef(null);


  const handleDownload = async () => {
    /* const res = await fetch(imgURL, {
     'method': 'GET',
    headers: {
      'Accept': 'application/png',
      'Authorization': `Bearer ${getAuthToken()}`
    }
      }
    ).then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        FileSaver.saveAs(url, imgName);
      }); */

      FileSaver.saveAs(imgURL, imgName);
    
  };
 
  
  
  if(!data) {return <Loader />}


  return (
    <section className='w-[100vw]'>
      <div className='mx-auto w-[80%] p-6 bg-white drop-shadow-2xl text-lg mb-[4rem]'>
        {/* CODE */}
        <div className='flex md:flex-row flex-col md:items-center justify-start gap-2 mb-4'>
          <div className='md:w-[15%] font-light'>Code</div>
          <div className='md:w-[85%]'>{data?.code}</div>
        </div>
        {/* USER */}
        <div className='flex md:flex-row flex-col md:items-center justify-start gap-2 mb-4'>
          <div className='md:w-[15%] font-light'>User</div>
          <div className='md:w-[85%]'>{data?.user?.name ? data?.user?.name : 'Not added.'}</div>
        </div>
        {/* STATUS */}
        <div className='flex md:flex-row flex-col md:items-center justify-start gap-2 mb-4'>
          <div className='md:w-[15%] font-light'>Status</div>
          <div className='md:w-[85%]'>
            <span className='px-2 py-1 rounded-xl text-white bg-gradient-to-br from-cyan-500 to-green-800'>
            {data?.status}
            </span>
          </div>
        </div>
        {/*  */}
        <div className='flex md:flex-row flex-col items-start justify-start gap-2 mb-4'>
          <div className='md:w-[15%] font-light pt-1'>QR Code</div>
          <div className='md:w-[85%]'>
              <div title="Click to view" className='w-[40%] cursor-pointer bg-white drop-shadow-lg mb-4' onClick={handleDownload}>
                <img src={imgURL} className='w-[100%] object-fill' />
              </div>
             
             {/* <button
              onClick={handleDownload}
               className='border border-slate-700 text-slate-700 hover:text-white hover:bg-slate-700 transition-all ease-in-out px-3 py-2'>
                Download
              </button>  */}
          </div>
        </div>
        
      </div>
    </section>
  )
}
