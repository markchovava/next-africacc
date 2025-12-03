"use client";
import { axiosClientAPI } from '@/api/axiosClientAPI';
import Loader from '@/components/Loader';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';




export default function InvestmentStatusEdit({id}) {
    const router = useRouter();
    const [data, setData] = useState();
    const [inputData, setInputData] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);
    const [errMsg, setErrMsg] = useState({});
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
    }};

    /* GET DATA */
    async function getData() {
        try{
        const result = await axiosClientAPI.get(`investment/${id}`, config)
        .then((response) => {
            const res = response?.data?.data;
            setData(res)
            setInputData({status: res?.status})
        })
        } catch (error) {
          console.error(`Error: ${error}`);
          console.error(`Error Message: ${error.message}`);
          console.error(`Error Response: ${error.response}`);
        }   
    }


    /* POST DATA */
    const postData = async () => {
        if(!inputData.status){
            const message = 'Status is required.';
            setErrMsg({status: message})
            toast.warn(message, toastifyDarkBounce);
            setIsSubmit(false);
            return;
        }
        const formData = {
            investment_id: id,
            status: inputData.status, 
        }
        try{
            const result = await axiosClientAPI.post(`investment-status`, formData, config)
            .then((response) => {
                if(response.data.status == 1){
                  toast.success(response.data.message, toastifyDarkBounce);
                  setIsSubmit(false);
                  router.push(`/admin/investment/${id}`);
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


    if(!data){ return ( <Loader /> ) }

    console.log(data)
  

    return (
    <>
    <section className='w-[100%] pb-[6rem]'>
        <div className='w-[90%] mx-auto'>
          {/* ------------ */}
          <div className='text-lg'>
            {/*  */}
            <div className='w-[100%] flex items-center justify-start gap-4 mb-3'>
              <div className='font-light'>Investor:</div>
              <div>{data.name}</div>
            </div>
            {/*  */}
            <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
              <div className='font-light'>Opportunity:</div>
              <div className=''>{data?.opportunity?.name}</div>
            </div>
          </div>
          {/* ------------ */}
          <div className='mb-6'>
              <p className='font-light text-lg mb-2'>Status:</p>
              <select 
                  name='status' 
                  onClick={(e) => setInputData({...inputData, status: e.target.value})} 
                  className='w-[100%] p-3 outline-none rounded-xl border border-slate-300'>
                  <option value=''>Select an option</option>
                  <option value='Processing' selected={data.status == 'Processing' && 'selected'}>Processing</option>
                  <option value='Successful' selected={data.status == 'Successful' && 'selected'}>Successful</option>
              </select>
              {errMsg.status &&
                  <div className='text-red-700'>{errMsg.statuss}</div>
              }
          </div>
          <div className='flex items-center justify-center'>
            <button 
                onClick={() => setIsSubmit(true)} 
                className='btn__primary'>
                {isSubmit === true ? 'Processing' : 'Submit'}
            </button>
          </div>
        </div>
    </section>
    </>
  )
}
