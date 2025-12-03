"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";




/* AUTHENICATED APIS */
export async function qrcodeAssignUserApiAction(data) {
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
  if(!authToken?.value) { redirect('/login')}
  /* FETCH */
  const res = await fetch(`${baseURL}api/qrcode-assign-user`, {
    'method': 'POST',
    'body': JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  }); 
  revalidatePath('/admin/qrcode');
  return await res.json();
}

export async function qrcodeListByNumStatusApiAction(status, num) {
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
  if(!authToken?.value) { redirect('/login'); }
  /* FETCH */
  const res = await fetch(`${baseURL}api/qrcode-index-by-num-status?num=${num}&status=${status}`, {
    'method': 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  }); 
  return await res.json();
}

export async function qrcodeListByNumApiAction(num) {
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
  if(!authToken?.value) { redirect('/login'); }
  /* FETCH */
  const res = await fetch(`${baseURL}api/qrcode-index-by-num?num=${num}`, {
    'method': 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  }); 
  return await res.json();
}

export async function qrcodeListByStatusApiAction(status) {
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
  if(!authToken?.value) { redirect('/login'); }
  /* FETCH */
  const res = await fetch(`${baseURL}api/qrcode-index-by-status?status=${status}`, {
    'method': 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  }); 
  return await res.json();
}

export async function qrcodeListApiAction() {
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
  if(!authToken?.value) { redirect('/login'); }
  /* FETCH */
  const res = await fetch(`${baseURL}api/qrcode`, {
    'method': 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  }); 
  return await res.json();
}

export async function qrcodePaginationApiAction(url) {
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
  if(!authToken?.value) { redirect('/login'); }
  /* FETCH */
  const res = await fetch(url, {
    'method': 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  }); 
  return await res.json();
}

export async function qrcodeSearchApiAction(input) {
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
  if(!authToken?.value) { redirect('/login'); }
  /* FETCH */
  const res = await fetch(`${baseURL}api/qrcode-search?search=${input}`, {
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

export async function qrcodeViewApiAction(id) {
  const cookieStore = await cookies();
  const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
  if(!authToken?.value) { redirect('/login')}
  /* FETCH */
  const res = await fetch(`${baseURL}api/qrcode/${id}`, {
    'method': 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  }); 
  return await res.json();
}

export async function qrcodeStoreByNumApiAction(data) {
  console.log(data)
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
  if(!authToken?.value) { redirect('/login')}
  /* FETCH */
  const res = await fetch(`${baseURL}api/qrcode-store-by-num`, {
    'method': 'POST',
    'body': JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  }); 
  revalidatePath('/admin/qrcode');
  return await res.json();
}

export async function qrcodeStoreApiAction(data) {
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
  if(!authToken?.value) { redirect('/login')}
  /* FETCH */
  const res = await fetch(`${baseURL}api/qrcode`, {
    'method': 'POST',
    'body': data,
    headers: {
      'Authorization': `Bearer ${authToken?.value}`
    }
  }); 
  revalidatePath('/admin/qrcode');
  return await res.json();
}

export async function qrcodeDeleteApiAction(id) {
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('AFRICACC_AUTH_COOKIE');
  if(!authToken?.value) { redirect('/login')}
  /* FETCH */
  const res = await fetch(`${baseURL}api/qrcode/${id}`, {
    'method': 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  }); 
  revalidatePath('/admin/qrcode');
  return await res.json();
}


  
