import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile, changePassword } from '../../services/authServices';
import { FiUser, FiMail, FiLock, FiShield, FiEdit2, FiCheck, FiX, FiArrowLeft, FiLogOut } from 'react-icons/fi';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [profileForm, setProfileForm] = useState({ name: '', email: '' });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    const decodeToken = (token) => {
      try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
      } catch (e) {
        return null;
      }
    };

    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/');
      return;
    }

    const decoded = decodeToken(token);
    if (decoded) {
      setUser({
        id: decoded.id,
        name: decoded.name || "User",
        email: decoded.email || "",
        role: decoded.role || "user"
      });
      setProfileForm({ name: decoded.name || "User", email: decoded.email || "" });
    }
    setLoading(false);
  }, [navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(profileForm);
      localStorage.setItem('token', res.data.token);
      setUser({ ...user, name: profileForm.name, email: profileForm.email });
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }
    try {
      await changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      });
      setIsChangingPassword(false);
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to change password' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/');
    window.location.reload();
  };

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (!user) return null;

  const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="profile-page-modern">
      <div className="profile-hero-section">
        <div className="hero-overlay"></div>
        <div className="profile-header-content">
          <button onClick={() => navigate(-1)} className="btn-back-profile"><FiArrowLeft /> Back</button>
          <div className="profile-avatar-giant">{initials}</div>
          <div className="profile-intro">
            <h1>{user.name}</h1>
            <p><FiShield /> {user.role.toUpperCase()} PORTAL</p>
          </div>
        </div>
      </div>

      <div className="profile-grid-container">
        <div className="profile-main-card">
          {message.text && (
            <div className={`profile-alert ${message.type}`}>
              {message.type === 'success' ? <FiCheck /> : <FiX />}
              {message.text}
            </div>
          )}

          <div className="card-section">
            <div className="section-header">
              <FiUser />
              <h2>Account Details</h2>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="btn-edit-inline">
                  <FiEdit2 /> Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="profile-edit-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
                  <button type="submit" className="btn-save">Save Changes</button>
                </div>
              </form>
            ) : (
              <div className="profile-detail-list">
                <div className="detail-item">
                  <label>Display Name</label>
                  <p>{user.name}</p>
                </div>
                <div className="detail-item">
                  <label>Email Address</label>
                  <p>{user.email}</p>
                </div>
                <div className="detail-item">
                  <label>Account Role</label>
                  <p className="role-tag">{user.role}</p>
                </div>
              </div>
            )}
          </div>

          <div className="card-spacer"></div>

          <div className="card-section">
            <div className="section-header">
              <FiLock />
              <h2>Security Settings</h2>
              {!isChangingPassword && (
                <button onClick={() => setIsChangingPassword(true)} className="btn-edit-inline">
                  <FiEdit2 /> Update Password
                </button>
              )}
            </div>

            {isChangingPassword ? (
              <form onSubmit={handlePasswordChange} className="profile-edit-form">
                <div className="form-group">
                  <label>Old Password</label>
                  <input
                    type="password"
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setIsChangingPassword(false)} className="btn-cancel">Cancel</button>
                  <button type="submit" className="btn-save">Change Password</button>
                </div>
              </form>
            ) : (
              <div className="security-info">
                <p>Password was last changed recently. We recommend a strong, unique password for security.</p>
                <button
                  onClick={() => navigate('/forgot-password')}
                  className="btn-link"
                  style={{ color: 'var(--accent-color)', background: 'none', border: 'none', padding: 0, fontWeight: '700', cursor: 'pointer', marginTop: '10px' }}
                >
                  Forgot Password? Send Reset OTP to Email
                </button>
              </div>
            )}
          </div>

          <div className="profile-danger-zone">
            <button onClick={handleLogout} className="btn-logout-full">
              <FiLogOut /> Sign Out of My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
