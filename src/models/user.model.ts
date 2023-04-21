import mongoose from "mongoose";
import { IUser } from "./user.interface";


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    currentDwelling: String,
    availableDwellings: [String],
    refreshToken: String
}, {collection: 'userData'});

export const userModel = mongoose.model<IUser & mongoose.Document>('UserSchema', userSchema);
