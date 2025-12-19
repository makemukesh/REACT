import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }   
        const otp = generateOtp();
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword,
            otp,
            otpExpiry: Date.now() + 10 * 60 * 1000,
            isVerified: false
        });
        req.otpData = { email, otp, type: 'registration Failed' };
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' , error: error.message });
    }
};

export  const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;    
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }   
        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
       
    } catch (error) {
        
        res.status(500).json({ message: 'Server error' , error: error.message });
    }
};