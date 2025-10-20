import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-midnight/50 p-8 rounded-lg"
    >
      {isLoginPage ? <LoginForm /> : <RegisterForm />}
    </motion.div>
  );
};

export default AuthPage;
