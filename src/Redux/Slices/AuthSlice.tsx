// src/Redux/Slices/AuthSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, resendOtpThunk, verifyOtpThunk } from '../Action/AuthAction';

interface User {
    id: string;
    phoneNumber: string;
    fullName: string;
    email: string;
    role: string;
}

interface AuthState {
    sessionId: string | null;
    phoneNumber: string | null;
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
}


const initialState: AuthState = {
    sessionId: null,
    phoneNumber: null,
    token: null,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyOtpThunk.fulfilled, (state, action) => {
                state.token = action.payload.data.token;
                state.user = action.payload.data.user;
                localStorage.setItem("token", action.payload.data.token);
            })
            .addCase(verifyOtpThunk.rejected, (state, action) => {
                console.error('OTP Verification failed:', action.payload);
            })
            .addCase(resendOtpThunk.fulfilled, (state, action) => {
                state.sessionId = action.payload.data.sessionId;
                state.phoneNumber = action.meta.arg;
            })
            .addCase(resendOtpThunk.rejected, (state, action) => {
                console.error('Resend OTP failed:', action.payload);
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                console.log('Login successful:', action.payload);
                state.loading = false;
                state.sessionId = action.payload.data.sessionId;
                state.phoneNumber = action.meta.arg;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });


    }
});


// export const { setSession, setAuthData } = authSlice.actions;
export default authSlice.reducer;
