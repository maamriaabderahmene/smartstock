
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader } from 'lucide-react';

// Define the allowed roles type
export type AllowedRole = 'admin' | 'moderator' | 'driver' | 'client' | 'controller';

interface AuthGuardProps {
  allowedRoles?: Array<AllowedRole>;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ allowedRoles = [] }) => {
  const { session, user, userRole, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Log authentication state for debugging
    console.log('AuthGuard: User session state', { 
      authenticated: !!session, 
      userRole, 
      allowedRoles,
      currentPath: location.pathname
    });
  }, [session, userRole, allowedRoles, location.pathname]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="h-12 w-12 animate-spin text-wms-accent" />
          <p className="text-lg font-medium text-wms-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || !user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole as AllowedRole)) {
    // Redirect to unauthorized page if user doesn't have the required role
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
