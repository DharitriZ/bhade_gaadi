import { PayloadActionCreator } from "@reduxjs/toolkit";

export interface ApiResponse<T = any> {
    statusCode: number;
    message: string;
    data?: T;
    error?: string;
    // phoneNumber?: string;
}


export function isApiResponse<Args, Returned extends ApiResponse>(
    payloadCreator: (args: Args) => Promise<Returned>,
) {
    return async (args: Args, { rejectWithValue }: any) => {
        try {
            console.log(args);
            const response = await payloadCreator(args);
            if (response.statusCode !== 200 && response.statusCode !== 201) {
                return rejectWithValue(response.message);
            }
            return response;
        } catch (err: any) {
            return rejectWithValue(
                err?.response?.data || {
                    message: "Something went wrong",
                    statusCode: 500,
                },
            );
        }
    };
} 