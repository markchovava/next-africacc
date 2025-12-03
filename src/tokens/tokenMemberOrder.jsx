"use client";

export const tokenMOrderName = 'AFRICACC_MORDER_TOKEN';
export const tokenMOrder = () => { 
    const setMOrderToken = (token) => {
        if(typeof window !== 'undefined'){
            localStorage.setItem(tokenMOrderName, token);   
        }
    }
    const getMOrderToken = () => {
        if(typeof window !== 'undefined'){
            const token =  localStorage.getItem(tokenMOrderName);
            return token;
        }
    }
    const removeMOrderToken = () => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem(tokenMOrderName);
        }
    }

    return {
        setMOrderToken, 
        getMOrderToken,
        removeMOrderToken
    }

}