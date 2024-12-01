import Message from "../models/message.js";
import User from "../models/usermodel.js";

const getUsersSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        console.log("userId in msg controllr", loggedInUser);
        const filtredUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        console.log("filtredUser", filtredUser);
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
        console.log("id in get message", id);
        const senderId = req.user._id
        console.log("senderId", senderId);

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

const sendMessage = async (req,res) => {
  try {
    const {text, image} = req.body;
    console.log("sendmessage", req.body);
    const {id:receiverId} =req.params;
    const senderId =req.user._id
    console.log("receiverId", receiverId, senderId);

    const newMessage = new Message({
        senderId,
        receiverId,
        text
    })
    await newMessage.save();
    // realtime fun here 
  res.status(201).json(newMessage)
   } 
  catch (error) {
    console.log("error in sendMessage", error);
    res.status(500).json({ msg: "Internal server error ", error })
  }
}

export {
    getUsersSidebar, getMessages,sendMessage
}