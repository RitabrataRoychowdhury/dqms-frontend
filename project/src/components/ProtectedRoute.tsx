import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '/home/user/Downloads/dqms-frontend/project/src/features/auth/common/LoadingSpinner.tsx';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, isLoading, hasRole, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.groupCollapsed('[ProtectedRoute] Auth Status');
    console.log('Current path:', location.pathname);
    console.log('isLoading:', isLoading);
    console.log('isAuthenticated:', isAuthenticated);
    console.log('User:', user);
    if (requiredRole) {
      console.log(`Required Role: ${requiredRole}`);
      console.log('Has role?', hasRole(requiredRole));
    }
    console.groupEnd();
  }, [isLoading, isAuthenticated, hasRole, location.pathname, requiredRole, user]);

  if (isLoading) {
    console.log('[ProtectedRoute] Loading auth state...');
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    console.warn('[ProtectedRoute] User not authenticated, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    console.warn(`[ProtectedRoute] User lacks required role "${requiredRole}", redirecting to /`);
    return <Navigate to="/" replace />;
  }

  console.log('[ProtectedRoute] Access granted, rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;
