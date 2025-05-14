import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { viewDocThunk } from "../Action/DocReviewAction";
type DocType = 'AADHAR_FRONT' | 'AADHAR_BACK' | 'DRIVING_LICENSE_FRONT' | 'DRIVING_LICENSE_BACK';
interface Documents {
    id: string;
    userId: string;
    documentType: DocType;
    documentUrl: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    rejectionReason: string | null;
    reviewedBy: string | null;
    reviewedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

interface DocumentUser {
    id: string;
    fullName: string;
    phoneNumber: string;
    documents: Documents[];
}


interface DocState {
    data: DocumentUser[];       // ⬅️ not nullable
    totalCount: number;
    totalPages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
}

const initialState: DocState = {
    data: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
};


const DocSlice = createSlice({
    name: "documents",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(viewDocThunk.fulfilled, (state, action) => {
                const docData = action.payload.data;
                // console.log(docData)
                if (docData) {
                    state.data = docData.data;
                    state.currentPage = docData.currentPage;
                    state.totalCount = docData.totalCount;
                    state.totalPages = docData.totalPages;
                }
                state.loading = false;
                state.error = null;
            })


            .addCase(viewDocThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                ; // reset previous documents
            })
            .addCase(viewDocThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch documents";
                // reset previous documents
            });

    }
})
export const { } = DocSlice.actions;
export default DocSlice.reducer;
