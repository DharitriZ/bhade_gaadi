import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarType } from "../actions/carType";
import {
    getCarTypesAction,
    createCarTypeAction,
    updateCarTypeAction,
    deleteCarTypeAction,
} from "../actions/carType";
import { logoutAction } from "../actions/auth";

interface CarTypeState {
    carTypes: CarType[];
}

const initialState: CarTypeState = {
    carTypes: [],
};

const carTypeSlice = createSlice({
    name: "carType",
    initialState,
    reducers: {
        clearCarTypes: (state) => {
            state.carTypes = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Get all car types
            .addCase(getCarTypesAction.fulfilled, (state, action: PayloadAction<any>) => {
                state.carTypes = action.payload.data;
            })
            // Create car type
            .addCase(createCarTypeAction.fulfilled, (state, action: PayloadAction<CarType>) => {
                state.carTypes.push(action.payload);
            })
            // Update car type
            .addCase(updateCarTypeAction.fulfilled, (state, action: PayloadAction<CarType>) => {
                const index = state.carTypes.findIndex((ct) => ct.id === action.payload.id);
                if (index !== -1) {
                    state.carTypes[index] = action.payload;
                }
            })
            // Delete car type
            .addCase(deleteCarTypeAction.fulfilled, (state, action: PayloadAction<string>) => {
                state.carTypes = state.carTypes.filter((ct) => ct.id !== action.payload);
            })
            .addCase(logoutAction.fulfilled, () => {
                return initialState;
            });
    },
});

export const { clearCarTypes } = carTypeSlice.actions;
export default carTypeSlice.reducer; 