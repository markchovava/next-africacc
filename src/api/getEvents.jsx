import { baseURL } from "./baseURL";


export async function getEventsByNum(num) {
    const response = await fetch( `${baseURL}event-by-num?num=${num}`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }

    return await response.json();
}


export async function getEvents() {
    const response = await fetch( `${baseURL}event`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }

    return await response.json();
}


export async function getEvent(id) {
    const response = await fetch( `${baseURL}event/${id}`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }

    return await response.json();
}