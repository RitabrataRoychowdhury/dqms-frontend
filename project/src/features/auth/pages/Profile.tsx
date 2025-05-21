import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you might want to fetch additional user details here
    setUserInfo(user);
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm leading-5 text-red-700">
              User information could not be loaded. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success(message))
      .catch(() => toast.error('Failed to copy to clipboard'));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-8 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-primary text-2xl font-bold">
                {userInfo.userName ? userInfo.userName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="ml-4 text-white">
                <h1 className="text-2xl font-bold">{userInfo.userName || 'User'}</h1>
                <p className="text-blue-100">
                  {userInfo.roles && userInfo.roles.length > 0 ? userInfo.roles.join(', ') : 'User'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">User Information</h2>
          
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <dt className="text-sm font-medium text-gray-500">Username</dt>
              </div>
              <dd className="mt-1 text-sm text-gray-900 ml-7">{userInfo.userName || 'N/A'}</dd>
            </div>

            <div className="sm:col-span-1">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <dt className="text-sm font-medium text-gray-500">Email</dt>
              </div>
              <dd className="mt-1 text-sm text-gray-900 ml-7 flex items-center">
                {userInfo.email || 'N/A'}
                {userInfo.email && (
                  <button 
                    onClick={() => copyToClipboard(userInfo.email, 'Email copied to clipboard!')}
                    className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
                  >
                    Copy
                  </button>
                )}
              </dd>
            </div>
            
            {userInfo.phoneNumber && (
              <div className="sm:col-span-1">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                </div>
                <dd className="mt-1 text-sm text-gray-900 ml-7">{userInfo.phoneNumber}</dd>
              </div>
            )}
            
            {userInfo.dateOfBirth && (
              <div className="sm:col-span-1">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                </div>
                <dd className="mt-1 text-sm text-gray-900 ml-7">
                  {new Date(userInfo.dateOfBirth).toLocaleDateString()}
                </dd>
              </div>
            )}
            
            {userInfo.gender && (
              <div className="sm:col-span-1">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                </div>
                <dd className="mt-1 text-sm text-gray-900 ml-7">{userInfo.gender}</dd>
              </div>
            )}
            
            <div className="sm:col-span-2">
              <div className="flex items-center">
                <dt className="text-sm font-medium text-gray-500">Roles</dt>
              </div>
              <dd className="mt-1 text-sm text-gray-900">
                {userInfo.roles && userInfo.roles.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {userInfo.roles.map((role: string) => (
                      <span 
                        key={role} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500">No roles assigned</span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 sm:px-6 bg-gray-50">
          <p className="text-sm text-gray-500">
            Account created on {userInfo.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : 'Unknown date'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;