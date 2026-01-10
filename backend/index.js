import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routing/userRoutes.js';
import productRoutes from './routing/productRoutes.js';
import carRoutes from './routing/carRoutes.js';
import orderRoutes from './routing/orderRoutes.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors({
  origin: 'https://react-liard-gamma.vercel.app',
  credentials: true
}));
app.use(express.json());

app.use('/api/admin/cars', carRoutes);
app.use('/users', userRoutes);
app.use('/api/admin/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Backend is running...');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} (Bound to 0.0.0.0)`);
  console.log(`Environment PORT: ${process.env.PORT}`);
});