import { createSlice } from '@reduxjs/toolkit';
import { PendingDocumentGroup } from '../../lib/type/documents';
import { getApprovedDocumentsAction, getPendingDocumentsAction, getRejectedDocumentsAction } from '../actions/documents';
import { logoutAction } from '../actions/auth';

interface PaginationInfo {
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

interface DocumentState {
    pendingDocuments: PendingDocumentGroup[];
    approvedDocuments: PendingDocumentGroup[];
    rejectedDocuments: PendingDocumentGroup[];
    pendingPagination: PaginationInfo;
    approvedPagination: PaginationInfo;
    rejectedPagination: PaginationInfo;
}



const initialState: DocumentState = {
    pendingDocuments: [],
    approvedDocuments: [],
    rejectedDocuments: [],
    pendingPagination: {
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
    },
    approvedPagination: {
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
    },
    rejectedPagination: {
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
    },
};


const documentSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPendingDocumentsAction.fulfilled, (state, action) => {
                const { data, totalCount, totalPages, currentPage } = action.payload.data;
                state.pendingDocuments = data;
                state.pendingPagination = { totalCount, totalPages, currentPage };
            })
            .addCase(getApprovedDocumentsAction.fulfilled, (state, action) => {
                const { data, totalCount, totalPages, currentPage } = action.payload.data;
                state.approvedDocuments = data;
                state.approvedPagination = { totalCount, totalPages, currentPage };
            })
            .addCase(getRejectedDocumentsAction.fulfilled, (state, action) => {
                const { data, totalCount, totalPages, currentPage } = action.payload.data;
                state.rejectedDocuments = data;
                state.rejectedPagination = { totalCount, totalPages, currentPage };
            })
            .addCase(logoutAction.fulfilled, () => {
                return initialState;
            });
    },
});


export default documentSlice.reducer;
