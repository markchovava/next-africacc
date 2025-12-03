"use client";
import React from 'react'
import NavigationMain from './NavigationMain'
import NavigationMainResponsive from './NavigationMainResponsive'
import NavTop from './NavTop'
import NavTopResponsive from './NavTopResponsive'
import { tokenAuth } from '@/tokens/tokenAuth';
import { tokenRole } from '@/tokens/tokenRole';



export default function Header() {
  const { getAuthToken } = tokenAuth();
  const { getRoleToken } = tokenRole();

  return (
    <>
    {getAuthToken() &&
      <>
        {getRoleToken() &&
        <>
          {getRoleToken() <= 2 && 
          <>
            <NavTop />
            <NavTopResponsive />
          </> }
        </> }
      </> }
        
    {/*  */}
    <NavigationMain />
    <NavigationMainResponsive />
    
    </>
  )
}
