import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const migrateBrands = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/car-service');
        console.log('Connected to MongoDB');

        const products = await Product.find({ brand: { $exists: false } });
        console.log(`Found ${products.length} products without brands.`);

        const validBrands = ['BMW', 'Mercedes', 'Audi', 'Bentley', 'Porsche', 'Ferrari', 'Lamborghini', 'Rolls Royce'];

        for (const product of products) {
            const foundBrand = validBrands.find(b => product.title.toLowerCase().includes(b.toLowerCase()));
            product.brand = foundBrand || 'BMW';
            await product.save();
            console.log(`Updated ${product.title} with brand ${product.brand}`);
        }

        console.log('Migration completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrateBrands();
