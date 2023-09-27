import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ element, allowedRoles, user }) {
  const isAuthenticated = user !== null;
  const hasPermission = isAuthenticated && allowedRoles.includes(user.Roles);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!hasPermission) {
    // Si l'utilisateur n'a pas la permission, vous pouvez rediriger vers une page d'erreur ou une autre page par défaut
    return <Navigate to="/CompteEtudiant" />; // Par exemple, redirigez vers une page d'erreur
  }

  if (user.Roles === 'Etudiant') {
    // Si l'utilisateur est un étudiant, redirigez-le vers la page "Etudiant"
    return <Navigate to="/Etudiant" />;
  }
  return element;
}
