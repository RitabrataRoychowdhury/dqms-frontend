import React from 'react';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold">KeyGuard</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              &copy; {year} KeyGuard. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Secure authentication powered by Keycloak
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;