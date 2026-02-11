// src/services/auth.service.ts
import { supabase } from "@configs/supabase";
import type { LoginData, SignupFormData } from "@type/auth.type";

export const AuthService = {
    // 1. Sends the 6-digit code to the user's email
    signup: async (payload: SignupFormData) => {
        const { data, error } = await supabase.auth.signUp({
            email: payload.email,
            password: payload.password,
            options: {
                data: {
                    full_name: payload.name, // This stores the username in the metadata
                    phone_number: payload.phone,
                },
            },
        });
        if (error) throw error;
        return data;
    },

    // 2. Verifies the code the user types in
    verifyOTP: async (email: string, token: string) => {
        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'signup',
        });
        if (error) throw error;
        return data;
    },

    // 3. Standard Login
    login: async (payload: LoginData) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: payload.email,
            password: payload.password,
        });
        if (error) throw error;
        return data;
    },

    // 4. Sign in with Google
    signInWithGoogle: async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            },
        });
        if (error) throw error;
        return data;
    },

    logout: async () => {
        await supabase.auth.signOut();
        window.location.href = "/auth/login";
    }
};