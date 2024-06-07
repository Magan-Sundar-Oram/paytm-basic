import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return isAuthenticated ? children : <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;
