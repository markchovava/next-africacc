"use client";
import {setCookie, deleteCookie } from 'cookies-next';


const cookieDuration = 60 * 60 * 24 * 30 * 30;

export function setAuthCookie(token) {
    setCookie('AFRICACC_AUTH_COOKIE', token, { maxAge: cookieDuration });
}


export function removeAuthCookie() {
    deleteCookie('AFRICACC_AUTH_COOKIE');
}