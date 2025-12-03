"use client";
import { axiosClientAPI } from '@/api/axiosClientAPI';
import { tokenAuth } from '@/tokens/tokenAuth';
import React, { useEffect, useState } from 'react'
import CountryData from '@/data/CountryData.json';
import { FaArrowRightLong } from 'react-icons/fa6';
import { toastifyDarkBounce } from '@/libs/toastify';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { baseURL } from '@/api/baseURL';
import { tokenEventCart } from '@/tokens/tokenEventCart';
import Loader from '@/components/Loader';



export default function EventCheckout() {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [errMsg, setErrMsg] = useState({});
  const [data, setData] = useState();
  const [eventCart, setEventCart] = useState();
  const { getAuthToken } = tokenAuth()
  const { getEventCartToken, removeEventCartToken } = tokenEventCart()
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${getAuthToken()}`
  }};
  /*  */
    const handleInput = (e) => {
      setData({...data, [e.target.name]: e.target.value});
    }

    /* GET DATA */
    async function getData() {
      try{
      const result = await axiosClientAPI.get(`profile`, config)
      .then((response) => {
          const res = response.data.data;
          setData({...data, 
              name: res?.name,
              email: res?.email,
              phone: res?.phone,
              address: res?.address,
              country: res?.country,
              company_name: res?.company_name,
              profession: res?.profession,
          })
      })
      } catch (error) {
      console.error(`Error: ${error}`)
      }   
    }

    /* GET EVENT CART */
    async function getCart() {
      const cart_token = getEventCartToken() ?? null;
      try{
      const result = await axiosClientAPI.get(`${baseURL}event-cart-by-token?cart_token=${cart_token}`)
      .then((response) => {
          const res = response.data.data;
          setEventCart(res)
      })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
    }

    async function postData() {
      if(!eventCart?.id) {
        const message = 'No Event was selected, please add the event first.';
        toast.warn(message, toastifyDarkBounce);
        setIsSubmit(false)
        return
      }
      if(!data.name) {
        const message = 'Full name is required.';
        setErrMsg({name: message});
        toast.warn(message, toastifyDarkBounce);
        setIsSubmit(false);
        return;
      }
      if(!data.email) {
        const message = 'Email is required.';
        setErrMsg({email: message});
        toast.warn(message, toastifyDarkBounce);
        setIsSubmit(false);
        return;
      }
      if(!data.phone) {
        const message = 'Phone Number is required.';
        setErrMsg({phone: message});
        toast.warn(message, toastifyDarkBounce);
        setIsSubmit(false);
        return;
      }
      if(!data.country) {
        const message = 'Country is required.';
        setErrMsg({country: message});
        toast.warn(message, toastifyDarkBounce);
        setIsSubmit(false);
        return;
      }
      if(!data.address) {
        const message = 'Address is required.';
        setErrMsg({address: message});
        toast.warn(message, toastifyDarkBounce);
        setIsSubmit(false);
        return;
      }
      if(!data.profession) {
        const message = 'Profession is required.';
        setErrMsg({profession: message});
        toast.warn(message, toastifyDarkBounce);
        setIsSubmit(false);
        return;
      }
      if(!data.payment_method) {
        const message = 'Payment Method is required.';
        setErrMsg({payment_method: message});
        toast.warn(message, toastifyDarkBounce);
        setIsSubmit(false);
        return;
      }
      if(!data.is_agree) {
        const message = 'Terms and Conditions is required to proceed.';
        setErrMsg({is_agree: message});
        toast.warn(message, toastifyDarkBounce);
        setIsSubmit(false);
        return;
      }
      const formData = {
        event_cart_id: eventCart?.id,
        event_id:  eventCart.event_id,
        event_total:  eventCart.event_total,
        number_of_people:  eventCart.number_of_people,
        joining_fee:  eventCart.joining_fee,
        address: data?.address,
        company_name: data?.company_name,
        country: data?.country,
        email: data?.email,
        is_agree: data?.is_agree,
        name: data?.name,
        payment_method: data?.payment_method,
        phone: data?.phone,
        profession: data?.profession,
      }
      try{
        const result = await axiosClientAPI.post(`event-order`, formData, config)
        .then((response) => {
            if(response.data.status == 1){
              const res = response.data;
              toast.success(res.message, toastifyDarkBounce);
              setIsSubmit(false);
              removeEventCartToken()
              router.push(`/event/event-order`);
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
      getCart();
      getData();
    }, []);

    useEffect(() => {
      isSubmit === true && postData();
    }, [isSubmit]);


    console.log(eventCart);
    if(!data) {
      return (<Loader />)
    }


  return (
    <>
    <section className='w-[100%] pt-[4rem] pb-[6rem]'>
      <div className='w-[90%] mx-auto grid lg:grid-cols-3 grid-cols-1 gap-6'>
          <section className='col-span-2 p-4'>
              <h4 className='leading_none text-[2.5rem] font-light mb-3'>
                User Information</h4>
            {/* NAME & EMAIL */}
            <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-4 mb-4'>
                {/* NAME */}
                <div className='w-[100%]'>
                    <p className='font-light mb-1'>Full Name:<span className='text-red-600'>*</span></p>
                    <input type='text'
                        name='name'
                        onChange={handleInput}
                        value={data?.name}
                        placeholder='Enter your First Name...' 
                        className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300' />
                    { errMsg.name &&
                        <div className='text-red-600'>{errMsg.name}</div>
                    }
                </div>
                {/* EMAIL */}
                <div className='w-[100%]'>
                    <p className='font-light mb-1'>Email:<span className='text-red-600'>*</span></p>
                    <input 
                        type='email'
                        name='email' 
                        onChange={handleInput}
                        value={data?.email}
                        placeholder='Enter your Last Name...' 
                        className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300' />
                    { errMsg.email &&
                        <div className='text-red-600'>{errMsg.email}</div>
                    }
                </div>
            </div>
            {/* PHONE & COUNTRY */}
            <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-4 mb-4'>
                {/* PHONE */}
                <div className='w-[100%]'>
                    <p className='font-light mb-1'>Phone:<span className='text-red-600'>*</span></p>
                    <input type='text'
                        name='phone'
                        onChange={handleInput}
                        value={data?.phone}
                        placeholder='Enter your Phone...' 
                        className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300' />
                    { errMsg.phone &&
                        <div className='text-red-600'>{errMsg.phone}</div>
                    }
                </div>
                {/* COUNTRY */}
                <div className='w-[100%]'>
                    <p className='mb-1 font-light'>Country:<span className='text-red-600'>*</span></p>
                    <select 
                        name='country'
                        onChange={handleInput}
                        className='w-[100%] font-light py-3 px-4 rounded-lg outline-none border border-slate-300'>
                        <option value=''>Select an option.</option>
                        {CountryData.map((i, key) => (
                            <option 
                                key={key} 
                                value={i.name} 
                                selected={data?.country === i.name && 'selected'}>
                                {i.name}
                            </option>
                        ))}
                    </select>
                    { errMsg.country &&
                        <div className='text-red-600'>{errMsg.country}</div>
                    }
                </div>
            </div>
            {/* ADDRESS */}
            <div className='mb-4'>
                <p className='mb-1 font-light'>Address:*</p>
                <input type='text'
                    name='address'
                    onChange={handleInput}
                    value={data?.address}
                    placeholder='Enter your Address here...' 
                    className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300' />
                { errMsg.address &&
                    <div className='text-red-600'>{errMsg.address}</div>
                }
            </div>
            {/* PROFESSION & COMPANY NAME */}
            <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-4 mb-4'>
                {/* PROFESSION */}
                <div className=' w-[100%]'>
                    <p className='font-light mb-1'>Job Title (Profession):</p>
                    <input 
                        type='text'
                        name='profession'
                        onChange={handleInput}
                        value={data?.profession}
                        placeholder='Enter your Profession here...' 
                        className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300' />
                    {errMsg.profession &&
                        <div className='text-red-600'>{errMsg.profession}</div>}
                </div>
                {/* COMPANY NAME */}
                <div className='w-[100%]'>
                    <p className='font-light mb-1'>Company Name:</p>
                    <input 
                        type='text' 
                        name='company_name'
                        onChange={handleInput}
                        value={data?.company_name}
                        placeholder='Enter your Company Name here...' 
                        className='w-[100%] font-light rounded-lg p-3 outline-none border border-slate-300' />
                </div>
            </div>
        </section>
        <section className='col-span-1 bg-white drop-shadow-lg p-4'> 
          <h4 className='leading_none text-[2.5rem] font-light mb-3'>
          Event Payments</h4>
          {/*  */}
          <div className='w-[100%] flex items-center justify-between gap-4 p-3 text-lg bg-slate-100 border border-slate-200'>
              <p className='leading-none'>Details</p>
              <p className='leading-none'>Amount</p>
          </div>
          {/*  */}
          <div className='w-[100%] px-3 py-4 flex items-center justify-between gap-4 text-lg font-light border border-slate-200'>
              <p className='leading-none'>{eventCart?.number_of_people} people</p>
              <p className='leading-none'>{eventCart?.event_total ? '$' + eventCart?.event_total?.toFixed(2) : (0).toFixed(2)}</p>
          </div>
          {/*  */}
          <div className='mb-3 px-3 py-4 drop-shadow w-[100%] bg-gradient-to-br from-green-600 to-cyan-700 text-white flex items-center justify-between gap-4 text-lg font-light border border-slate-200'>
              <p className='leading-none'>Total</p>
              <p className='leading-none font-normal'>{eventCart?.event_total ? '$' + eventCart?.event_total?.toFixed(2) : (0).toFixed(2)}</p>
          </div>
          {/*  */}
          <div className='w-[100%] font-light p-3 mb-3 bg-slate-50 drop-shadow'>
            <div className='flex items-start justify-start gap-2'>
                <input type='radio' 
                  name='payment_method'
                  className='mt-[7px]'
                  onChange={(e) => setData({...data, payment_method: e.target.value})}
                  value='Stripe' /> Stripe (MasterCard, Visa, Bank Transfer)
            </div>
            { errMsg.payment_method &&
              <div className='text-red-600'>{errMsg.payment_method}</div>}
          </div>
          {/*  */}
          <div className='p-3 w-[100%] font-light bg-slate-50 mb-3 drop-shadow-md'>
            Your personal data will be used to process your order, support your experience 
            throughout this website, and for other purposes described in our privacy policy.
          </div>
          {/*  */}
          <div className='p-3 font-light bg-slate-50 mb-3 drop-shadow'>
            <div className='flex items-start justify-start gap-2'>
              <input type='checkbox' 
                  value={1} 
                  className='mt-[7px]'
                  onChange={(e) => setData({...data, is_agree: e.target.value })}
                  name='is_agree' />
                  I agree to the website Terms and Conditions.*
            </div>
            {errMsg.is_agree &&
              <div className='text-red-600'>{errMsg.is_agree}</div>}
          </div>
          {/*  */}
          <div className='w-[100%]'>
            <button 
              onClick={() => setIsSubmit(true)} 
              className='group flex items-center justify-center gap-2 w-[100%] rounded-lg py-4 text-center text-white text-lg transition-all ease-in-out bg-gradient-to-br from-yellow-300 to-yellow-800 hover:drop-shadow-md hover:bg-gradient-to-br hover:to-yellow-400 hover:from-yellow-800'>
              {isSubmit === true ? 'Processing' 
                : <> Submit 
                  <FaArrowRightLong
                    className="group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
                </>
              }
            </button>
          </div>
        </section>
      </div>
    </section>
    </>
  )
}
