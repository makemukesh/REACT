import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyUser } from '../../services/authServices';
const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyUser({ email, otp });
            alert('OTP verified successfully!');
            navigate('/');

        } catch (error) {
            alert(error.response?.data?.message || 'Failed to verify OTP. Please try again.');
        }
    };

    return (
        <section className="verify-otp-page">
            <div className="auth-box">
                <h2>Verify OTP</h2>
                <p>OTP sent to <strong>{email}</strong></p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />

                    <button type="submit">Verify OTP</button>
                </form>
            </div>
        </section>
    );
};

export default VerifyOtp;
