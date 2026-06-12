import mongoose from "mongoose";

const conversationModel = new mongoose.Schema({
    participent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],

   messages: {
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }],
    default: []
}
},{timestamps:true});

const Conversation = mongoose.model("Conversation",conversationModel);

export default Conversation;