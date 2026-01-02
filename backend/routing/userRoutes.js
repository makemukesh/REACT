import express from 'express';
import { register, verifyOtp, login, updateProfile, changePassword, forgotPassword, resetPassword } from '../controllers/user.js';
import sendOtpEmail from '../middlewares/sendOtpMail.js';
import { protect } from '../middlewares/authmiddlewares.js';

const router = express.Router();

// Register: create user, send OTP, respond with message
router.post(
  '/register',
  register,
  sendOtpEmail,
  (req, res) => {
    res.status(200).json({
      message: 'OTP sent to your email. Please verify to complete registration.',
      email: req.body.email,
    });
  }
);

// Verify OTP
router.post('/verify-otp', verifyOtp);

// Login
router.post('/login', login);

// Profile Management
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// Forgot Password
router.post('/forgot-password', forgotPassword, sendOtpEmail, (req, res) => {
  res.status(200).json({ message: "OTP sent to your email for password reset" });
});
router.post('/reset-password', resetPassword);

export default router;

