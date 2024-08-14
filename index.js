import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()


const dburi = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ll8pd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const app = express()
const PORT = process.env.PORT || 3000

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
import authRoutes from "./routers/authRoutes/js"

app.use('/api/auth', authRoutes)

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
})