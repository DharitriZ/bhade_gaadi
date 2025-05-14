import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse, isApiResponse } from "../Slices/Thunk";
import API, { AllDocApi } from "../../Apis/Api";
import { DocumentPayload, DocumentResponse, UpdateStatusData } from "../../types/Doc";

export const viewDocThunk = createAsyncThunk<ApiResponse<DocumentResponse>, DocumentPayload>(
    'documents/view',
    isApiResponse(async ({ page, pageSize, search, status }) => {
        const response = await API.get<ApiResponse<DocumentResponse>>(AllDocApi, {
            params: { page, pageSize, search, status },
        });

        // console.log(response.data);
        return response.data;
    })
);




export const updateStatusThunk = createAsyncThunk<ApiResponse<UpdateStatusData>, { id: string; status: string; rejectionReason?: string }>(
    'documents/updateStatus',
    isApiResponse(async ({ id, status, rejectionReason }) => {

        console.log({ id, status, rejectionReason });

        const response = await API.put(`documents/${id}/review`, {
            status,
            rejectionReason,
        });
        return response.data;
    })
);



