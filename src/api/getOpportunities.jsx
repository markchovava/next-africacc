import { baseURL } from "./baseURL";


export async function getOpportunitiesByNum(num) {
    const response = await fetch( `${baseURL}opportunity-index-by-num?num=${num}`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}

export async function getOpportunities() {
    const response = await fetch( `${baseURL}opportunity`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}

export async function getOpportunity(id) {
    const response = await fetch( `${baseURL}opportunity/${id}`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }

    return await response.json();
}