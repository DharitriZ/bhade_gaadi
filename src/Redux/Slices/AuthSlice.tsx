// src/Redux/Slices/AuthSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginApi, VerifyApi } from '../../Apis/Api';

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
        setSession(state, action) {
            state.sessionId = action.payload.sessionId;
            state.phoneNumber = action.payload.phoneNumber;
        },
        setAuthData(state, action) {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyOtpThunk.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(verifyOtpThunk.rejected, (state, action) => {
                console.error('OTP Verification failed:', action.payload);
            })
            .addCase(resendOtpThunk.fulfilled, (state, action) => {
                state.sessionId = action.payload.sessionId;
                state.phoneNumber = action.payload.phoneNumber;
            })
            .addCase(resendOtpThunk.rejected, (state, action) => {
                console.error('Resend OTP failed:', action.payload);
            })
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                console.log('Login successful:', action.payload);
                state.loading = false;
                state.sessionId = action.payload.sessionId;
                state.phoneNumber = action.payload.phoneNumber;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });


    }
});

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (phoneNumber: string, { rejectWithValue }) => {
        try {
            const response = await fetch(LoginApi, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phoneNumber }),
            });

            const data = await response.json();

            if (data.statusCode === 200) {
                return {
                    sessionId: data.data.sessionId,
                    phoneNumber: phoneNumber
                }

            } else {
                return rejectWithValue(data.message || 'Login failed.');
            }
        } catch (error: any) {
            return rejectWithValue(error.message || 'Network error.');
        }
    }
);


export const resendOtpThunk = createAsyncThunk(
    'auth/resendOtp',
    async (phoneNumber: string, { rejectWithValue }) => {
        try {
            const response = await fetch(LoginApi, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phoneNumber }),
            });

            const data = await response.json();

            if (data.statusCode === 200) {
                return data.data;
            } else {
                return rejectWithValue(data.message || 'Resend OTP failed.');
            }
        } catch (error: any) {
            return rejectWithValue(error.message || 'Network error.');
        }
    }
);


export const verifyOtpThunk = createAsyncThunk(
    'auth/verifyOtp',
    async ({ sessionId, phoneNumber, otp }: { sessionId: string; phoneNumber: string; otp: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(VerifyApi, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionId, phoneNumber, otp }),
            });

            const data = await response.json();

            if (data.statusCode === 200) {
                return data.data;
            } else {
                return rejectWithValue(data.message || 'Verification failed.');
            }

        } catch (error: any) {
            return rejectWithValue(error.message || 'Something went wrong.');
        }
    }
);


export const { setSession, setAuthData } = authSlice.actions;
export default authSlice.reducer;
