import { baseURL } from "./baseURL";



export async function getCountryOpportunities(slug) {
    const response = await fetch( `${baseURL}country-opportunity?slug=${slug}`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}


export async function getCountrySectorOpportunities(country_slug, sector_id) {
    const url = `${baseURL}country-sector-opportunity?country_slug=${country_slug}&sector_id=${sector_id}`;
    console.log(url)
    const response = await fetch( url, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }

    return await response.json();
}