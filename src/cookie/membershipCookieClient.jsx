"use client";
import {setCookie, deleteCookie } from 'cookies-next';


const cookieDuration = 60 * 60 * 24 * 30 * 30;

export function setMembershipCookie(token) {
    setCookie('AFRICACC_MEMBERSHIP_COOKIE', token, { maxAge: cookieDuration });
}


export function removeMembershipCookie() {
    deleteCookie('AFRICACC_MEMBERSHIP_COOKIE');
}