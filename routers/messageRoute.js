import express from "express"
import { sendMessage } from "../controller/messageController.js"
import { isAuthenticate } from "../middleware/verifyToken.js"

const router = express.Router()

// router.post("/send/:id", sendMessage)
router.post("/send/:id",isAuthenticate, sendMessage)

export default router