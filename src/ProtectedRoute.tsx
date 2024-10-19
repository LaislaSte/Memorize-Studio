import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';

interface IProtectedRouteProp {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRouteProp) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
