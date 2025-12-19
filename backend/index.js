import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

connectDB();


const app = express();
app.use(cors());
app.use(express.json());




import carRoutes from './routing/carRoutes.js';
app.use('/api/cars', carRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Backend  is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
