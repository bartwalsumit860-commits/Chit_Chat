import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { io, userSocketMap } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        let conversation = await Conversation.findOne({
            participent: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participent: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        conversation.messages.push(newMessage._id);
        await conversation.save();

        const populatedMessage = await Message.findById(
            newMessage._id
        ).populate("senderId", "fullName profilePhoto");

        const receiverSocketId =
            userSocketMap[receiverId.toString()];

        if (receiverSocketId) {
            io.to(receiverSocketId).emit(
                "newMessage",
                populatedMessage
            );
        }

        return res.status(201).json({
            success: true,
            newMessage: populatedMessage
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};
export const getMessages = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;

        const conversation = await Conversation.findOne({
            participent: { $all: [senderId, receiverId] }
        }).populate({
            path: "messages",
            populate: {
                path: 'senderId',
                select: 'fullName profilePhoto'
            }
        });

        if (!conversation) {
            return res.status(200).json({
                messages: [],
                success: true
            });
        }

        return res.status(200).json({
            messages: conversation.messages,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};

export const getConversations = async (req, res) => {
    try {
        const senderId = req.id;
        const conversations = await Conversation.find({
            participent: { $in: [senderId] }
        }).populate({
            path: "participent",
            select: "fullName profilePhoto"
        });

        const convo_users = conversations.map(convo => {
            return convo.participent.find(
                user => user._id.toString() !== senderId.toString()
            );
        });

        return res.status(200).json({
            message: "All current conversations fetched successfully",
            convo_users,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something Went Wrong",
            success: false
        });
    }
};