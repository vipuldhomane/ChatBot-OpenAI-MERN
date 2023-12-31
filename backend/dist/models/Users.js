import mongoose from "mongoose";
import { randomUUID } from "crypto";
const { Schema } = mongoose;
const chatSchema = new Schema({
    id: {
        type: String,
        default: randomUUID(), // this will generate random string for the id
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [chatSchema], // this array will of the elements of chatSchema
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=Users.js.map