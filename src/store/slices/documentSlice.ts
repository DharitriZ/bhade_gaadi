import { createSlice } from '@reduxjs/toolkit';
import { PendingDocumentGroup } from '../../lib/type/documents';
import { getPendingDocumentsAction } from '../actions/documents';

interface DocumentState {
    data: PendingDocumentGroup[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

const initialState: DocumentState = {
    data: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
};

const documentSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPendingDocumentsAction.fulfilled, (state, action) => {
                const { data, totalCount, totalPages, currentPage } = action.payload.data;

                state.data = data;
                state.totalCount = totalCount;
                state.totalPages = totalPages;
                state.currentPage = currentPage;
            })
    },
});

export default documentSlice.reducer;
