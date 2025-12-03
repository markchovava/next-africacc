import { getCookie } from "cookies-next";
import { cookies } from "next/headers";



export const getMembershipCookie = () => {
    const authCookie = getCookie('AFRICACC_MEMBERSHIP_COOKIE', { cookies });
    return authCookie;
} 