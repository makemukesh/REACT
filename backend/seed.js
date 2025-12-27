import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.js";

dotenv.config();

const cars = [
    {
        title: "BMW M4 Competition",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2670&auto=format&fit=crop",
        price: 89000,
        description: "The BMW M4 Competition Coupe offers 503 horsepower and 0-60 mph in just 3.8 seconds.",
        genre: "Coupe",
        stock: 5,
        isActive: true
    },
    {
        title: "BMW M8 Gran Coupe",
        image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2693&auto=format&fit=crop",
        price: 130000,
        description: "The M8 Gran Coupe is a 4-door luxury sports car with a 4.4-liter V-8 engine that delivers 617 horsepower.",
        genre: "Sedan",
        stock: 3,
        isActive: true
    },
    {
        title: "BMW X7 M60i",
        image: "https://images.unsplash.com/photo-1631295868223-63260951a3f4?q=80&w=2574&auto=format&fit=crop",
        price: 108000,
        description: "The BMW X7 M60i is the largest and most luxurious SAV in the BMW lineup, featuring mild-hybrid technology.",
        genre: "SUV",
        stock: 6,
        isActive: true
    },
    {
        title: "BMW i7 xDrive60",
        image: "https://images.unsplash.com/photo-1662998363740-45f94a737409?q=80&w=2535&auto=format&fit=crop",
        price: 119300,
        description: "The first-ever all-electric BMW i7 combines electric performance with multisensory entertainment.",
        genre: "Electric",
        stock: 2,
        isActive: true
    },
    {
        title: "BMW Z4 M40i",
        image: "https://images.unsplash.com/photo-1555215696-99ac45e43d34?q=80&w=1956&auto=format&fit=crop",
        price: 66300,
        description: "A classic roadster reinterpreted. The BMW Z4 M40i is built for pure driving pleasure.",
        genre: "Convertible",
        stock: 4,
        isActive: true
    }
];

const seedDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://makwanamukesh2845_db_user:sALQNeuCLyKUjlvi@cluster01.ylzrc1l.mongodb.net/');
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        await Product.deleteMany({}); // Optional: Clear existing products
        console.log("Existing products cleared");

        await Product.insertMany(cars);
        console.log("Cars seeded successfully!");

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDB();
