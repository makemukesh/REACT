import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {
  const jwtsecret = "MERNSTACKSECRETKEY";
  if (!jwtsecret) {
    throw new Error("JWT_SECRET not configured");
  }
  return jwt.sign(
    { id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    }, 
    jwtsecret, 
    {
    expiresIn: "8d",
  });
};

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const register = async (req, res, next) => {
  try {
    console.log('register function started...');
    const { name, email, password } = req.body;

    //validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }


    console.log('registering user:', email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isVerified) {
        console.log('User already exists and is verified:', email);
        return res.status(400).json({ message: "User already exists" });
      }

      // If user exists but not verified, resend OTP
      console.log('unverified user found, deleting old record....');
      await User.deleteOne({ email });
      console.log('Old unverified user deleted');
    }
    const otp = generateOtp();
    console.log('Generated OTP:', otp);
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Creating new user record...');
    await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
      isVerified: false,
    });
    console.log('User created Successfully:', email);

    req.otpData = {
      email,otp, type: 'registration'
    }// Attach OTP to request object for email sending
    console.log('setting req.otp and calling next()...');
    next();
  } catch (error) {
    console.error('registererror:', error);
    res.status(500).json({ message: "Server error", error: error.message });

  }
  };

  export const verifyOtp = async (req, res) => {
    try {
      console.log('Verify OTP function started ');
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
      }

      console.log('Verifying OTP for:', email);
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found');        
        return res.status(400).json({ message: "User not found" });
      }

      if (user.isVerified) {
        console.log('User already verified');        
        return res.status(400).json({ message: "User already verified" });
      }
      

      if (user.otp !== otp) {
        console.log('Invalid OTP provided');        
        return res.status(400).json({ message: "Invalid OTP" });
      }

      if (user.otpExpiry < Date.now()) {
        console.log('OTP has expired');        
        return res.status(400).json({ message: "OTP has expired" });
      }

      console.log('OTP verified ,updating user...');
      user.isVerified = true;
      user.otp =undefined;
      user.otpExpiry = undefined;
      await user.save();

      console.log('Generating JWT token...');
      const jwtsecret = ("MERNSTACKSECRETKEY");
      if (!jwtsecret) {
        console.error('JWT_SECRET not configured');
        return res.status(500).json({ message: "Server error" });
      }


      const token = generateToken(user);
      console.log('User verified successfully:', user.email);

      res.status(200).json({ message: "OTP verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      } });
    } catch (error) {
      console.error('verifyOtp error:', error);
      res.status(500).json({ message: "Server error", error: error.message });
    } 
  };

  export { register };
        