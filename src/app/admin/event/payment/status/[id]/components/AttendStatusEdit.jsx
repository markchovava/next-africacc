"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { toastifyDarkBounce } from '@/libs/toastify';
import Loader from '@/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';



export default function AttendStatusEdit({ id }) {
  const router = useRouter();
  const [data, setData] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const { getAuthToken } = tokenAuth();
  const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${getAuthToken()}`
  }};

  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value })
  }

  /* GET DATA */
  async function getData() {
    try{
      const result = await axiosClientAPI.get(`event-order/${id}`, config)
      .then((response) => {
        const res = response.data.data
        setData(res)
      
      })
    } catch (error) {
      console.error(`Error: ${error}`)
    }   
  }  
  /* POST DATA */
  async function postData() {
    const formData = {
      event_order_id: id,
      status: data?.status,  
    }
    try{
        const result = await axiosClientAPI.post(`event-order-status`, formData, config)
        .then((response) => {
            if(response.data.status == 1){
              toast.success(response.data.message, toastifyDarkBounce);
              setIsSubmit(false);
              router.push(`/admin/event/payment/${id}`);
            }
        });    
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsSubmit(false);
        }

  }

  useEffect(() => {
    getData();
  }, []);


  useEffect(() => {
    isSubmit === true && postData();
  }, [isSubmit]);


  if(!data) { return ( <Loader />) }



  return (
    <>
    <section className='w-[100%] pb-[6rem]'>
      <div className='w-[90%] lg:w-[80%] mx-auto'>
        {/* LINK */}
        <div className='flex items-center justify-end mb-6'>
          <Link 
            href={`/admin/event/payment/${id}`} 
            className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
            View
          </Link>
        </div>
        <section>
          <div className='w-[100%] mb-8'>
              <p className='mb-1 font-light'>Status:</p>
              <select 
                type='text' 
                name='status'
                onChange={handleInput}
                className='w-[100%] p-4 rounded-lg outline-none border border-slate-300'>
                  <option value=''>Select an option.</option>
                  <option value='Processing' selected={data.status === 'Processing' && 'selected'}>Processing</option>
                  <option value='Successful' selected={data.status === 'Successful' && 'selected'}>Successful</option>
                  <option value='Expired' selected={data.status === 'Expired' && 'selected'}>Expired</option>
              </select>
            
          </div>

         
          <div className='flex items-center justify-center py-[1rem]'>
            <button onClick={() => setIsSubmit(true)} className='btn__primary'>
              {isSubmit == true ? 'Processing' : 'Submit'}
            </button>
          </div>
        </section>
      </div>
    </section>
    </>
  )
}

