import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', formData);
      toast.success('Registration successful! Please login.');
    } catch (err) {
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-white text-center">Create Your Account</h2>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-midnight border border-slate/50 rounded-lg text-white focus:ring-emerald focus:border-emerald"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-midnight border border-slate/50 rounded-lg text-white focus:ring-emerald focus:border-emerald"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-emerald text-midnight font-semibold rounded-lg hover:bg-emerald/90 transition-colors"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
