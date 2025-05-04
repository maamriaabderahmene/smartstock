import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Warehouse, 
  LayoutDashboard, 
  FileText, 
  Users, 
  Package, 
  Truck, 
  Shield, 
  User, 
  BarChart, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  LogOut,
  Menu,
  X,
  FileCheck,
  FileSearch,
  Search,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  children?: SidebarItem[];
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  dashboardType: 'admin' | 'moderator' | 'driver' | 'client' | 'controller';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title,
  dashboardType 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();

  const adminNavigation: SidebarItem[] = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Zone Management', href: '/admin/zones', icon: <LayoutDashboard size={20} /> },
    { name: 'Reports', href: '/admin/reports', icon: <FileText size={20} /> },
    { name: 'Users', href: '/admin/users', icon: <Users size={20} /> },
    { name: 'Merchandise', href: '/admin/merchandise', icon: <Package size={20} /> },
    { name: 'Analytics', href: '/admin/analytics', icon: <BarChart size={20} /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const moderatorNavigation: SidebarItem[] = [
    { name: 'Dashboard', href: '/moderator', icon: <LayoutDashboard size={20} /> },
    { name: 'Client Orders', href: '/moderator/orders', icon: <FileText size={20} /> },
    { name: 'Driver Assignment', href: '/moderator/drivers', icon: <Truck size={20} /> },
    { name: 'Merchandise', href: '/moderator/merchandise', icon: <Package size={20} /> },
    { name: 'Performance', href: '/moderator/performance', icon: <BarChart size={20} /> },
    { name: 'Settings', href: '/moderator/settings', icon: <Settings size={20} /> },
  ];

  const driverNavigation: SidebarItem[] = [
    { name: 'Dashboard', href: '/driver', icon: <LayoutDashboard size={20} /> },
    { name: 'Assigned Tasks', href: '/driver/tasks', icon: <FileText size={20} /> },
    { name: 'History', href: '/driver/history', icon: <FileText size={20} /> },
    { name: 'Performance', href: '/driver/performance', icon: <BarChart size={20} /> },
    { name: 'Settings', href: '/driver/settings', icon: <Settings size={20} /> },
  ];

  const clientNavigation: SidebarItem[] = [
    { name: 'Dashboard', href: '/client', icon: <LayoutDashboard size={20} /> },
    { name: 'My Products', href: '/client/products', icon: <Package size={20} /> },
    { name: 'Stocking Orders', href: '/client/stocking', icon: <FileText size={20} /> },
    { name: 'Destocking Orders', href: '/client/destocking', icon: <FileText size={20} /> },
    { name: 'Order Status', href: '/client/status', icon: <FileText size={20} /> },
    { name: 'Settings', href: '/client/settings', icon: <Settings size={20} /> },
  ];

  const controllerNavigation: SidebarItem[] = [
    { name: 'Dashboard', href: '/controller', icon: <LayoutDashboard size={20} /> },
    { name: 'Assigned Inspections', href: '/controller/inspections', icon: <FileSearch size={20} /> },
    { name: 'Inspection History', href: '/controller/history', icon: <FileCheck size={20} /> },
    { name: 'Performance', href: '/controller/performance', icon: <BarChart size={20} /> },
    { name: 'Settings', href: '/controller/settings', icon: <Settings size={20} /> },
  ];

  const getNavigation = () => {
    switch (dashboardType) {
      case 'admin': 
        return adminNavigation;
      case 'moderator': 
        return moderatorNavigation;
      case 'driver': 
        return driverNavigation;
      case 'client': 
        return clientNavigation;
      case 'controller': 
        return controllerNavigation;
      default: 
        return adminNavigation;
    }
  };

  const navigation = getNavigation();

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const getDashboardIcon = () => {
    switch (dashboardType) {
      case 'admin': 
        return <LayoutDashboard className="text-wms-accent" />;
      case 'moderator': 
        return <Shield className="text-wms-accent" />;
      case 'driver': 
        return <Truck className="text-wms-accent" />;
      case 'client': 
        return <User className="text-wms-accent" />;
      case 'controller': 
        return <FileSearch className="text-wms-accent" />;
      default: 
        return <LayoutDashboard className="text-wms-accent" />;
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-wms-50">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-wms-900/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-wms-200">
                <Link to="/" className="flex items-center space-x-2">
                  <Warehouse className="h-6 w-6 text-wms-accent" />
                  <span className="font-semibold text-wms-900">WMS</span>
                </Link>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-md text-wms-500 hover:text-wms-900 hover:bg-wms-100"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-wms-accent/10 text-wms-accent'
                        : 'text-wms-700 hover:bg-wms-100 hover:text-wms-900'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="absolute bottom-0 w-full p-4 border-t border-wms-200">
                <button 
                  onClick={handleSignOut}
                  className="flex w-full items-center px-3 py-2 rounded-md text-sm font-medium text-wms-700 hover:bg-wms-100 hover:text-wms-900 transition-colors"
                >
                  <LogOut size={20} className="mr-3" />
                  Logout
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:border-r lg:border-wms-200 lg:bg-white lg:pt-5 lg:pb-4 lg:z-10">
        <div className={`flex-1 flex flex-col ${collapsed ? 'w-16' : 'w-64'} transition-all duration-200`}>
          <div className="flex items-center justify-between flex-shrink-0 px-4 mb-6">
            <Link to="/" className="flex items-center">
              <Warehouse className="h-6 w-6 text-wms-accent" />
              {!collapsed && <span className="ml-2 font-semibold text-wms-900">WMS</span>}
            </Link>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-md text-wms-500 hover:text-wms-900 hover:bg-wms-100 transition-colors lg:block hidden"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
          
          <div className="flex-1 px-3 space-y-1.5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-wms-accent/10 text-wms-accent'
                    : 'text-wms-700 hover:bg-wms-100 hover:text-wms-900'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-6 w-40 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150 z-50">
                    <div className="p-1 bg-white rounded-md shadow-elevation border border-wms-200">
                      <div className="px-3 py-2 text-sm font-medium text-wms-900">
                        {item.name}
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
          
          <div className="p-3 mt-auto">
            <button
              onClick={handleSignOut}
              className={`flex items-center px-2 py-2 rounded-md text-sm font-medium text-wms-700 hover:bg-wms-100 hover:text-wms-900 transition-colors cursor-pointer group`}
            >
              <LogOut size={20} />
              {!collapsed && <span className="ml-3">Logout</span>}
              {collapsed && (
                <div className="absolute left-full ml-6 w-40 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150 z-50">
                  <div className="p-1 bg-white rounded-md shadow-elevation border border-wms-200">
                    <div className="px-3 py-2 text-sm font-medium text-wms-900">
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`lg:pl-64 flex flex-col ${collapsed ? 'lg:pl-16' : 'lg:pl-64'} transition-all duration-200`}>
        <header className="sticky top-0 z-10 bg-white border-b border-wms-200 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1 mr-2 rounded-md text-wms-600 lg:hidden hover:text-wms-900 hover:bg-wms-100 focus:outline-none"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center space-x-2">
                {getDashboardIcon()}
                <h1 className="text-xl font-semibold text-wms-900">{title}</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-1.5 rounded-full text-wms-600 hover:text-wms-900 hover:bg-wms-100 focus:outline-none">
                <Settings size={18} />
              </button>
              <div className="h-8 w-8 rounded-full bg-wms-accent/20 flex items-center justify-center text-wms-accent">
                <User size={16} />
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1">
          <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
