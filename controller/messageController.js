import Conversation from "../models/conversation.model.js"
import Message from "../models/messages.model.js"

export const sendMessage = async (req, res, next) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user.id

        console.log(senderId);


        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            console.log("hello");

            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()])
        // await conversation.save()
        // await newMessage.save()

        // socket io functionality

        res.status(201).json(newMessage)
    } catch (error) {
        next(error)
        console.log(error);

    }
}

export const getMessage = async (req, res, next) => {
    try {
        const { id: userToMessage } = req.params
        const senderId = req.user.id

        const conversation = await Conversation .findOne({
            participants: {$all: [senderId, userToMessage]}
        }).populate('messages')

        console.log(conversation);
        

        

        if (!conversation) {
            return res.status(200).json([])
        }

        const messages = conversation.messages

        res.status(200).json(messages)
    } catch (error) {
        next(error)
    }
}