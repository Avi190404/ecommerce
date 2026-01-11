import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String, 
        default: "user", 
        enum: ["admin", "user"]
    },
},{ timestamps: true });

const USER = mongoose.models.User || mongoose.model("User", userSchema);

export default USER;