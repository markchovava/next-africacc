"use client";

export const tokenMembershipName = 'AFRICACC_MEMBERSHIP_TOKEN';
export const tokenMembership = () => {
    
    const setMembershipToken = (token) => {
        if(typeof window !== 'undefined'){
            localStorage.setItem(tokenMembershipName, token);
        }
    }
    
    const getMembershipToken = () => {
        if(typeof window !== 'undefined'){
            const token =  localStorage.getItem(tokenMembershipName);
            return token;
        }
    }
    const removeMembershipToken = () => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem(tokenMembershipName);
        }
    }
    return {
        setMembershipToken, 
        getMembershipToken,
        removeMembershipToken,
    }
}