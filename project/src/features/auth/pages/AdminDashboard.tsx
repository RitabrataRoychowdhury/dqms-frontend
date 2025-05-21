import React, { useState, useEffect } from 'react';
import { getAllRoles, assignRole, removeRole } from '../services/authService';
import { Shield, AlertCircle, UserPlus, UserMinus, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminDashboard: React.FC = () => {
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [userId, setUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [operation, setOperation] = useState<'assign' | 'remove'>('assign');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const fetchedRoles = await getAllRoles();
      setRoles(fetchedRoles);
      setError('');
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError('Failed to load roles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleOperation = async () => {
    if (!userId.trim() || !selectedRole) {
      toast.error('Please provide both user ID and role');
      return;
    }

    try {
      setActionLoading(true);
      
      if (operation === 'assign') {
        await assignRole(userId, selectedRole);
        toast.success(`Role "${selectedRole}" assigned to user successfully`);
      } else {
        await removeRole(userId, selectedRole);
        toast.success(`Role "${selectedRole}" removed from user successfully`);
      }
      
      // Reset form
      setUserId('');
      setSelectedRole('');
    } catch (err) {
      console.error(`Error ${operation}ing role:`, err);
      toast.error(`Failed to ${operation} role. Please check the user ID and try again.`);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-5 sm:px-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-white" />
            <h1 className="ml-2 text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <p className="mt-1 text-sm text-purple-100">
            Manage user roles and permissions
          </p>
        </div>

        {/* Main content */}
        <div className="px-4 py-5 sm:p-6">
          {error && (
            <div className="mb-4 p-4 border rounded-md bg-red-50 border-red-200 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
              <span className="text-red-800">{error}</span>
            </div>
          )}

          {/* Role Management Section */}
          <div className="mb-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-purple-600" />
              Role Management
            </h2>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex space-x-4 mb-4">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    operation === 'assign'
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                  }`}
                  onClick={() => setOperation('assign')}
                >
                  <div className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Assign Role
                  </div>
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    operation === 'remove'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                  }`}
                  onClick={() => setOperation('remove')}
                >
                  <div className="flex items-center">
                    <UserMinus className="h-4 w-4 mr-2" />
                    Remove Role
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                    User ID
                  </label>
                  <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Enter user ID"
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <select
                      id="role"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    >
                      <option value="">Select a role</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={fetchRoles}
                      className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleRoleOperation}
                  disabled={actionLoading}
                  className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                    operation === 'assign' 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    operation === 'assign' ? 'focus:ring-blue-500' : 'focus:ring-red-500'
                  } ${actionLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {actionLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {operation === 'assign' ? (
                        <>
                          <UserPlus className="mr-2 h-5 w-5" />
                          Assign Role
                        </>
                      ) : (
                        <>
                          <UserMinus className="mr-2 h-5 w-5" />
                          Remove Role
                        </>
                      )}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Available Roles Section */}
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Available Roles</h2>
            
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {roles.length > 0 ? (
                    roles.map((role) => (
                      <li key={role}>
                        <div className="px-4 py-4 flex items-center sm:px-6">
                          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                            <div className="flex items-center">
                              <Shield className="h-5 w-5 text-gray-400 mr-3" />
                              <p className="font-medium text-gray-700 truncate">{role}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-5 sm:px-6">
                      <div className="text-center text-gray-500">
                        {error ? 'Error loading roles' : 'No roles available'}
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;