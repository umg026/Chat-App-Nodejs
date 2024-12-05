import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLogging: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            console.log("API response:", res.data);
            set({ authUser: res.data });
        } catch (error) {
            set({ authUser: null })
            console.log("error in auth user in store", error);
        } finally {
            set({ isCheckingAuth: false })
        }
    }
}))