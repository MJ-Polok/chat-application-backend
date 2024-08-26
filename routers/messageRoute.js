import express from "express"
import { getMessage, sendMessage } from "../controller/messageController.js"
import { isAuthenticate } from "../middleware/verifyToken.js"

const router = express.Router()

// router.post("/send/:id", sendMessage)
router.post("/send/:id", isAuthenticate, sendMessage)
router.get("/:id", isAuthenticate, getMessage)

export default router