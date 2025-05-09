export interface User {
  id: string;
  phoneNumber: string;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN" | "GUEST";
  token?: string;
}

export interface VerifyLoginPayload {
  phoneNumber: string;
  sessionId: string;
  otp: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    phoneNumber: string;
    fullName: string;
    email: string;
    role: "USER" | "ADMIN" | "GUEST";
  };
}
