import User from "../models/Users.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    console.log("chat completion");
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        // grab chats of user
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // send all chats with new one to openAI API
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        // get latest response
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log("failed ");
        console.log(error);
        return res.status(500).json({ message: "something went wrong" });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        // check if cookies exits
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not Registered of Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        // delete the chats
        // @ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "Ok" });
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({ message: "ERROR", cause: err.message });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        // check if cookies exits
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not Registered of Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        // send the chats to user
        return res.status(200).json({ message: "Ok", chats: user.chats });
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({ message: "ERROR", cause: err.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map