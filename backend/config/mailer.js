import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'makwanamukesh2845@gmail.com',
    pass: 'zhmcgicbdwijfjej',
  },
});

export default transporter;
