import { baseURL } from "./baseURL";


export async function getSectorOpportunityBySlug(slug) {
    const response = await fetch( `${baseURL}opportunity-by-sector-slug?sector_slug=${slug}`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }

    return await response.json();
}
