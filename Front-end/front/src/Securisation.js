import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ element, allowedRoles, user }) {
  const isAuthenticated = user !== null;
  const hasPermission = isAuthenticated && allowedRoles.includes(user.Roles);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!hasPermission) {
    return <Navigate to="/CompteEtudiant" />;
  }

  if (user.Roles === 'Etudiant') {
    return <Navigate to="/Etudiant" />;
  }
  return element;
}
