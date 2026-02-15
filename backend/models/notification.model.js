import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // destinataire
    },

    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // celui qui a fait l'action
    },

    type: {
      type: String,
      enum: ["like", "comment", "reply"],
      required: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },

    commentId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
