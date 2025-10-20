import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import Spinner from './components/Spinner';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const EditResume = React.lazy(() => import('./pages/EditResume'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="resume/:id/edit" element={<EditResume />} />
            <Route path="resume/new" element={<EditResume />} />
            <Route path="login" element={<AuthPage />} />
            <Route path="register" element={<AuthPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
