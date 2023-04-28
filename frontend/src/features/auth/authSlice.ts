import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { signin, getUser, register, getSession, refreshToken } from './authAPI';


interface User {
    username: string;
    email: string;
    password: string;
}

interface Signin {
    username: string;
    password: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    csrf: string;
    status: 'idle' | 'loading' | 'failed';
    accessToken: string;
    refreshToken: string;
    user: User | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    csrf: "",
    status: 'loading',
    accessToken: "",
    refreshToken: "",
    user: null,
}

export const registerAsync = createAsyncThunk(
    'auth/register',
    async ({username, email, password}: User, thunkAPI) => {
        try {
            const response = await register({username, email, password});
            return response.data;
        } catch (err) {
            const response = await register({username, email, password});
            return response.data;
        }
        
    }
)

export const signinAsync = createAsyncThunk(
    'auth/signin',
    async ({username, password}: Signin, thunkAPI) => {
        try {
            const response = await signin({username, password});
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            const userResponse = await getUser(response.data.access);
            localStorage.setItem('userId', userResponse.data.id);
            
            return {tokens: response.data, user: userResponse.data};
        } catch (err) {
            const errors = err as Error | AxiosError;
            return thunkAPI.rejectWithValue({error: errors.message});
        }
        
    }
)

export const getSessionAsync = createAsyncThunk(
    'auth/getSession',
    async ({}, thunkAPI) => {
        
        try {
            const response = await getSession();
            if (response.status == 200) return true;
            return false;
        } catch (err) {
            const errors = err as Error | AxiosError;
            return thunkAPI.rejectWithValue({error: errors.message});
        }
        
    }
)

export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async ({}, thunkAPI) => {
        try {
            const response = await refreshToken();
            localStorage.setItem("refreshToken", "");
            localStorage.setItem("token", "");
            localStorage.setItem("userId", "");
        } catch (err) {
            const errors = err as Error | AxiosError;
            return thunkAPI.rejectWithValue({error: errors.message});
        }
        
    }
)

export const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.setItem('userId', "");
            state.isAuthenticated = false;
        },
        setSession: (state) => {
            state.isAuthenticated = localStorage.getItem('userId') !== "";
            console.log("setSession()",state.isAuthenticated)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSessionAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getSessionAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.isAuthenticated = true;
            // state.csrf = action.payload?.csrf;
        })
        .addCase(getSessionAsync.rejected, (state) => {
            state.status = 'failed';
            state.isAuthenticated = false;
        })
        .addCase(logoutAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(logoutAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.isAuthenticated = false;
        })
        .addCase(logoutAsync.rejected, (state) => {
            state.status = 'failed';
            state.isAuthenticated = false;
            localStorage.setItem("refreshToken", "");
            localStorage.setItem("token", "");
            localStorage.setItem("userId", "");
        })
        .addCase(registerAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(registerAsync.fulfilled, (state, action) => {
            state.status = 'idle';
        })
        .addCase(registerAsync.rejected, (state) => {
            state.status = 'failed';
        })
        .addCase(signinAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(signinAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.accessToken = action.payload.tokens.access;
            state.refreshToken = action.payload.tokens.refresh;
            state.user = action.payload.user;

            if (localStorage.getItem('token') !== "") {
                state.isAuthenticated = true
            }
        })
        .addCase(signinAsync.rejected, (state) => {
            state.status = 'failed';
            state.isAuthenticated = false;
        })
    }
});
export const { setSession, logout } = loginSlice.actions;

export const selectSession = (state: RootState) => state.auth.isAuthenticated;
export const selectCSRF = (state: RootState) => state.auth.csrf;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectUser = (state: RootState) => state.auth.user;

export default loginSlice.reducer;
