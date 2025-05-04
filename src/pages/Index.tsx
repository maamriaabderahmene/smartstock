
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Warehouse, Shield, Truck, User, CheckCircle, Activity, Clock, LayoutGrid, Box, FileSearch } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CustomButton } from '@/components/ui/custom-button';
import { CustomCard } from '@/components/ui/custom-card';

const Index: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureElements = document.querySelectorAll('.feature-card');
    featureElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: 'Intelligent Zone Management',
      description: 'Efficiently organize warehouse space with smart zone categorization based on storage type, temperature, and humidity requirements.',
      icon: <LayoutGrid className="h-6 w-6 text-wms-accent" />,
      delay: 0.1
    },
    {
      title: 'Real-time Tracking',
      description: 'Monitor merchandise movement throughout the warehouse in real-time with detailed insights on location and status.',
      icon: <Activity className="h-6 w-6 text-wms-accent" />,
      delay: 0.2
    },
    {
      title: 'Role-based Access Control',
      description: 'Securely manage users with role-specific dashboards for administrators, moderators, drivers, and clients.',
      icon: <Shield className="h-6 w-6 text-wms-accent" />,
      delay: 0.3
    },
    {
      title: 'Optimized Stocking/Destocking',
      description: 'Streamline operations with efficient stocking and destocking processes based on merchandise attributes and specifications.',
      icon: <Box className="h-6 w-6 text-wms-accent" />,
      delay: 0.4
    },
    {
      title: 'Performance Metrics',
      description: 'Track and analyze performance of moderators, drivers, and controllers with comprehensive metrics and reports.',
      icon: <CheckCircle className="h-6 w-6 text-wms-accent" />,
      delay: 0.5
    },
    {
      title: 'Smart Task Assignment',
      description: 'Automatically assign tasks to available drivers based on proximity, workload, and efficiency metrics.',
      icon: <Clock className="h-6 w-6 text-wms-accent" />,
      delay: 0.6
    }
  ];

  const benefitsData = [
    {
      title: 'Increased Efficiency',
      description: 'Optimize operations and reduce manual workload with automated task assignment and zone management',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      title: 'Enhanced Accuracy',
      description: 'Reduce errors in stocking and destocking operations through systematic verification and inspection',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      title: 'Real-time Visibility',
      description: 'Gain instant insights into warehouse operations, merchandise location, and resource utilization',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      title: 'Data-driven Decisions',
      description: 'Make informed business decisions based on comprehensive performance metrics and analytics',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    }
  ];

  const dashboards = [
    {
      title: 'Administrator Dashboard',
      description: 'Complete oversight and control of warehouse operations, zone management, and performance analytics.',
      icon: <LayoutGrid className="h-8 w-8 text-white" />,
      bgClass: 'bg-gradient-to-br from-blue-600 to-blue-800',
      link: '/admin'
    },
    {
      title: 'Moderator Dashboard',
      description: 'Validate client orders, assign drivers and controllers, and monitor warehouse operations.',
      icon: <Shield className="h-8 w-8 text-white" />,
      bgClass: 'bg-gradient-to-br from-indigo-600 to-indigo-800',
      link: '/moderator'
    },
    {
      title: 'Driver Dashboard',
      description: 'View and manage assigned stocking and destocking tasks with real-time updates and scanning functionality.',
      icon: <Truck className="h-8 w-8 text-white" />,
      bgClass: 'bg-gradient-to-br from-green-600 to-green-800',
      link: '/driver'
    },
    {
      title: 'Client Dashboard',
      description: 'Submit storage requests, track merchandise location, and manage inventory efficiently.',
      icon: <User className="h-8 w-8 text-white" />,
      bgClass: 'bg-gradient-to-br from-purple-600 to-purple-800',
      link: '/client'
    },
    {
      title: 'Controller Dashboard',
      description: 'Oversee inspections, validate storage conditions, and ensure quality control standards.',
      icon: <FileSearch className="h-8 w-8 text-white" />,
      bgClass: 'bg-gradient-to-br from-teal-600 to-teal-800',
      link: '/controller'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <motion.section 
        className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-white to-wms-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wms-900 leading-tight">
                  Intelligent Warehouse Management System
                </h1>
                <p className="mt-6 text-xl text-wms-600 max-w-2xl">
                  Streamline your warehouse operations with our comprehensive management system designed for precision, efficiency, and scalability.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <Link to="/admin">
                    <CustomButton 
                      variant="accent" 
                      size="lg"
                      icon={<ArrowRight size={18} />}
                      iconPosition="right"
                    >
                      Explore Admin Dashboard
                    </CustomButton>
                  </Link>
                  <Link to="#features" onClick={(e) => {
                    e.preventDefault();
                    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <CustomButton variant="outline" size="lg">
                      Learn More
                    </CustomButton>
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative"
              >
                <div className="relative mx-auto w-full max-w-md">
                  <div className="absolute inset-0 bg-wms-accent/10 rounded-lg transform rotate-3"></div>
                  <CustomCard variant="glass" className="shadow-elevation relative z-10">
                    <div className="p-1">
                      <div className="bg-gradient-to-br from-wms-accent to-wms-accent-light rounded-lg p-4 text-white flex items-center mb-4">
                        <Warehouse className="h-8 w-8 mr-3" />
                        <div>
                          <h3 className="font-semibold text-lg">Warehouse Overview</h3>
                          <p className="text-sm text-white/80">Real-time monitoring</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <p className="text-wms-500 text-xs mb-1">Total Zones</p>
                          <p className="text-wms-900 font-semibold text-lg">24</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <p className="text-wms-500 text-xs mb-1">Active Tasks</p>
                          <p className="text-wms-900 font-semibold text-lg">18</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <p className="text-wms-500 text-xs mb-1">Saturation</p>
                          <p className="text-wms-900 font-semibold text-lg">68%</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <p className="text-wms-500 text-xs mb-1">Efficiency</p>
                          <p className="text-wms-900 font-semibold text-lg">92%</p>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-wms-500 text-sm">Zone Utilization</p>
                          <p className="text-wms-900 text-sm font-medium">68%</p>
                        </div>
                        <div className="w-full bg-wms-100 rounded-full h-2.5">
                          <div className="bg-gradient-to-r from-wms-accent to-wms-accent-light h-2.5 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="text-wms-500">Updated 5 min ago</div>
                        <div className="text-wms-accent font-medium cursor-pointer">View Details</div>
                      </div>
                    </div>
                  </CustomCard>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Dashboards Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-wms-900 mb-4">
              Role-specific Dashboards
            </h2>
            <p className="text-xl text-wms-600">
              Tailored interfaces for each role in your warehouse ecosystem, ensuring optimal efficiency and productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dashboards.map((dashboard, index) => (
              <motion.div
                key={dashboard.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={dashboard.link} className="block h-full">
                  <CustomCard
                    variant="default"
                    interactive
                    withHover
                    className="h-full flex flex-col"
                  >
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-5 ${dashboard.bgClass}`}>
                      {dashboard.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-wms-900 mb-2">{dashboard.title}</h3>
                    <p className="text-wms-600 mb-6 flex-grow">{dashboard.description}</p>
                    <div className="flex items-center text-wms-accent font-medium">
                      <span>Explore Dashboard</span>
                      <ArrowRight size={16} className="ml-2" />
                    </div>
                  </CustomCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-16 md:py-24 bg-wms-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-wms-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-wms-600">
              Our warehouse management system offers comprehensive tools to optimize your operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="feature-card opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CustomCard 
                  variant="elevated" 
                  className="h-full transition-all duration-300 hover:translate-y-[-5px]"
                >
                  <div className="p-2 w-12 h-12 rounded-lg bg-wms-accent/10 flex items-center justify-center mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-wms-900 mb-2">{feature.title}</h3>
                  <p className="text-wms-600">{feature.description}</p>
                </CustomCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-wms-900 mb-6">
                  Transform Your Warehouse Operations
                </h2>
                <p className="text-xl text-wms-600 mb-8">
                  Our warehouse management system delivers tangible benefits that improve efficiency, reduce costs, and enhance overall operations.
                </p>
                
                <div className="space-y-4">
                  {benefitsData.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {benefit.icon}
                      </div>
                      <div className="ml-3">
                        <h4 className="text-lg font-medium text-wms-900">{benefit.title}</h4>
                        <p className="text-wms-600">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Link to="/admin">
                    <CustomButton 
                      variant="accent" 
                      size="lg"
                      icon={<ArrowRight size={18} />}
                      iconPosition="right"
                    >
                      Start Optimizing Now
                    </CustomButton>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-wms-accent/10 rounded-lg transform -rotate-3"></div>
                <CustomCard variant="glass" className="shadow-elevation relative z-10">
                  <div className="p-1">
                    <div className="bg-gradient-to-br from-wms-accent to-wms-accent-light rounded-lg p-4 text-white mb-4">
                      <h3 className="font-semibold text-lg mb-2">Performance Metrics</h3>
                      <p className="text-sm text-white/80">Last 30 days</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-wms-500 text-sm">Warehouse Efficiency</p>
                        <p className="text-green-600 text-sm font-medium">+15%</p>
                      </div>
                      <div className="w-full bg-wms-100 rounded-full h-2.5 mb-4">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-wms-500 text-sm">Task Completion Rate</p>
                        <p className="text-green-600 text-sm font-medium">+8%</p>
                      </div>
                      <div className="w-full bg-wms-100 rounded-full h-2.5 mb-4">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-wms-500 text-sm">Error Reduction</p>
                        <p className="text-green-600 text-sm font-medium">-23%</p>
                      </div>
                      <div className="w-full bg-wms-100 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '77%' }}></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-wms-500 text-xs mb-1">Avg. Processing Time</p>
                        <div className="flex items-end">
                          <p className="text-wms-900 font-semibold text-lg">24 min</p>
                          <p className="text-green-600 text-xs ml-2 mb-0.5">-14%</p>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-wms-500 text-xs mb-1">Inventory Accuracy</p>
                        <div className="flex items-end">
                          <p className="text-wms-900 font-semibold text-lg">98.5%</p>
                          <p className="text-green-600 text-xs ml-2 mb-0.5">+2.5%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-wms-500">Source: System Analytics</div>
                      <div className="text-wms-accent font-medium cursor-pointer">View Full Report</div>
                    </div>
                  </div>
                </CustomCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-wms-accent to-wms-accent-dark text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Warehouse Operations?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
              Experience the power of our Warehouse Management System and take your operations to the next level.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/admin">
                <CustomButton 
                  className="bg-white text-wms-accent hover:bg-wms-50 active:bg-wms-100"
                  size="lg"
                >
                  Get Started Now
                </CustomButton>
              </Link>
              <Link to="/contact">
                <CustomButton 
                  className="border border-white/50 bg-transparent hover:bg-white/10"
                  size="lg"
                >
                  Contact Sales
                </CustomButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
