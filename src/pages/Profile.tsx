
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ProfilePage } from '@/components/profile/ProfilePage';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { userRole } = useAuth();
  
  // Guard to ensure we have a valid role
  if (!userRole || !['admin', 'moderator', 'driver', 'client', 'controller'].includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return (
    <ProfilePage userType={userRole as 'admin' | 'moderator' | 'client' | 'driver' | 'controller'} />
  );
};

export default Profile;
