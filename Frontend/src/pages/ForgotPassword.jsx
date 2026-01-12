import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPassword } from '../../services/authServices';
import { FiMail, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await forgotPassword({ email });
            alert("OTP sent to your email!");
            navigate('/reset-password', { state: { email } });
        } catch (error) {
            alert(error.response?.data?.message || "Failed to send reset OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white max-w-md w-full p-10 rounded-3xl shadow-xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#ff3d00]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiMail className="text-3xl text-[#ff3d00]" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Forgot Password?</h1>
                    <p className="text-gray-500 text-sm">Enter your account email to receive a password reset OTP.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#ff3d00] text-white font-bold rounded-xl hover:bg-[#e63600] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading ? 'Sending...' : 'Send OTP'} <FiArrowRight />
                    </button>
                </form>

                <div className="text-center mt-8">
                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 text-gray-500 hover:text-[#ff3d00] transition-colors"
                    >
                        <FiArrowLeft /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
