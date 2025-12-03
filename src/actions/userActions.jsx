"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";



export async function userEmailSearchApiAction(input) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
    if(!authToken?.value) { redirect('/login'); }
    /* FETCH */
    const res = await fetch(`${baseURL}api/user-email-search?search=${input}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/qrcode');
    return await res.json();
  }