import { baseURL } from "./baseURL";



export async function getMemberships() {
    const response = await fetch( `${baseURL}membership`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}
export async function getMembershipByNum(num) {
    const response = await fetch( `${baseURL}membership-by-num?num=${num}`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}