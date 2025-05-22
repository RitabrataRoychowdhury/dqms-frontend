import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Menu, X, User, Shield, Home } from 'lucide-react';
import ThemeToggleButton from './ThemeToggleButton';

const Navigation: React.FC = () => {
  const { isAuthenticated, user, logout, hasRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <Shield className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">KeyGuard</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150"
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150"
                >
                  Profile
                </Link>

                {hasRole('admin') && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150"
                  >
                    Admin Dashboard
                  </Link>
                )}

                {hasRole('realm-admin') && (
                  <Link
                    to="/create-realm"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150"
                  >
                    Create Realm
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>

                <div className="flex items-center ml-4">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                    {user?.userName?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user?.userName || 'User'}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 ml-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary-dark transition duration-150"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Home
              </div>
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </div>
                </Link>

                {hasRole('admin') && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Admin Dashboard
                    </div>
                  </Link>
                )}

                {hasRole('realm-admin') && (
                  <Link
                    to="/create-realm"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Create Realm
                    </div>
                  </Link>
                )}

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center">
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </div>
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary-dark transition duration-150"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        <ThemeToggleButton />
      </div>
    </nav>
  );
};

export default Navigation;
