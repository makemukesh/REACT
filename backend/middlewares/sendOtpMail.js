import transporter from '../config/mailer.js';

const sendOtpEmail = async (req, res, next) => {
  try{
    const { email, otp, next } = next.otpData;

    const subject = type === 'registration failed' ? 'Your Registration OTP' : 'Your Password Reset OTP';
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
    }); 
    next();
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
}

export default sendOtpEmail;