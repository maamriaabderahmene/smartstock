
import React from 'react';
import { Link } from 'react-router-dom';
import { Warehouse, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-wms-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-wms-900 mb-4">
              <Warehouse className="h-6 w-6 text-wms-accent" />
              <span className="font-semibold text-lg">WMS</span>
            </Link>
            <p className="text-wms-500 text-sm">
              A sophisticated warehouse management system designed for efficiency and precision.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-wms-400 hover:text-wms-accent transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-wms-400 hover:text-wms-accent transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-wms-400 hover:text-wms-accent transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="text-wms-400 hover:text-wms-accent transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-wms-900 tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link to="/moderator" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  Moderator Dashboard
                </Link>
              </li>
              <li>
                <Link to="/driver" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  Driver Dashboard
                </Link>
              </li>
              <li>
                <Link to="/client" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  Client Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-wms-900 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-wms-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  Data Processing
                </a>
              </li>
              <li>
                <a href="#" className="text-wms-500 hover:text-wms-accent text-sm transition-colors">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-wms-200">
          <p className="text-center text-wms-500 text-sm">
            &copy; {new Date().getFullYear()} Warehouse Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
