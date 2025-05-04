
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const NotAuthorized = () => {
  const { userRole } = useAuth();
  
  // Determine which dashboard to redirect to based on user role
  const getDashboardLink = () => {
    if (!userRole) return '/login';
    return `/${userRole}`;
  };

  return (
    <div className="min-h-screen bg-wms-50 flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full bg-white rounded-lg shadow-elevation p-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-6">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-wms-900 mb-2">Access Denied</h1>
        <p className="text-wms-600 mb-6">
          You don't have permission to access this area. Please return to your dashboard or contact an administrator if you believe this is an error.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" asChild>
            <Link to="/">
              Go to Home
            </Link>
          </Button>
          
          <Button variant="default" asChild>
            <Link to={getDashboardLink()}>
              <Shield className="mr-2 h-4 w-4" />
              Go to My Dashboard
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotAuthorized;
