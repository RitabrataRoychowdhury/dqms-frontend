import { BrowserRouter, useRoutes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import { ToastContainer } from 'react-toastify';
import { routes } from './routes';
import { authService } from '../features/auth/services/authService';
import { realmService } from '../features/auth/services/realmService';
import { roleService } from '../features/auth/services/roleService';
import { ThemeProvider } from '../contexts/ThemeContext'; // ✅ Import your ThemeContext
import 'react-toastify/dist/ReactToastify.css';

function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

function App() {
  return (
    <ThemeProvider> {/* ✅ Wrap the entire app */}
      <ServiceProvider services={{ authService, realmService, roleService }}>
        <AuthProvider>
          <BrowserRouter>
            <ToastContainer position="top-right" autoClose={3000} />
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </ServiceProvider>
    </ThemeProvider>
  );
}

export default App;
