import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";




export const checkAuthCookie = async () => {
    const authCookie = await getCookie('AFRICACC_AUTH_COOKIE', { cookies });
    
    if(authCookie){
        return;
    }else{
        redirect('/login')
    }
} 


export const getAuthCookie = async () => {
    const authCookie = await getCookie('AFRICACC_AUTH_COOKIE', { cookies });
    return authCookie;
} 



