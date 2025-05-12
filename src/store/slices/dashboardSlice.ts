
import { createSlice } from '@reduxjs/toolkit';
import { DashboardData } from '../../lib/type/dashboard';
import { getDashboardAction } from '../actions/dashboard';

interface DashboardState {
    dashboard: DashboardData | null;
}

const initialState: DashboardState = {
    dashboard: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardAction.fulfilled, (state, action) => {
                state.dashboard = action.payload.data;
            })

    },
});

export default dashboardSlice.reducer;
