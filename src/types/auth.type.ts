
export interface AuthState {
    user: { id: string; name: string; email: string } | null;
    token: string;
    refreshToken: string;
    expireAt: string;
    setAuth: (auth: Partial<AuthState>) => void;
    clearAuth: () => void;
}


// login
export interface LoginData {
    email: string;
    password: string;
}
export interface LoginResponse {
    token: string;
    refreshToken: string;
    expireAt: string;
}

// signup
export type { SignupFormData } from "@schemas/auth/signup.schema";
export interface SignupData {
    name: string;
    email: string;
    phone: string;
    password: string;
}
export interface SignupResponse {
    token: string;
    refreshToken: string;
    expireAt: string;
}
