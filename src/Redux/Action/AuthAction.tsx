import { createAsyncThunk } from "@reduxjs/toolkit";
import API, { LoginApi, ResendApi, VerifyApi } from "../../Apis/Api";
import { isApiResponse } from "../Slices/Thunk";
import { AuthResponse, LoginPayload, VerifyLoginPayload } from "../../types/auth";
import { ApiResponse } from "../../types/api";

export const loginThunk = createAsyncThunk(
    'auth/login',
    isApiResponse(
        async (phoneNumber: string) => {
            const response = await API.post(LoginApi, { phoneNumber });
            return response.data;
        })
);


export const resendOtpThunk = createAsyncThunk(
    'auth/resendOtp',
    isApiResponse(async (phoneNumber: string) => {
        const response = await API.post(ResendApi, { phoneNumber });
        return response.data;
    })
);


export const verifyOtpThunk = createAsyncThunk(
    'auth/verifyOtp',

    isApiResponse<VerifyLoginPayload, ApiResponse<AuthResponse>>(
        async ({ sessionId, phoneNumber, otp }: { sessionId: string; phoneNumber: string; otp: string }) => {
            const response = await API.post(VerifyApi, { sessionId, phoneNumber, otp });
            return response.data;
        })


);
