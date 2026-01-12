import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyUser } from '../../services/authServices';
import { FiShield, FiArrowRight } from 'react-icons/fi';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await verifyUser({ email, otp });
            alert('OTP verified successfully!');
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-teal-100 to-pink-100 flex items-center justify-center p-6">
            <div className="bg-white max-w-md w-full p-12 rounded-3xl shadow-xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#ff3d00]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiShield className="text-3xl text-[#ff3d00]" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Verify OTP</h2>
                    <p className="text-gray-500">
                        OTP sent to <strong className="text-slate-700">{email}</strong>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl bg-gray-50 text-center text-xl font-semibold tracking-widest focus:outline-none focus:border-[#ff3d00] focus:bg-white transition-all"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#ff3d00] text-white font-bold rounded-xl hover:bg-[#e63600] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'} <FiArrowRight />
                    </button>
                </form>
            </div>
        </section>
    );
};

export default VerifyOtp;
