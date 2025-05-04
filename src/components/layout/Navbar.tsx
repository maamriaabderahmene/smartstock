
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Warehouse, LayoutDashboard, User, Package, Truck, Shield, FileSearch, LogOut } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Define dashboard routes based on user roles
  const dashboardRoutes = {
    admin: '/admin',
    moderator: '/moderator',
    driver: '/driver',
    client: '/client',
    controller: '/controller'
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Dashboards', 
      href: '#',
      children: [
        { name: 'Administrator', href: '/admin', icon: <LayoutDashboard size={16} /> },
        { name: 'Moderator', href: '/moderator', icon: <Shield size={16} /> },
        { name: 'Driver', href: '/driver', icon: <Truck size={16} /> },
        { name: 'Client', href: '/client', icon: <User size={16} /> },
        { name: 'Controller', href: '/controller', icon: <FileSearch size={16} /> },
      ] 
    },
  ];

  const isActive = (pathname: string) => {
    return location.pathname === pathname;
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
      },
    },
  };

  // Determine which dashboard to redirect to based on user role
  const getDashboardForRole = () => {
    if (!userRole) {
      console.log("No user role found, redirecting to login");
      return '/login';
    }
    
    const dashboardPath = dashboardRoutes[userRole];
    console.log(`User role: ${userRole}, dashboard path: ${dashboardPath}`);
    return dashboardPath;
  };
  
  // Handle dashboard button click
  const handleDashboardClick = () => {
    if (!user) {
      console.log("No user found, redirecting to login");
      navigate('/login');
      return;
    }
    
    if (!userRole) {
      toast({
        title: "Role not found",
        description: "Please complete your profile setup with a role",
        variant: "destructive"
      });
      return;
    }
    
    const dashboardPath = getDashboardForRole();
    console.log(`Navigating to dashboard: ${dashboardPath}`);
    navigate(dashboardPath);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-wms-900 font-semibold text-lg transition-opacity hover:opacity-90"
            >
              <Warehouse className="h-6 w-6 text-wms-accent" />
              <span className="hidden sm:block">WMS</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {navigation.map((item) => 
                  !item.children ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-wms-accent/10 text-wms-accent'
                          : 'text-wms-600 hover:bg-wms-100 hover:text-wms-900'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <div key={item.name} className="relative group">
                      <button
                        className={`px-3 py-2 rounded-md text-sm font-medium inline-flex items-center transition-colors ${
                          item.children.some(child => isActive(child.href))
                            ? 'bg-wms-accent/10 text-wms-accent'
                            : 'text-wms-600 hover:bg-wms-100 hover:text-wms-900'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                      </button>
                      <div className="absolute left-0 mt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-150 ease-in-out z-20">
                        <div className="bg-white rounded-lg shadow-elevation ring-1 ring-black ring-opacity-5 overflow-hidden p-1">
                          {user && userRole ? (
                            // Only show the user's actual dashboard when logged in
                            <Link
                              to={getDashboardForRole()}
                              className={`flex items-center px-4 py-2 text-sm rounded-md ${
                                isActive(getDashboardForRole())
                                  ? 'bg-wms-accent/10 text-wms-accent'
                                  : 'text-wms-700 hover:bg-wms-50'
                              }`}
                            >
                              {userRole === 'admin' && <LayoutDashboard size={16} className="mr-2" />}
                              {userRole === 'moderator' && <Shield size={16} className="mr-2" />}
                              {userRole === 'driver' && <Truck size={16} className="mr-2" />}
                              {userRole === 'client' && <User size={16} className="mr-2" />}
                              {userRole === 'controller' && <FileSearch size={16} className="mr-2" />}
                              {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
                            </Link>
                          ) : (
                            // Show all dashboards when not logged in
                            item.children.map((child) => (
                              <Link
                                key={child.name}
                                to={child.href}
                                className={`flex items-center px-4 py-2 text-sm rounded-md ${
                                  isActive(child.href)
                                    ? 'bg-wms-accent/10 text-wms-accent'
                                    : 'text-wms-700 hover:bg-wms-50'
                                }`}
                              >
                                {child.icon && <span className="mr-2">{child.icon}</span>}
                                {child.name}
                              </Link>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              {user ? (
                <>
                  <CustomButton 
                    variant="outline" 
                    size="sm" 
                    className="mr-3"
                    onClick={handleDashboardClick}
                  >
                    {userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard` : 'Dashboard'}
                  </CustomButton>
                  <CustomButton 
                    variant="accent" 
                    size="sm"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </CustomButton>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <CustomButton variant="outline" size="sm" className="mr-3">
                      Log in
                    </CustomButton>
                  </Link>
                  <Link to="/signup">
                    <CustomButton variant="accent" size="sm">
                      Sign up
                    </CustomButton>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-wms-600 hover:text-wms-900 hover:bg-wms-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-wms-accent transition-colors"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-sm">
              {navigation.map((item) => 
                !item.children ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.href)
                        ? 'bg-wms-accent/10 text-wms-accent'
                        : 'text-wms-600 hover:bg-wms-100 hover:text-wms-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <div key={item.name} className="space-y-1">
                    <div className="px-3 py-2 rounded-md text-base font-medium text-wms-900">
                      {item.name}
                    </div>
                    <div className="pl-4 space-y-1 border-l-2 border-wms-100 ml-3">
                      {user && userRole ? (
                        <Link
                          to={getDashboardForRole()}
                          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                            isActive(getDashboardForRole())
                              ? 'bg-wms-accent/10 text-wms-accent'
                              : 'text-wms-600 hover:bg-wms-100 hover:text-wms-900'
                          }`}
                        >
                          {userRole === 'admin' && <LayoutDashboard size={16} className="mr-2" />}
                          {userRole === 'moderator' && <Shield size={16} className="mr-2" />}
                          {userRole === 'driver' && <Truck size={16} className="mr-2" />}
                          {userRole === 'client' && <User size={16} className="mr-2" />}
                          {userRole === 'controller' && <FileSearch size={16} className="mr-2" />}
                          {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
                        </Link>
                      ) : (
                        item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                              isActive(child.href)
                                ? 'bg-wms-accent/10 text-wms-accent'
                                : 'text-wms-600 hover:bg-wms-100 hover:text-wms-900'
                            }`}
                          >
                            {child.icon && <span className="mr-2">{child.icon}</span>}
                            {child.name}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )
              )}
              <div className="pt-4 pb-2 border-t border-wms-100">
                {user ? (
                  <>
                    <div className="flex items-center mb-2">
                      <CustomButton 
                        variant="outline" 
                        size="sm" 
                        className="w-full" 
                        onClick={handleDashboardClick}
                      >
                        {userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard` : 'Dashboard'}
                      </CustomButton>
                    </div>
                    <div className="flex items-center">
                      <CustomButton 
                        variant="accent" 
                        size="sm" 
                        className="w-full"
                        onClick={() => signOut()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </CustomButton>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center">
                      <Link to="/login" className="w-full">
                        <CustomButton variant="outline" size="sm" className="w-full mb-2">
                          Log in
                        </CustomButton>
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <Link to="/signup" className="w-full">
                        <CustomButton variant="accent" size="sm" className="w-full">
                          Sign up
                        </CustomButton>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
