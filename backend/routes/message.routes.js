import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  sendMessage,
  getConversation,
  getInbox,
  markMessageAsRead,
  countUnreadMessages,
  deleteMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

// toutes les routes sont protégées
router.post("/", authMiddleware, sendMessage);
router.get("/inbox", authMiddleware, getInbox);
router.get("/conversation/:userId", authMiddleware, getConversation);

router.get("/unread/count", authMiddleware, countUnreadMessages); // comptage des messages non lus
router.patch("/:id/read", authMiddleware, markMessageAsRead); // marquer comme lu
router.delete("/:id", authMiddleware, deleteMessage);

export default router;
