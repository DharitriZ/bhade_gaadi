import { createAsyncThunk } from "@reduxjs/toolkit";
import { withToastForError } from "../../lib/utils/thunk";
import API from "../../lib/api";

export const getDashboardAction = createAsyncThunk(
    "admin/dashboard",
    withToastForError(async () => {
        return await API.get("/admin/dashboard-stats").then((res: any) => res.data);
    })
);