import { Router } from "express";
import { verifyToken } from "../utils/token-manage.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chat-controllers.js";
const chatRouter = Router();

export default chatRouter;

// Protected APIs.
chatRouter.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
