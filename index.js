import cors from 'cors'
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from 'cookie-parser'
import { server, app } from './socket/socket.js'

dotenv.config()


const dburi = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ll8pd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(cookieParser())

mongoose.connect(dburi)
    .then(() => {
        console.log("connected to mongoDB");
    })
    .catch(err => {
        console.log(err);
    })

app.get("/", (req, res) => {
    res.send("Hello Every One")
})

// imports routes
import authRoutes from "./routers/authRoutes.js"
import messageRoute from "./routers/messageRoute.js"
import userRoute from "./routers/userRoutes.js"

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoute)
app.use('/api/users', userRoute)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
