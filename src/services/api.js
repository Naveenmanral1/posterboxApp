import axios from "axios";
import { refreshAccessTokenAPI } from "./authAPI";
import { getTokens,saveTokens,getAccessToken } from "./authStorage";
import {BACKEND_URL} from '@env';

const api = axios.create({
    baseURL : BACKEND_URL,
    timeout : 10000,
})

api.interceptors.request.use(
  async (config) => {
   
    const token = await getAccessToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔄 Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;

        const refreshResponse = await refreshAccessTokenAPI();

         console.log(refreshResponse,"this is srefdsjf");
        // const newToken = refreshResponse?.accessToken;
       

        const { accessToken, newRefreshToken } = refreshResponse;
        await saveTokens(accessToken, newRefreshToken);


        originalRequest.headers.Authorization =` Bearer ${accessToken}`;
        return api(originalRequest); // Retry original request
      } catch (refreshError) {
        console.error('Refresh failed', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;