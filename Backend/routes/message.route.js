import express from 'express';
import { getConversations, getMessages, sendMessage } from '../controllers/messageController.js';
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = express.Router();

router.route("/send/:id").post(isAuthenticated,sendMessage);
router.route("/getConversations").get(isAuthenticated,getConversations);
router.route("/:id").get(isAuthenticated,getMessages)


export default router