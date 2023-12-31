import { Router } from "express";
import { verifyToken } from "../utils/token-manage.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";
const chatRouter = Router();

// Protected APIs.

// /api/v1/chat/new
chatRouter.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

// /api/v1/chat/all-chats
// chatRouter.get("/all-chats", verifyToken, sendChatsToUser);
chatRouter.post("/all-chats", sendChatsToUser);

// /api/v1/chat/delete-chats
chatRouter.delete("/delete", verifyToken, deleteChats);

export default chatRouter;
