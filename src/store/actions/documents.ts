import { createAsyncThunk } from "@reduxjs/toolkit";
import { withToastForError } from "../../lib/utils/thunk";
import API from "../../lib/api";

interface ReviewDocumentParams {
    id: string;
    status: "APPROVED" | "REJECTED";
    rejectionReason?: string;
}

export const getPendingDocumentsAction = createAsyncThunk(
    "documents/getAllPending",
    withToastForError(async ({ search, page, pageSize }: { search: string, page: number, pageSize: number }) => {
        return await API.get("/documents", {
            params: { search, page, pageSize, status: "PENDING" },
        }).then((res: any) => res.data);
    })
);

export const getApprovedDocumentsAction = createAsyncThunk(
    "documents/getAllApproved",
    withToastForError(async ({ search, page, pageSize }: { search: string, page: number, pageSize: number }) => {
        return await API.get("/documents", { params: { search, page, pageSize, status: "APPROVED" } }).then((res: any) => res.data);
    })
);

export const getRejectedDocumentsAction = createAsyncThunk(
    "documents/getAllRejected",
    withToastForError(async ({ search, page, pageSize }: { search: string, page: number, pageSize: number }) => {
        return await API.get("/documents", { params: { search, page, pageSize, status: "REJECTED" } }).then((res: any) => res.data);
    })
);

export const reviewDocumentAction = createAsyncThunk(
    "documents/review",
    withToastForError(
        async ({ id, status, rejectionReason }: ReviewDocumentParams) => {
            const payload = { status };
            if (status === "REJECTED" && rejectionReason) {
                payload["rejectionReason"] = rejectionReason;
            }

            const response = await API.put(`/documents/${id}/review`, payload);
            return response.data;
        }
    )
);