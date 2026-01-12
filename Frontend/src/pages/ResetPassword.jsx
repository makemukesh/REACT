import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/authServices';
import { FiLock, FiShield, FiArrowRight } from 'react-icons/fi';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            await resetPassword({ email, otp, newPassword });
            alert("Password reset successful! Please login with your new password.");
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || "Reset failed. Please check OTP and try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!email) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="bg-white max-w-md w-full p-10 rounded-3xl shadow-xl text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Invalid Session</h2>
                    <p className="text-gray-500 mb-6">Please start the forgot password process again.</p>
                    <button
                        className="px-6 py-3 bg-[#ff3d00] text-white font-bold rounded-xl hover:bg-[#e63600] transition-colors"
                        onClick={() => navigate('/forgot-password')}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white max-w-md w-full p-10 rounded-3xl shadow-xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#ff3d00]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiLock className="text-3xl text-[#ff3d00]" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Reset Password</h1>
                    <p className="text-gray-500 text-sm">
                        Enter the 6-digit OTP sent to <strong className="text-slate-700">{email}</strong> and your new secure password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="6-Digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                        />
                    </div>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                        />
                    </div>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#ff3d00] text-white font-bold rounded-xl hover:bg-[#e63600] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 mt-6"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'} <FiArrowRight />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
