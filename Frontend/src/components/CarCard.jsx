import React from 'react';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            {/* Car Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                    alt={car.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
                    }}
                />
                {car.genre && (
                    <div className="absolute top-3 left-3 bg-[#ff3d00] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {car.genre}
                    </div>
                )}
            </div>

            {/* Car Info */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">{car.title}</h3>
                    <span className="text-[#ff3d00] font-bold text-lg whitespace-nowrap ml-2">
                        ${car.price ? car.price.toLocaleString() : "N/A"}
                    </span>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {car.description
                        ? car.description.substring(0, 100) + "..."
                        : "Premium vehicle."}
                </p>

                {/* Specs */}
                <div className="flex gap-4 mb-4 py-3 border-t border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Type</span>
                        <span className="text-sm font-medium text-slate-700">{car.genre || "N/A"}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Stock</span>
                        <span className={`text-sm font-medium ${car.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {car.stock > 0 ? "Available" : "Out of Stock"}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        className="flex-1 py-2.5 px-4 bg-[#ff3d00] text-white text-sm font-semibold rounded-lg hover:bg-[#e63600] transition-colors duration-300"
                        onClick={() => navigate(`/car/${car._id}`)}
                    >
                        View Details
                    </button>
                    <button className="flex-1 py-2.5 px-4 border-2 border-[#ff3d00] text-[#ff3d00] text-sm font-semibold rounded-lg hover:bg-[#ff3d00] hover:text-white transition-all duration-300">
                        Book Test Drive
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
