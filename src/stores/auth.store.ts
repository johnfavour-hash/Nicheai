import type { AuthState } from "@type/auth.type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";



const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: "",
            refreshToken: "",
            expireAt: "",
            setAuth: (auth) => set((state) => ({ ...state, ...auth })),
            clearAuth: () => set({ user: null, token: "", refreshToken: "", expireAt: "" }),
        }),
        {
            name: "user-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                refreshToken: state.refreshToken,
                expireAt: state.expireAt,
            }),
        }
    )
);

export default useAuthStore;