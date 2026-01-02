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
            navigate('/auth');
        } catch (error) {
            alert(error.response?.data?.message || "Reset failed. Please check OTP and try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!email) {
        return (
            <div className="auth-page-container">
                <div className="auth-card" style={{ maxWidth: '500px', padding: '40px', textAlign: 'center' }}>
                    <h2>Invalid Session</h2>
                    <p>Please start the forgot password process again.</p>
                    <button className="btn-auth-primary" onClick={() => navigate('/forgot-password')}>Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page-container">
            <div className="auth-card" style={{ maxWidth: '500px', height: 'auto', padding: '40px' }}>
                <div className="auth-form-section" style={{ padding: '0' }}>
                    <div className="form-header" style={{ textAlign: 'center' }}>
                        <h1>Reset Password</h1>
                        <p>Enter the 6-digit OTP sent to <strong>{email}</strong> and your new secure password.</p>
                    </div>

                    <form className="modern-form" onSubmit={handleSubmit}>
                        <div className="input-field">
                            <FiShield className="input-icon" />
                            <input
                                type="text"
                                placeholder="6-Digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <FiLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <FiLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-auth-primary" disabled={loading}>
                            {loading ? 'Resetting...' : 'Reset Password'} <FiArrowRight />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
