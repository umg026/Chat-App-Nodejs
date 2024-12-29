import mongoose from "mongoose";
import { getReciverSocketId, io } from "../config/socket.js";
import Message from "../models/message.js";
import SideBarUser from "../models/sidebar.js";
import User from "../models/userModel.js";

const getAllUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        // console.log("loggedInUser", req.user._id);
        // console.log("userId in msg controllr", loggedInUser);
        const filtredUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        // console.log("filtredUser", filtredUser);
        return res.status(200).json(filtredUser)
    }
    catch (error) {
        console.log("error in userSidbar", error);
        res.status(500).json({ msg: "Internal server error ", error })
    }
}

const getMessages = async (req, res) => {
    try {
        const { id: userChatId } = req.params
        // console.log("id in get message", userChatId);
        const senderId = req.user._id
        // console.log("senderId", senderId);

        const message = await Message.find({
            $or: [
                { senderId: senderId, receiverId: userChatId },
                { senderId: userChatId, receiverId: senderId }
            ]
        })
        return res.status(200).json(message)

    }
    catch (error) {
        console.log("error in getmessage", error);
        res.status(500).json({ msg: "Internal server error ", error })
    }
}

const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        // console.log("sendmessage", req.body);
        const { id: receiverId } = req.params;
        const senderId = req.user._id
        // console.log("receiverId", receiverId, senderId);

        const newMessage = new Message({
            senderId,
            receiverId,
            text
        })
        await newMessage.save();
        //send also to the users 
        const recieverSoketId = getReciverSocketId(receiverId)
        if (recieverSoketId) {
            io.to(recieverSoketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
    }
    catch (error) {
        console.log("error in sendMessage", error);
        res.status(500).json({ msg: "Internal server error ", error })
    }
}

const addUsersSideBar = async (req, res) => {
    try {
        const authUserId = req.user.id;
        const { users } = req.body;
        console.log("authId", authUserId, "sidebar user id :", users);

        if (!authUserId || !users || users.length === 0) {
            return res.status(400).json({
                AuthId: authUserId,
                userID: users,
                msg: "Invalid input. Auth ID and users are required."
            });
        }

        let sidebar = await SideBarUser.findOne({ authUserId });

        if (!sidebar) {
            // If no sidebar exists, create a new one
            sidebar = new SideBarUser({
                authUserId,
                users,
            });
            console.log("new user added");

        }
        else {
            const existingUsers = new Set(sidebar.users);
            console.log("existingUsers", sidebar.users);

            users.forEach((userId) => existingUsers.add(userId));
            sidebar.users = Array.from(existingUsers);
        }
        await sidebar.save();
        console.log("Users added to sidebar successfully");

        res.status(200).json({
            msg: "Users added to sidebar successfully",
            sidebar,
        });
    }
    catch (error) {
        console.error("Error in addUsersSideBar:", error);
        res.status(500).json({ msg: "You fuckedup bro!", error });
    }
}

const getUsersSidebar = async (req, res) => {
    try {
        const authId = req.user._id;
        if (!mongoose.Types.ObjectId.isValid(authId)) {
            return res.status(400).json({ msg: "Invalid authId" });
        }
        const sidebarentry = await SideBarUser.findOne({ authUserId: authId })
        if (!sidebarentry) {
            return;
        }
        return res.status(200).json({ users: sidebarentry.users });
    }
    catch (error) {
        // console.error("Error fetching sidebar users:", error);
        res.status(500).json({ msg: "Internal server error.", error });
    }
}

export {
    getUsersSidebar, getMessages, sendMessage, addUsersSideBar, getAllUsers
}