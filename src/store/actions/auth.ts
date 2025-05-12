import { createAsyncThunk } from "@reduxjs/toolkit";
import { withToastForError } from "../../lib/utils/thunk";
import { AuthResponse, VerifyLoginPayload } from "../../lib/type/auth";
import { ApiResponse } from "../../lib/type/api";
import API from "../../lib/api";

export const loginUserAction = createAsyncThunk(
    "auth/loginUser",
    withToastForError(async (phoneNumber: any) => {
        const response = await API.post("/auth/admin/login", { phoneNumber });
        return response.data

    }),
);

export const verifyLoginOtpAction = createAsyncThunk(
    "auth/verifyLoginOtp",
    withToastForError<VerifyLoginPayload, ApiResponse<AuthResponse>>(
        async ({
            phoneNumber,
            sessionId,
            otp,
        }: {
            phoneNumber: string;
            sessionId: string;
            otp: string;
        }) => {
            return await API.post("/auth/admin/verify-login", {
                phoneNumber,
                sessionId,
                otp,
            }).then((res: any) => res.data);
        },
    ),
);

export const logoutAction = createAsyncThunk(
    "auth/logout",
    async (_, { fulfillWithValue }) => {
        return fulfillWithValue({ message: "Logged out successfully" });
    },
);