import { AuthService } from "@services/auth.service"
import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import type { LoginData, LoginResponse, SignupData, SignupResponse } from "@type/auth.type"


// auth hook
export const AuthHook = {
    useLogin: (options?: UseMutationOptions<LoginResponse, Error, LoginData, unknown>) => useMutation<LoginResponse, Error, LoginData, unknown>({
        mutationFn: async (payload: LoginData) => {
            const data = await AuthService.login(payload);
            return {
                token: data.session?.access_token || "",
                refreshToken: data.session?.refresh_token || "",
                expireAt: data.session?.expires_at?.toString() || ""
            };
        },
        ...options
    }),
    useSignup: (options?: UseMutationOptions<SignupResponse, Error, SignupData, unknown>) => useMutation<SignupResponse, Error, SignupData, unknown>({
        mutationFn: async (payload: SignupData) => {
            const data = await AuthService.signup(payload);
            return {
                token: data.session?.access_token || "",
                refreshToken: data.session?.refresh_token || "",
                expireAt: data.session?.expires_at?.toString() || ""
            };
        },
        ...options
    }),
    // ... other auth hooks here
}