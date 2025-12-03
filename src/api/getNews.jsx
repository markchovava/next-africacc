import { baseURL } from "./baseURL";


export async function getNewsList() {
    const response = await fetch( `${baseURL}news`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}

export async function getNews() {
    const response = await fetch( `${baseURL}news`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}

export async function getNew(id) {
    const response = await fetch( `${baseURL}news/${id}`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}


export async function getNewsByNum(num) {
    const response = await fetch( `${baseURL}news-by-num?num=${num}`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}