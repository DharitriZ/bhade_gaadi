import { createAsyncThunk } from "@reduxjs/toolkit";
import { withToastForError } from "../../lib/utils/thunk";
import API from "../../lib/api";

interface ReviewDocumentParams {
    id: string;
    status: "APPROVED" | "REJECTED"; // match your `DocumentStatus` enum
    rejectionReason?: string;
}

export const getPendingDocumentsAction = createAsyncThunk(
    "documents/getAllPending",
    withToastForError(async ({ search, page, pageSize }: { search: string, page: number, pageSize: number }) => {
        return await API.get("/documents/pending", {
            params: { search, page, pageSize },
        }).then((res: any) => res.data);
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

            const response = await API.post(`/documents/${id}/review`, payload);
            return response.data;
        }
    )
);