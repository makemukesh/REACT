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
        <div className="auth-page-container">
            <div className="auth-card" style={{ maxWidth: '500px', height: 'auto', padding: '40px' }}>
                <div className="auth-form-section" style={{ padding: '0' }}>
                    <div className="form-header" style={{ textAlign: 'center' }}>
                        <h1>Forgot Password?</h1>
                        <p>Enter your account email to receive a password reset OTP.</p>
                    </div>

                    <form className="modern-form" onSubmit={handleSubmit}>
                        <div className="input-field">
                            <FiMail className="input-icon" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-auth-primary" disabled={loading}>
                            {loading ? 'Sending...' : 'Send OTP'} <FiArrowRight />
                        </button>
                    </form>

                    <div className="form-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Link to="/auth" className="back-to-login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-light)', textDecoration: 'none' }}>
                            <FiArrowLeft /> Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
