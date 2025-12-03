"use client";


export const tokenEventCartName = 'AFRICACC_EVENT_CART_TOKEN';
export const tokenEventCart = () => {
    const setEventCartToken = (token) => {
        if(typeof window !== 'undefined'){
            localStorage.setItem(tokenEventCartName, token);
           
        }
    }

    const getEventCartToken = () => {
        if(typeof window !== 'undefined'){
            const token =  localStorage.getItem(tokenEventCartName);
            return token;
        }
    }

    const removeEventCartToken = () => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem(tokenEventCartName);
        }
    }

    return {
        setEventCartToken, 
        getEventCartToken,
        removeEventCartToken,
    }

}