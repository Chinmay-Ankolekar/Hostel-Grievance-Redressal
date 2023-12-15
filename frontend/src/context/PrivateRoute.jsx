import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import { useAuth } from './AuthProvider';
import AccountPage from '../pages/AccountPage';

const PrivateRoute = () => {
  const { authToken, headers } = useAuth();

  console.log(authToken, headers);

  return authToken ? (
    <>
    <Dashboard/>
    </>
  ) : (
    <Navigate to="/login" /> 
  );
};

export default PrivateRoute;
