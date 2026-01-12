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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#ff3d00] rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return null;

  const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <FiArrowLeft /> Back
          </button>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-[#ff3d00] rounded-full flex items-center justify-center text-3xl font-bold">
              {initials}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="flex items-center gap-2 text-white/70">
                <FiShield /> {user.role.toUpperCase()} PORTAL
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Alert Message */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
              {message.type === 'success' ? <FiCheck /> : <FiX />}
              {message.text}
            </div>
          )}

          {/* Account Details Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FiUser className="text-xl text-[#ff3d00]" />
                <h2 className="text-xl font-bold text-slate-800">Account Details</h2>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-[#ff3d00] font-medium hover:underline"
                >
                  <FiEdit2 /> Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#ff3d00] text-white font-medium rounded-xl hover:bg-[#e63600] transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Display Name</label>
                  <p className="font-medium text-slate-800">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Email Address</label>
                  <p className="font-medium text-slate-800">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Account Role</label>
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full capitalize">
                    {user.role}
                  </span>
                </div>
              </div>
            )}
          </div>

          <hr className="my-8 border-gray-200" />

          {/* Security Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FiLock className="text-xl text-[#ff3d00]" />
                <h2 className="text-xl font-bold text-slate-800">Security Settings</h2>
              </div>
              {!isChangingPassword && (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="flex items-center gap-2 text-[#ff3d00] font-medium hover:underline"
                >
                  <FiEdit2 /> Update Password
                </button>
              )}
            </div>

            {isChangingPassword ? (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Old Password</label>
                  <input
                    type="password"
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsChangingPassword(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#ff3d00] text-white font-medium rounded-xl hover:bg-[#e63600] transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">
                  Password was last changed recently. We recommend a strong, unique password for security.
                </p>
                <button
                  onClick={() => navigate('/forgot-password')}
                  className="text-[#ff3d00] font-semibold hover:underline"
                >
                  Forgot Password? Send Reset OTP to Email
                </button>
              </div>
            )}
          </div>

          <hr className="my-8 border-gray-200" />

          {/* Logout Section */}
          <div>
            <button
              onClick={handleLogout}
              className="w-full py-4 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            >
              <FiLogOut /> Sign Out of My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
