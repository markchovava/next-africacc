"use client"
import axios from "axios";
import { baseURL } from "./baseURL";


export const axiosClientAPI = axios.create({
    baseURL: `${baseURL}api/`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
  }
)
