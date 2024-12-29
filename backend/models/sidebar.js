import mongoose from "mongoose";

const SidebarUserSchema = new mongoose.Schema({
    authUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
})

const SideBarUser = mongoose.model("SideBarUser", SidebarUserSchema)
export default SideBarUser;