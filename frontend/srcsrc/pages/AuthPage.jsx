import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="max-w-md mx-auto">
      {isLoginPage ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthPage;
