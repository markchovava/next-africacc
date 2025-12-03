"use client"
import { createContext, useContext, useReducer } from "react";
import { opportunityImageInit, opportunityImageInitialState, opportunityImageReducer } from "@/reducers/OpportunityImageReducer";
import { QrCodeInit, QrCodeInitialState, QrCodeReducer } from "@/reducers/QrCodeReducer";


export const MainContext = createContext();


export default function MainContextProvider({ children }) {
    const [opportunityImageState, opportunityImageDispatch] = useReducer(opportunityImageReducer, opportunityImageInitialState, opportunityImageInit);
    const [qrcodeState, qrcodeDispatch] = useReducer(QrCodeReducer, QrCodeInitialState, QrCodeInit);


    return (
        <MainContext.Provider value={{ 
            opportunityImageState, opportunityImageDispatch,
            qrcodeState, qrcodeDispatch,
        }}>
        { children }
        </MainContext.Provider>
      )
}


export const MainContextState = () => {
    return useContext(MainContext)
  }
 
