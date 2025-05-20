import { createSlice } from "@reduxjs/toolkit";
import { AllCarAction, CarTypeAction, DeleteCarAction, UpdateCarAction } from "../Action/CarTypeAction";

export interface CarResponse {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const initialState: CarResponse[] = [];

const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CarTypeAction.fulfilled, (state, action) => {
                console.log(action.payload);
                if (Array.isArray(action.payload.data)) {
                    // Replace state contents immutably
                    state.splice(0, state.length, ...action.payload.data);
                } else if (action.payload.data) {
                    state.push(action.payload.data);
                }
            })
            .addCase(CarTypeAction.rejected, (state, action) => {
                console.error('CarTypeAction failed:', action.payload);
            })
            .addCase(AllCarAction.fulfilled, (state, action) => {
                console.log(action.payload)
                if (Array.isArray(action.payload.data)) {
                    state.splice(0, state.length, ...action.payload.data); // replace all
                } else if (action.payload.data) {
                    state.push(action.payload.data);
                }
            })
            .addCase(AllCarAction.rejected, (state, action) => {
                console.error('AllCarAction failed:', action.payload);
            })
            .addCase(DeleteCarAction.fulfilled, (state, action) => {

                console.log(action.payload);
                const updatedCar = action.payload.data;
                if (updatedCar) {
                    const index = state.findIndex(car => car.id === updatedCar.id);
                    if (index !== -1) {
                        state[index].isActive = updatedCar.isActive;
                    }
                }
            })
            .addCase(DeleteCarAction.rejected, (state, action) => {
                console.error('DeleteCarAction failed:', action.payload);
            })
            .addCase(UpdateCarAction.fulfilled, (state, action) => {
                console.log(action.payload);
                const updatedCar = action.payload.data;
                if (updatedCar) {
                    const index = state.findIndex(car => car.id === updatedCar.id);
                    if (index !== -1) {
                        state[index] = updatedCar;
                    }
                }
            });
    }
});

export default carSlice.reducer;
