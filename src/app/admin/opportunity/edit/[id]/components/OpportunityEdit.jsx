"use client"
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/components/Loader';
import { MainContextState } from '@/context/MainContext';
import { toastifyDarkBounce } from '@/libs/toastify';
import { tokenAuth } from '@/tokens/tokenAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Link from 'next/link';


import RichTextEditor from '@/components/RichTextEditor';



export default function OpportunityEdit({ id }) {
    const router = useRouter()
    const [description, setDescription] = useState('');
    const {opportunityImageState, opportunityImageDispatch} = MainContextState();
    const [countries, setCountries] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setData] = useState();
    const { getAuthToken } = tokenAuth()
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
        const result = await axiosClientAPI.get(`opportunity/${id}`, config)
        .then((response) => {
            const res = response.data.data;
            setData(response.data.data);
            setDescription(res.description);
            if(res.opportunity_images.length > 0) {
                for(let i = 0; res.opportunity_images.length > i; i++) {
                    if(res.opportunity_images[i]?.image){
                        opportunityImageDispatch({
                            type: 'ADD_IMAGE', payload: {
                                id: i+1, 
                                src: baseURL + res.opportunity_images[i]?.image } 
                        });
                    }
                }
            }
            
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }  
     /* GET COUNTRY */
    async function getCountries() {
        try{
        const result = await axiosClientAPI.get(`country-all`, config)
        .then((response) => {
            setCountries(response.data.data);
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }  

    /* DELETE DATA */
    async function deleteImage(img_id) {
        try{
        const result = await axiosClientAPI.delete(`opportunity-image/${img_id}`, config)
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

    /* POST DATA */
    const postData = async () => {
        let images = []
        if(opportunityImageState.images){
            for(let i = 0; i < opportunityImageState.images.length; i++) {
                if(opportunityImageState.images[i].image){
                    images = [...images, opportunityImageState?.images[i]?.image];
                }
            }
        }
        const formData = {
          name: data?.name,
          country_id: data?.country_id,
          priority: data?.priority,
          slug: data?.slug,
          expected_return: data?.expected_return,
          amount: data?.amount,
          short_description: data?.short_description,
          description: data?.description,
          opportunity_images: images,
        }
    
        try{
            const result = await axiosClientAPI.post(`opportunity/${id}`, formData, config)
            .then((response) => {
                if(response.data.status == 1){
                  toast.success(response.data.message, toastifyDarkBounce);
                  setIsSubmit(false);
                  router.push(`/admin/opportunity/${id}`);
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
        getCountries();
    }, []);


    useEffect(() => {
        isSubmit === true && postData();
    }, [isSubmit]);


  if(!countries) {
    if(!data) {
        return (
            <Loader />
        )
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
            {/*  */}
            <div className='grid md:grid-cols-2 grid-cols-1 gap-6 mb-6'>
                <div className='w-[100%]'>
                    <p className='font-light mb-2'>Name:</p>
                    <input type='text' 
                        name='name' 
                        onChange={handleInput} 
                        value={data?.name}
                        placeholder='Enter Name here...'
                        className='w-[100%] p-3 rounded-xl outline-none border border-slate-300' />
                </div>
                <div className='w-[100%]'>
                    <p className='font-light mb-2'>Slug:</p>
                    <input 
                        type='text' 
                        name='slug' 
                        onChange={handleInput} 
                        value={data?.slug}
                        placeholder='Enter Slug here...'
                        className='w-[100%] p-3 rounded-xl outline-none border border-slate-300' />
                </div>
            </div>
            {/*  */}
            <div className='w-[100%] mb-6'>
                <p className='font-light mb-2'>Short Description:</p>
                <input 
                    type='text'
                    name='short_description' 
                    onChange={handleInput} 
                    value={data?.short_description}
                    placeholder='Enter Short Description here...'
                    className='w-[100%] p-3 outline-none rounded-xl border border-slate-300' />
            </div>
             {/*  */}
            <div className='w-[100%] mb-4'>
            <p className='mb-1'>Description:</p>
            <div className='w-[100%] h-auto mb-12 overflow-hidden'>
              <RichTextEditor content={description} setContent={setDescription} />
            </div>
            </div>
            {/*  */}
            <div className='grid md:grid-cols-2 grid-cols-1 gap-6 mb-6'>
                <div className='w-[100%]'>
                    <p className='font-light mb-2'>Investment Amount:</p>
                    <input 
                        type='text' 
                        name='amount' 
                        onChange={handleInput} 
                        value={data?.amount}
                        placeholder='Enter Investment Amount here...'
                        className='w-[100%] p-3 rounded-xl outline-none border border-slate-300' />
                </div>
                <div className='w-[100%]'>
                    <p className='font-light mb-2'>Expected Return:</p>
                    <input 
                        type='text'
                        name='expected_return' 
                        onChange={handleInput} 
                        placeholder='Enter Expected Return here...'
                        value={data?.expected_return}
                        className='w-[100%] p-3 rounded-xl outline-none border border-slate-300' />
                </div>
            </div>
            {/* COUNTRY */}
            {countries &&
            <div className='w-[100%] mb-6'>
                <p className='font-light mb-2'>Country:</p>
                <select 
                    name='country_id' 
                    onChange={handleInput} 
                    className='w-[100%] p-3 outline-none rounded-xl border border-slate-300'>
                    <option value=''>Select an option.</option>
                    { countries?.map((i, key) => (
                        <option key={key} value={i.id} selected={data?.country?.id === i.id && 'selected'}>
                            {i.name}
                        </option>
                    ))}
                </select>
            </div>
            }
            <div className='w-[100%] mb-6'>
                <p className='font-light mb-2'>Priority:</p>
                <select 
                    name='priority' 
                    onChange={handleInput} 
                    className='w-[100%] p-3 outline-none rounded-xl border border-slate-300'>
                    <option value=''>Select an option.</option>
                    { [...Array(12)].map((i, key) => (
                        <option 
                            key={key+1} 
                            value={key+1} 
                            selected={data?.priority === key+1 && 'selected'}>
                            {key+1}
                        </option>
                    ))}
                </select>
            </div>
            {/* IMAGES */}
            <div className='w-[100%]'>
                <p className='font-light'>Image:</p>
                <div className='w-[100%] mb-6 grid md:grid-cols-2 grid-cols-1 gap-6'>
                    <div className='w-[100%]'>
                        <input 
                            type='file'
                            name='image1'
                            onChange={(e) => {
                                opportunityImageDispatch({
                                    type: 'ADD_IMAGE', payload: {
                                        id: 1, 
                                        image: e.target.files[0], 
                                        src: URL.createObjectURL(e.target.files[0]) } 
                                });
                                data?.opportunity_images[0]?.image && deleteImage(data?.opportunity_images[0]?.id);
                            }}   
                            className='w-[100%] p-3 rounded-xl border border-slate-300 mb-4' />
                        <div className='h-[10rem]  aspect-[10/7] rounded-xl overflow-hidden bg-slate-300'>
                            <img src={opportunityImageState?.images[0]?.src} className='w-[100%] h-[100%] object-cover' alt='Image' />
                        </div>
                    </div>
                    <div className='w-[100%]'>
                        <input 
                            type='file'
                            name='image2'
                            onChange={(e) => {
                                opportunityImageDispatch({
                                    type: 'ADD_IMAGE', payload: {
                                        id: 2, 
                                        image: e.target.files[0], 
                                        src: URL.createObjectURL(e.target.files[0]) } 
                                });
                                data?.opportunity_images[1]?.image && deleteImage(data?.opportunity_images[1]?.id);
                            }}   
                            className='w-[100%] p-3 rounded-xl border border-slate-300 mb-4' />
                        <div className='h-[10rem]  aspect-[10/7] rounded-xl overflow-hidden bg-slate-300'>
                            <img src={opportunityImageState?.images[1]?.src} className='w-[100%] h-[100%] object-cover' alt='Image' />
                        </div>
                    </div>
                    <div className='w-[100%]'>
                        <input 
                            type='file'
                            name='image3' 
                            onChange={(e) => {
                                opportunityImageDispatch({
                                    type: 'ADD_IMAGE', payload: {
                                        id: 3, 
                                        image: e.target.files[0], 
                                        src: URL.createObjectURL(e.target.files[0]) } 
                                });
                                data?.opportunity_images[2]?.image && deleteImage(data?.opportunity_images[2]?.id);
                            }}     
                            className='w-[100%] p-3 rounded-xl border border-slate-300 mb-4' />
                        <div className='h-[10rem]  aspect-[10/7] rounded-xl overflow-hidden bg-slate-300'>
                            <img src={opportunityImageState?.images[2]?.src} className='w-[100%] h-[100%] object-cover' alt='Image' />
                        </div>
                    </div>
                    <div className='w-[100%]'>
                        <input 
                            type='file' 
                            name='image4' 
                            onChange={(e) => {
                                opportunityImageDispatch({
                                    type: 'ADD_IMAGE', payload: {
                                        id: 4, 
                                        image: e.target.files[0], 
                                        src: URL.createObjectURL(e.target.files[0]) } 
                                });
                                data?.opportunity_images[3]?.image && deleteImage(data?.opportunity_images[3]?.id);
                            }}  
                            className='w-[100%] p-3 rounded-xl border border-slate-300 mb-4' />
                        <div className='h-[10rem]  aspect-[10/7] rounded-xl overflow-hidden bg-slate-300'>
                            <img src={opportunityImageState?.images[3]?.src} className='w-[100%] h-[100%] object-cover' alt='Image' />
                        </div>
                    </div>

                </div>
            </div>

            <div className='flex items-center justify-center py-[1rem]'>
                <button onClick={() => setIsSubmit(true)} className='btn__primary'>
                    {isSubmit == true ? 'Processing' : 'Submit'}
                </button>
            </div>
            
        </div>
    </section>
    </>
  )
}
