
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { CustomButton } from '@/components/ui/custom-button';
import { Plus, Search, Filter, Edit, Trash, MoreHorizontal, User, UserPlus, Shield, Truck, FileSearch } from 'lucide-react';
// Import Users icon separately to avoid naming conflict and rename it to UsersIcon
import { Users as UsersIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock user data
const mockUsers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    role: 'Admin', 
    status: 'Active',
    lastActive: '2 hours ago'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    role: 'Moderator', 
    status: 'Active',
    lastActive: '1 day ago'
  },
  { 
    id: 3, 
    name: 'Robert Johnson', 
    email: 'robert.j@example.com', 
    role: 'Driver', 
    status: 'Active',
    lastActive: '5 minutes ago'
  },
  { 
    id: 4, 
    name: 'Sarah Williams', 
    email: 'sarah.w@example.com', 
    role: 'Client', 
    status: 'Inactive',
    lastActive: '1 week ago'
  },
  { 
    id: 5, 
    name: 'Michael Brown', 
    email: 'michael.b@example.com', 
    role: 'Controller', 
    status: 'Active',
    lastActive: '3 days ago'
  },
];

type UserRole = 'Admin' | 'Moderator' | 'Driver' | 'Client' | 'Controller';

const UsersPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<'Active' | 'Inactive' | 'All'>('All');
  const { toast } = useToast();

  // Filter users based on search query and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "User creation functionality will be implemented with authentication system",
    });
  };

  const handleEditUser = (id: number) => {
    toast({
      title: "Edit User",
      description: `Editing user with ID: ${id}`,
    });
  };

  const handleDeleteUser = (id: number) => {
    toast({
      title: "Delete User",
      description: `Deleting user with ID: ${id}`,
      variant: "destructive",
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Shield size={16} className="text-purple-500" />;
      case 'Moderator':
        return <UsersIcon size={16} className="text-blue-500" />;
      case 'Driver':
        return <Truck size={16} className="text-green-500" />;
      case 'Client':
        return <User size={16} className="text-orange-500" />;
      case 'Controller':
        return <FileSearch size={16} className="text-red-500" />;
      default:
        return <User size={16} />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <DashboardLayout title="Users Management" dashboardType="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold">Users Management</h2>
          
          <CustomButton 
            variant="accent" 
            className="flex items-center gap-2"
            onClick={handleAddUser}
          >
            <UserPlus size={16} />
            Add User
          </CustomButton>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-wms-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select 
              className="border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-wms-accent"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRole | 'All')}
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
              <option value="Driver">Driver</option>
              <option value="Client">Client</option>
              <option value="Controller">Controller</option>
            </select>
            
            <select 
              className="border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-wms-accent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'Active' | 'Inactive' | 'All')}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <CustomCard>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                          <User size={20} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {getRoleIcon(user.role)}
                        </div>
                        <div className="text-sm text-gray-900">{user.role}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button 
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" 
                          onClick={() => handleEditUser(user.id)}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" 
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-gray-500">No users found matching your filters</p>
            </div>
          )}
        </CustomCard>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
