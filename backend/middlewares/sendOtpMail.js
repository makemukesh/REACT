import transporter from '../config/mailer.js';
import dotenv from 'dotenv';
dotenv.config();
const sendOtpEmail = async (req, res, next) => {
  try {
    // otpData must be attached earlier (from controller or previous middleware)
    const { email, otp, type } = req.otpData;

    const subject =
      type === 'registration'
        ? 'Your Registration OTP'
        : 'Your Password Reset OTP';

    await transporter.sendMail({
      from: 'makwanamukesh2845@gmail.com',
      to: email,
      subject,
      text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
    });

    next(); // ✅ move to next middleware/controller
  } catch (error) {
    console.error('Error sending OTP email:', error);
    next(error); // ✅ Express error handling
  }
};

export default sendOtpEmail;
