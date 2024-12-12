import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { io } from 'socket.io-client'

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLogging: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            if (res.data) {
                set({ authUser: res.data });
                get().connectSoket();
            } else {
                set({ authUser: null });
            }
        } catch (error) {
            set({ authUser: null });
            console.error("Auth check failed:", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        // console.log("signup form data,", data);
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data });
            toast.success("Account created succesfully!");
            get().connectSoket();
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLogging: true });
        // console.log("login form data,", data);
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data });
            toast.success("Login succesfully!")
            get().connectSoket();
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isLogging: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("logout suceessfully")
            get().disConnectSoket();
        }
        catch (error) {
            toast.error(error.response.data.message)
        }
    },

    connectSoket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return;
        const socket = io("http://localhost:1201", {
            query: {
                userId: authUser._id,
            }
        })
        socket.connect()
        set({ socket: socket })
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        })
    },

    disConnectSoket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    }

}))