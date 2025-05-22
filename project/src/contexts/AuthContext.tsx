import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { toast } from 'react-toastify';
import { useServices } from './ServiceContext';
import { User } from '../types/services/IAuthService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authService } = useServices();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const isValid = await authService.validateToken(token);
        if (isValid) {
          const storedUser = localStorage.getItem('userInfo');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } else {
          localStorage.clear();
          setUser(null);
        }
      } catch (error) {
        console.error('Error during token validation:', error);
        localStorage.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [authService]);

  const handleLogin = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const response = password
        ? await authService.login(email, password)
        : await authService.loginWithSession(email);

      const userInfo: User = {
        id: response.userId, // or response.id if that's how it comes back
        userName: response.username, // map to userName
        email: response.email,
        name: response.name || response.username || '',
        roles: response?.resource_access?.account?.roles || [],
      };


      // Store tokens and user info
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      setUser(userInfo);
      toast.success('Login successful');
    } catch (error) {
      toast.error('Login failed. Please check your credentials or try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.clear();
      setUser(null);
      setIsLoading(false);
      toast.info('You have been logged out.');
    }
  };

  const hasRole = (role: string): boolean => {
    return user?.roles?.includes(role) ?? false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
