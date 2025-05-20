import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse, isApiResponse } from "../Slices/Thunk";
import { CarResponse } from "../../types/car";
import API, { AddCarApi } from "../../Apis/Api";

export const CarTypeAction = createAsyncThunk<ApiResponse<CarResponse>, { type: string, description: string }>(
    'car-type/add',
    isApiResponse(
        async ({ type, description }) => {
            const responce = await API.post(AddCarApi, { type, description });
            const data = responce.data;
            console.log(data);
            return data;
        }

    )
)

export const AllCarAction = createAsyncThunk<ApiResponse<CarResponse>>(
    'car-type/getAll',
    isApiResponse(
        async () => {
            const responce = await API.get(AddCarApi);
            const data = responce.data;
            console.log(data);
            return data;
        }

    )
)

export const DeleteCarAction = createAsyncThunk<ApiResponse<CarResponse>, { id: string }>(
    'car-type/delete',
    isApiResponse(
        async ({ id }) => {
            const responce = await API.delete(`${AddCarApi}/${id}`);
            const data = responce.data;
            console.log(data);
            return data;
        }

    )
)

export const UpdateCarAction = createAsyncThunk<ApiResponse<CarResponse>, { id: string, name: string, description: string }>(
    'car-type/update',
    isApiResponse(
        async ({ id, name, description }) => {
            const responce = await API.put(`${AddCarApi}/update`, { id, name, description });
            const data = responce.data;

            return data;
        }
    )
)
