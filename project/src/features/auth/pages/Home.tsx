import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, UserCheck, Key } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block p-2 bg-blue-100 rounded-full mb-4">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Secure Authentication
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Identity and access management made simple with our Keycloak-powered solution.
          </p>
          
          {isAuthenticated ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-8">
              <h2 className="text-xl font-medium text-green-800">
                Welcome back, {user?.userName || 'User'}!
              </h2>
              <p className="mt-2 text-green-700">
                You are securely logged in.
              </p>
              <Link 
                to="/profile" 
                className="inline-flex items-center mt-4 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition duration-150"
              >
                <UserCheck className="mr-2 h-5 w-5" />
                View Profile
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Link 
                to="/login" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-light hover:bg-primary-light/80 transition duration-150"
              >
                <Key className="mr-2 h-5 w-5" />
                Login
              </Link>
              <Link 
                to="/register" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition duration-150"
              >
                <UserCheck className="mr-2 h-5 w-5" />
                Register
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Secure Authentication</h3>
              <p className="text-gray-600">
                Industry-standard security protocols to keep your accounts protected at all times.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Role Management</h3>
              <p className="text-gray-600">
                Granular control over user permissions and access with flexible role assignments.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Multi-Realm Support</h3>
              <p className="text-gray-600">
                Create and manage separate security domains for different applications or organizations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;