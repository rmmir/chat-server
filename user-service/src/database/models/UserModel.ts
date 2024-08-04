import mongoose, { Schema, Document } from "mongoose"
import validator from "validator";

export interface UserData extends Document {
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

const userSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            unique: true,
            trim: true,
            minLength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, 'Please provide a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minLength: 8,
        }
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model<UserData>('User', userSchema)

export default User