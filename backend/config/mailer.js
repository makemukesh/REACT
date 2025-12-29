import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'makwanamukesh2845@gmail.com',
    pass: process.env.EMAIL_PASS || 'zhmcgicbdwijfjej',
  },
});

export default transporter;
