import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  signupUserAPI,
  loginUserAPI,
  logoutUserAPI,
  refreshAccessTokenAPI,
  getCurrentUserAPI,
  updatePasswordAPI
} from '../services/authAPI';

import { saveTokens, clearTokens } from '../services/authStorage';

// Async Thunks

export const getCurrentUser = createAsyncThunk(
  'users/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const userData = await getCurrentUserAPI();
      return userData;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  'users/signup',
  async (userData, { rejectWithValue }) => {
    try {
      return await signupUserAPI(userData);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async (data, { rejectWithValue }) => {
    
    try {
      const response = await loginUserAPI(data);
      const { accessToken, refreshToken } = response;
      
      await saveTokens(accessToken, refreshToken);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'users/update-password',
  async (data, { rejectWithValue }) => {
    try {
      return await updatePasswordAPI(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'users/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserAPI();
      await clearTokens();
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'users/refresh-token',
  async (_, { rejectWithValue }) => {
    try {
      const { accessToken } = await refreshAccessTokenAPI();
      return { accessToken };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial State

const initialState = {
  status: false,
  userData: null,
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
};

// Slice

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.userData = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.status = false;
        state.userData = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.status = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Refresh token
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        console.log(action,"this is action")
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
