import express from 'express';
import sendOtpEmail from '../middlewares/sendOtpMail';

const router = express.Router();

router.post('/register', register, sendOtpEmail, (req, res) => {
  res.status(200).json({ message: 'Registration successful, OTP sent to email' });
});

router.post('/verify-otp', verifyOtp, (req, res) => {
  res.status(200).json({ message: 'OTP verified successfully' });
}); 
export default router;