import { createAsyncThunk } from "@reduxjs/toolkit";
import { withToastForError } from "../../lib/utils/thunk";
import { ApiResponse } from "../../lib/type/api";
import API from "../../lib/api";

export interface CarType {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCarTypePayload {
    name: string;
    description: string;
}

export interface UpdateCarTypePayload extends CreateCarTypePayload {
    id: string;
    isActive?: boolean;
}

// Get all car types
export const getCarTypesAction = createAsyncThunk(
    "carType/getAll",
    withToastForError(async () => {
        return await API.get("/car-types").then((res: any) => res.data);
    })
);

// Create car type
export const createCarTypeAction = createAsyncThunk(
    "carType/create",
    withToastForError<CreateCarTypePayload, ApiResponse<CarType>>(
        async (payload: CreateCarTypePayload) => {
            return await API.post("/car-types", payload).then((res: any) => res.data);
        }
    )
);

// Update car type
export const updateCarTypeAction = createAsyncThunk(
    "carType/update",
    withToastForError<UpdateCarTypePayload, ApiResponse<CarType>>(
        async (payload: UpdateCarTypePayload) => {
            return await API.post(`/car-types/update`, payload).then((res: any) => res.data);
        }
    )
);

// Delete car type
export const deleteCarTypeAction = createAsyncThunk(
    "carType/delete",
    withToastForError<string, ApiResponse<null>>(
        async (id: string) => {
            return await API.delete(`/car-types/${id}`).then((res: any) => res.data);
        }
    )
); 