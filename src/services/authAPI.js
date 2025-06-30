 import api from "./api";
 import axios from "axios";
 import { saveTokens,getRefreshToken,clearTokens} from "./authStorage";
 import {BACKEND_URL} from '@env'


export const loginUserAPI = async (data) => {
    try {
        const response = await api.post('/api/v1/auth/login', data);
        const { accessToken, refreshToken, user } = response.data.data;
        await saveTokens(accessToken,refreshToken);
  
        return { user, accessToken, refreshToken };  
    } catch (error) {
        console.error("Error during login:", error);
        throw error;  
    }
  };
  
  
  export const signupUserAPI = async(userData) => {
     try {
       const response = await api.post('/api/v1/auth/register',userData);
       
       return response.data;
     } catch (error) {
      console.error("Error in registering user:", error.response?.data || error.message);
      throw error;
     }
  };
  
  
  export const updatePasswordAPI = async(data) => {
    try {
      const response = await api.patch('/api/v1/auth/update-password',data);
     
      return response.data;
    } catch (error) {
      console.error("Error in updating password : ",error.response?.data || error.message);
      throw error;
    }
  }
  
  
  export const getCurrentUserAPI = async() => {
   try {
     const response = await api.get("/api/v1/auth/current-user");
    console.log(response);
     return response.data.data;
     
   } catch (error) {
    console.error("Error in getting current user:", error.response?.data || error.message);
   }
  }
  
  
  
  export const logoutUserAPI = async () => {
    try {
        const response = await api.post('/api/v1/auth/logout');
        await clearTokens();
         console.log('User logged out successfully');
         return {success : true};
    } catch (error) {
      console.error("Logout failed:", error.response || error);
    return { success: false, message: error?.response?.data?.message || 'Logout failed' };
    }
  };
  
  
export const refreshAccessTokenAPI = async () => {
  const refreshToken = await getRefreshToken();
  
  if (!refreshToken) {
    throw new Error("No refresh token found.");
  }

  console.log("🔁 Attempting to refresh with:", refreshToken);
  
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/auth/refresh-token`, {
      refreshToken,
    });
    console.log(response,"this is response")

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
   
    // Save updated tokens securely
    await saveTokens(accessToken, newRefreshToken);

    return { accessToken, newRefreshToken };
  } catch (error) {
    console.error("Error refreshing access token:", error?.response?.data?.error || error.message);
    throw error;
  }
};
  
  
  