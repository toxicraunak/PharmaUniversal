import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Trash2, Shield, Loader2, Mail, Phone, MapPin, Key, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const token = localStorage.getItem('adminToken');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdmin = async (id, isAdmin) => {
    try {
      await axios.put(`/api/admin/users/${id}`, { isAdmin: !isAdmin }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      alert('Error updating user role');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!newPassword) return;
    try {
      await axios.put(`/api/admin/users/${selectedUser._id}/password`, { password: newPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ text: 'Password updated successfully!', type: 'success' });
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setNewPassword('');
        setMessage({ text: '', type: '' });
      }, 2000);
    } catch (err) {
      setMessage({ text: 'Error updating password', type: 'error' });
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchUsers();
      } catch (err) {
        alert('Error deleting user');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users Management</h1>
          <p className="text-slate-500">Manage registered users, permissions, and security settings.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" size={32} /></td></tr>
              ) : users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{user.firstName} {user.lastName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{user._id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600"><Mail size={14} /> {user.email}</div>
                    {user.phone && <div className="flex items-center gap-2 text-sm text-slate-600 mt-1"><Phone size={14} /> {user.phone}</div>}
                  </td>
                  <td className="px-6 py-4">
                    {user.city ? (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={14} /> {user.city}, {user.country}
                      </div>
                    ) : <span className="text-slate-400 text-xs italic">Not provided</span>}
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleAdmin(user._id, user.isAdmin)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer transition-all ${
                        user.isAdmin ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Shield size={12} /> {user.isAdmin ? 'Admin' : 'User'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => { setSelectedUser(user); setIsPasswordModalOpen(true); }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                        title="Change Password"
                      >
                        <Key size={18} />
                      </button>
                      <button 
                        onClick={() => deleteUser(user._id)} 
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
                <button onClick={() => setIsPasswordModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 cursor-pointer">
                  <X size={24} />
                </button>
              </div>

              <p className="text-sm text-slate-500 mb-6">
                Updating password for <span className="font-bold text-slate-900">{selectedUser?.firstName} {selectedUser?.lastName}</span>
              </p>

              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">New Password</label>
                  <input 
                    type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter new password"
                  />
                </div>

                {message.text && (
                  <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <Shield size={20} />}
                    <p className="text-sm font-medium">{message.text}</p>
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Update Password
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;
