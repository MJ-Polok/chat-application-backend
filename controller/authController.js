import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { errorHandler } from "../utils/error.js"

export const signup = async (req, res, next) => {
    const { userName, email, password, confirmPassword, gender } = req.body

    let validUser

    validUser = await User.findOne({ email })

    if (validUser) {
        // return res.status(404).json({
        //     success: false,
        //     message: "User already exist"
        // })

        return next(errorHandler(400, "User already exist"))
    }

    if (password !== confirmPassword) {
        // return res.status(400).json({
        //     error: "Password don't match!"
        // })

        return next(errorHandler(400, "Password don't matched"))
    }

    const validUserName = await User.findOne({ userName })

    if (validUserName) {
        return next(errorHandler(400, "Username already exits"))

    }

    // const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, 10)


    const boyPP = `https://avatar.iran.liara.run/public/boy?username=${userName}`
    const girlPP = `https://avatar.iran.liara.run/public/girl?username=${userName}`

    const newUser = new User({
        userName,
        email,
        password: hashPassword,
        gender,
        profilePic: gender === "male" ? boyPP : girlPP
    })
    try {
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)

        await newUser.save()

        res.cookie("access_token", token, { httpOnly: true }).status(201).json({
            _id: newUser._id,
            username: newUser.userName,
            email: newUser.email,
            profilePic: newUser.profilePic
        })
    } catch (error) {
        //     console.log(error)
        //     res.status(500).json({
        //         error: "Internal server error"
        //     })
        // }

        next(error)
    }
}
export const login = (req, res) => {

}
export const logout = (req, res) => {

}