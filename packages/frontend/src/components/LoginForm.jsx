import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', formData);
      login(response.data.user);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
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
        Login
      </button>
    </form>
  );
};

export default LoginForm;
