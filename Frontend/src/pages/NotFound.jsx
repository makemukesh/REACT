import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-6">
            <div className="text-center">
                <div className="text-9xl font-black text-[#ff3d00] mb-6 animate-pulse">404</div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Oops! Page Not Found</h1>
                <p className="text-white/70 max-w-md mx-auto mb-8">
                    The road you're looking for doesn't exist. Maybe you took a wrong turn?
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#ff3d00] text-white font-bold rounded-xl hover:bg-[#e63600] transition-all duration-300 shadow-lg"
                >
                    <FiHome /> Back to Safety
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
