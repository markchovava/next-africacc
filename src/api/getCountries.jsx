import { baseURL } from "./baseURL";



export async function getCountriesAll() {
    const response = await fetch( `${baseURL}country-all`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}

export async function getCountries() {
    const response = await fetch( `${baseURL}country`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}


export async function getCountryBySlug(slug) {
    const response = await fetch( `${baseURL}country-view-by-slug?slug=${slug}`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}