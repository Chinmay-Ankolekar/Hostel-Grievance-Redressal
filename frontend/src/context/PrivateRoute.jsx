import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import { useAuth } from './AuthProvider';

const PrivateRoute = () => {
  const { authToken } = useAuth();

  return authToken ? (
    <Route path="/" element={<Dashboard />} /> 
  ) : (
    <Navigate to="/login" /> 
  );
};

export default PrivateRoute;
