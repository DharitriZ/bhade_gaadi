import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginUserAction,
  logoutAction,
  verifyLoginOtpAction,
} from "../actions/auth";
import { AuthResponse, User } from "../../lib/type/auth";
import { ApiResponse } from "../../lib/utils/thunk";

export const enum AuthRoute {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}
export interface AuthState {
  phoneNumber: string;
  sessionId: string;
  user: User;
  authRoute: AuthRoute | undefined | null;
}

const initialState: AuthState = {
  phoneNumber: "",
  sessionId: "",
  user: {
    email: "",
    fullName: "",
    id: "",
    phoneNumber: "",
    role: "USER",
    token: undefined,
  },
  authRoute: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.sessionId = action.payload.data.sessionId;
        state.phoneNumber = action.meta.arg;
      })
      .addCase(
        verifyLoginOtpAction.fulfilled,
        (state, action: PayloadAction<ApiResponse<AuthResponse>>) => {
          const user = action.payload.data?.user;
          const token = action.payload.data?.token ?? "";

          state.user.email = user?.email ?? "";
          state.user.phoneNumber = user?.phoneNumber ?? "";
          state.user.fullName = user?.fullName ?? "";
          state.user.role = user?.role ?? "GUEST";
          state.user.token = token;
          state.user.id = user?.id ?? "";

          localStorage.setItem("token", token);
        },
      )
      .addCase(logoutAction.fulfilled, () => {
        return initialState;
      });
  },
});

export default authSlice.reducer;
