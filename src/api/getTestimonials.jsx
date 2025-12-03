import { baseURL } from "./baseURL";


export async function getTestimonialsByNum(num) {
    const response = await fetch( `${baseURL}testimonial-index-by-num?num=${num}`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}