import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { getSession, getCSRF, login, logout, register } from './authAPI';

interface login {
    csrf: string;
    username: string;
    password: string;
}

interface User {
    csrf: string;
    username: string;
    email: string;
    password: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    csrf: string;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
    isAuthenticated: true,
    csrf: "",
    status: 'loading',
}

export const getSessionAsync = createAsyncThunk(
    'auth/getSession',
    async () => {
        const response = await getSession();
        
        if (response.data.isAuthenticated) {
            return {isAuthenticated: response.data.isAuthenticated,
                csrf: ""}
        }
        else {
            const csrfResponse = await getCSRF();
            return {
                isAuthenticated: response.data.isAuthenticated,
                csrf: csrfResponse.headers['x-csrftoken']
            }
        }
    }
)

export const setCSRFAsync = createAsyncThunk(
    'auth/setCSRF',
    async () => {
        const response = await getCSRF();

        return response.headers['x-csrftoken'];
    }
)

export const loginAsync = createAsyncThunk(
    'auth/login',
    async ({csrf, username, password}: login) => {
        const response = await login({csrf, username, password});
        console.log(response.data)
        return response.data;
    }
)

export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async () => {
        const response = await logout();
        const csrfResponse = await getCSRF();

        return csrfResponse.headers['x-csrftoken'];
    }
)

export const registerAsync = createAsyncThunk(
    'auth/register',
    async ({csrf, username, email, password}: User) => {
        const response = await register({csrf, username, email, password});
        console.log(response.data);
        return response.data;
    }
)

export const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getSessionAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getSessionAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.isAuthenticated = action.payload?.isAuthenticated;
            state.csrf = action.payload?.csrf;
        })
        .addCase(getSessionAsync.rejected, (state) => {
            state.status = 'failed';
        })
        .addCase(setCSRFAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(setCSRFAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.csrf = action.payload;
        })
        .addCase(setCSRFAsync.rejected, (state) => {
            state.status = 'failed';
        })
        .addCase(loginAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loginAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.isAuthenticated = true;
        })
        .addCase(loginAsync.rejected, (state) => {
            state.status = 'failed';
        })
        .addCase(logoutAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(logoutAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.isAuthenticated = false;
            state.csrf = action.payload;
        })
        .addCase(logoutAsync.rejected, (state) => {
            state.status = 'failed';
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
    }
});

export const selectSession = (state: RootState) => state.auth.isAuthenticated;
export const selectCSRF = (state: RootState) => state.auth.csrf;
export const selectStatus = (state: RootState) => state.auth.status;

export default loginSlice.reducer;
