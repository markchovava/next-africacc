import { baseURL } from "./baseURL";


export async function getSectors() {
    const response = await fetch( `${baseURL}sector`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}

export async function getSectorBySlug(slug) {
    const response = await fetch( `${baseURL}sector-view-by-slug?slug=${slug}`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }

    return await response.json();
}

export async function getSectorsAll() {
    const response = await fetch( `${baseURL}sector-all`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }

    return await response.json();
}


export async function getSector(id) {
    const response = await fetch( `${baseURL}sector/${id}`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }

    return await response.json();
}




