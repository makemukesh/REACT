import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    fuelType: {
      type: String,
      required: false,
    },
    mileage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model('Car', carSchema);

export default Car;

