"use client";
import { qrcodeAssignUserApiAction } from '@/actions/qrcodeActions';
import { userEmailSearchApiAction } from '@/actions/userActions';
import { axiosClientAPI } from '@/api/axiosClientAPI';
import Loader from '@/components/Loader';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaAngleRight } from "react-icons/fa6";
import { toast } from 'react-toastify';



export default function QrCodeEdit({ dbData, id }) {
    const router = useRouter();
    const [qrData, setQrData] = useState(dbData?.data);
    const [isSearch, setIsSearch] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [data, setData] = useState();
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
    }};

     /* GET QR DATA */
     /* async function getQrData() {
        try{
            const result = await axiosClientAPI.get(`qrcode/${id}`, config)
            .then((response) => {
                setQrData(response.data.data)
            })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    } */

    /* SEARCH DATA */
    async function searchData() {
        if(search == ''){
            setIsSearch(false);
            return;
        }
        try{
            const res = await userEmailSearchApiAction(search)
            setResult(res.data)
           
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    }

    async function postData() {
        if(!data){
            toast.warn('Email is required.', toastifyDarkBounce);
            setIsSubmit(false);
            return;
        }
        const formData = {
            qrcode_id: id,
            user_id: data.id,
        }

        try{
            const res = await qrcodeAssignUserApiAction(formData);
            if(res.status == 1) {
                router.push('/admin/qrcode')
                toast.success(res.message, toastifyDarkBounce);
                setIsSubmit(false);
            }
           
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsSubmit(false);
        }   

    }


    useEffect(() => { 
        isSearch && searchData(); 
    }, [isSearch]);

    useEffect(() => { 
        isSubmit && postData(); 
    }, [isSubmit]);

   


    if(!qrData) { return <Loader /> }



  return (
    <>
    <section className='w-[100%]'>
        <div className='mx-auto w-[70%] bg-white drop-shadow-lg p-8 mb-[4rem]'>
            <div className=''>
                <div className='text-lg flex lg:flex-row flex-col lg:items-center justify-start gap-1 mb-4'>
                    <div className='lg:w-[15%] font-light'>QR Code:</div>
                    <div className='lg:w-[85%]'>{qrData?.code}</div>
                </div>
                <p className='font-light text-lg mb-2'>Email:</p>
                <form action={() => setIsSearch(true)} className=' mb-8 relative'>
                    <div className='group flex items-center justify-center'>
                        <input 
                        type='text'
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setIsSearch(true);
                        }}
                        value={search}
                        placeholder='Enter Email here...' 
                        className='w-[85%] rounded-l-xl p-3 outline-none border border-slate-200 group-hover:border-slate-400 transition-all ease-in-out duration-200' />
                        <button 
                        type='submit'
                        className='w-[15%] h-[3rem] border-y border-r rounded-r-lg text-lg border-slate-200 group-hover:border-slate-400 flex items-center justify-center p-3'>
                            {isSearch === true 
                            ? <span className='animate-pulse w-[15px] h-[15px] rounded-full bg-slate-900'></span> 
                            : <FaSearch className='text-slate-800' />
                            }
                        </button>
                    </div>
                    { result.length > 0 &&
                    <div className='w-[100%] absolute z-20 rounded-xl '>
                        <ul className='w-[100%] h-[100%] rounded-xl overflow-hidden bg-slate-100 text-black'>
                            {result.map((i, key) => (
                                <li key={key} 
                                onClick={() => {
                                    setData(i);
                                    setResult([]);
                                    setIsSearch(false);
                                }} className='cursor-pointer hover:bg-slate-200 px-6 py-1'>{i.email}</li>
                            ))}
                        </ul>
                    </div>
                    }

                </form>
                {data && 
                <div className='mb-6'>
                    <ul>
                        <li className='flex items-center justify-start gap-2 text-lg'>
                            <FaAngleRight className='text-sm' />{data.email}
                        </li>
                    </ul>
                </div>
                }

                <div className='flex items-center justify-center'>
                    <button onClick={() => setIsSubmit(true)} 
                    className='btn__form px-12 py-4'>
                        {isSubmit ? 'Processing' : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
