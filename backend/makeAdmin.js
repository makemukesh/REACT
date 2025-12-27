import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const makeAdmin = async () => {
    const email = process.argv[2];

    if (!email) {
        console.log("Usage: node backend/makeAdmin.js <email>");
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://makwanamukesh2845_db_user:sALQNeuCLyKUjlvi@cluster01.ylzrc1l.mongodb.net/');
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User with email ${email} not found.`);
            process.exit(1);
        }

        user.role = "admin";
        await user.save();

        console.log(`Success! User ${user.name} (${user.email}) is now an Admin.`);
        console.log("You can now log in and access the Admin Panel.");

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

makeAdmin();
