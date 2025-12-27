import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
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
        otp: {
            type: String,
            required: false,
        },
        otpExpiry: {
            type: Date,
            required: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
<<<<<<< HEAD
=======
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
>>>>>>> 699a03d (inital deployment)
    },
    {
        timestamps: true,
    }
);


const User = mongoose.model('User', userSchema);

export default User;    
