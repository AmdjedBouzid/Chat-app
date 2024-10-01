import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  members: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    default: [],
  },
  messages: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "Message" }],
  },
  Isgroupe: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
  lastmessage_at: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

export default Chat;
