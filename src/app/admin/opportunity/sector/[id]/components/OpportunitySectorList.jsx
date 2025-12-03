"use client";
import { axiosClientAPI } from '@/api/axiosClientAPI';
import Loader from '@/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import React, { useEffect, useState } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiMinusCircle } from "react-icons/fi";
import { toastifyDarkBounce } from '@/libs/toastify';
import { toast } from 'react-toastify';
import Link from 'next/link';


export default function OpportunitySectorList({ id }) {
    const [data, setData] = useState();
    const [inputData, setInputData] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);
    const [sectors, setSectors] = useState();
    const [opportunity, setOpportunity] = useState();
    const { getAuthToken } = tokenAuth()
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
    }};

    /* GET OPPORTUNITY */
    async function getOpportunity() {
        try{
        const result = await axiosClientAPI.get(`opportunity/${id}`, config)
        .then((response) => {
            setOpportunity(response.data.data)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }  

    /* GET SECTORS */
    async function getSectors() {
        try{
        const result = await axiosClientAPI.get(`sector-all`, config)
        .then((response) => {
            setSectors(response.data.data)
        })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    } 
    /* GET DATA */
    async function getData() {
        try{
        const result = await axiosClientAPI.get(`opportunity-sector-all-by-opportunity-id/${id}`, config)
        .then((response) => {
            setData(response.data.data)
        })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    } 

    /* DELETE DATA */
    async function deleteData(item_id) {
        try{
        const result = await axiosClientAPI.delete(`opportunity-sector/${item_id}`, config)
        .then((response) => {
            if(response.data.status == 1) {
            toast.success(response.data.message, toastifyDarkBounce);
            getData();
            return;
            }
        })
        } catch (error) {
        console.error(`Error: ${error}`);
        console.error(`Error Message: ${error.message}`);
        console.error(`Error Response: ${error.response}`);
        }   
    } 
    
    const postData = async () => {
        const formData = {
          opportunity_id: id,
          sector_id: inputData.sector_id,
        }
        try{
            const result = await axiosClientAPI.post(`opportunity-sector`, formData, config)
            .then((response) => {
                if(response.data.status == 1){
                  toast.success(response.data.message, toastifyDarkBounce);
                  getData();
                  setIsSubmit(false);
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
        getSectors();
        getData();
        getOpportunity();
    }, []);

    useEffect(() => { 
        isSubmit === true && postData(); 
    }, [isSubmit]);


    if(!opportunity) {
        if(!sectors){
            if(!data) {
                return (<Loader />);
            }
        }
    }



  return (
    <>
    <section className='w-[100%] pb-[6rem]'>
        <div className='w-[90%] mx-auto'>
             {/* LINK */}
            <div className='flex items-center justify-end mb-6'>
                <Link
                    href={`/admin/opportunity/${id}`} 
                    className='px-8 py-3 transition-all ease-in-out rounded-xl text-white bg-gradient-to-br from-yellow-300 to-yellow-700 hover:bg-gradient-to-br hover:to-yellow-300 hover:from-yellow-700' >
                    View
                </Link>
            </div>
            {opportunity?.name &&
            <h3 className='mb-2 text-[2rem]'>{opportunity?.name}</h3>
            }
            <section className='w-[100%] font-medium bg-slate-300 flex items-center justify-start'>
                <div className='w-[80%] p-3 text-lg border-r border-white'>NAME</div>
                <div className='w-[20%] p-3 text-lg'>ACTION</div>
            </section>
            {/*  */}
            <section className='w-[100%] flex items-center justify-start border-b border-slate-300'>
                <div className='w-[80%] p-3 text-lg border-r border-slate-300'>
                    <select 
                        name='sector_id' 
                        onChange={(e) => setInputData({...inputData, sector_id: e.target.value})}
                        className='w-[100%] p-3 rounded-xl outline-none border border-slate-300'>
                        <option value=''>Select an option.</option>
                        {sectors?.map((i, key) => (
                            <option key={key} value={i.id}>{i.name}</option>
                        ))}
                    </select>
                </div>
                <div className='w-[20%] p-3 text-lg'>
                    <button 
                        onClick={() => setIsSubmit(true)}>
                        <IoMdAddCircleOutline className='text-4xl hover:text-green-600 hover:scale-110 transition-all ease-in-out' />
                    </button>
                </div>
            </section>
            {/*  */}
            {data && 
            <>{
              data?.length > 0 &&
                data?.map((i, key) => (
                <>
                <section key={key} className='w-[100%] flex items-center justify-start'>
                    <div className='w-[80%] px-6 py-3 text-lg border-r border-slate-300'>
                        {i?.sector?.name}
                    </div>
                    <div className='w-[20%] p-3 text-lg'>
                        <button onClick={() => deleteData(i.id)}>
                            <FiMinusCircle className='text-3xl hover:text-red-600 hover:scale-110 transition-all ease-in-out' />
                        </button>
                    </div>
                </section>
                </>
            ))
            }</>
            }

        </div>
    </section>
    </>
  )
}
