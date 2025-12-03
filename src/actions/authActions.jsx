"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";


export async function checkAuthAction() {
  const cookieStore = await cookies();
  const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
  const res = await fetch(`${baseURL}api/profile-check`, {
    'method': 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  }); 
  return await res.json();
}

export async function logoutAuthAction() {
  const cookieStore = await cookies();
  const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
  if(!authToken?.value) { return redirect('/login'); }
  const res = await fetch(`${baseURL}api/logout`, {
    'method': 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  }); 
  return await res.json();
}

export async function loginAction(formData) {
    const res = await fetch(`${baseURL}login`, {
      'method': 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }); 
    revalidatePath('/opportunity');
    return await res.json();
}


export async function logoutAction(token, cart_token) {
    const res = await fetch(`${baseURL}api/logout?cart_token=${cart_token}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    revalidatePath('/login');
    return await res.json();

}


export async function qrcodeLoginAction(data) {
    const res = await fetch(`${baseURL}login-qrcode`, {
      'method': 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    //revalidatePath('/login');
    return await res.json();
}

export async function qrcodeRegisterAction(data) {
    const res = await fetch(`${baseURL}register-qrcode`, {
      'method': 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    //revalidatePath('/login');
    return await res.json();
}


export async function registerAction(data) {
    const res = await fetch(`${baseURL}register`, {
      'method': 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    //revalidatePath('/login');
    return await res.json();
}