import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuth";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    unreadMessages: {},
    sidebarUsers: [],

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/msg/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    addUsersForSidebar: async (users, userId) => {
        // console.log("Added users ", users, "auth users", userId);
        set((state) => ({
            sidebarUsers: [...state.sidebarUsers, ...users],
          }));
        try {
            await axiosInstance.post(`/msg/add-users/${userId}`, {
                users: users
            });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getUserForSideBar: async () => {
        try {
            const res = await axiosInstance.get("/msg/get-users");
             set({sidebarUsers:res.data.users})
            console.log("response for get users", res);
        }
        catch (error) {
            console.log("error", error);
            toast.error(error.response.data.msg);
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/msg/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    setSelectedUser: (selectedUser) => {
        set({ selectedUser })
        set((state) => {
            const unreadMessages = { ...state.unreadMessages };
            console.log("unreadMessgaes", unreadMessages);

            delete unreadMessages[selectedUser._id]; // Mark this user's messages as read
            return { unreadMessages };
        });
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        try {
            const res = await axiosInstance.post(`/msg/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data] })
        }
        catch (error) {
            toast.error(error.response.data.message)
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            set((state) => {
                const unreadMessages = { ...state.unreadMessages };
                if (newMessage.senderId !== selectedUser?._id) {
                    unreadMessages[newMessage.senderId] = (unreadMessages[newMessage.senderId] || 0) + 1;
                }
                return { unreadMessages };
            })



            set({
                messages: [...get().messages, newMessage]
            })
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

}))

