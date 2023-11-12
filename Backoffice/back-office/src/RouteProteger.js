import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoute({ element }) {
  const token = Cookies.get('token');
 
  if (token) {
    return element; 
  } else {
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
