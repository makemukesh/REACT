import express from 'express';
import sendOtpEmail from '../middlewares/sendOtpMail.js';
import { registerUser, verifyOtp } from '../controllers/user.js';

const router = express.Router();

router.post('/register',registerUser , sendOtpEmail, (req, res) => {
  res.status(200).json({ message: 'Registration successful, OTP sent to email' });
});

router.post('/verify-otp', verifyOtp, (req, res) => {
  res.status(200).json({ message: 'OTP verified successfully' });
}); 
export default router;