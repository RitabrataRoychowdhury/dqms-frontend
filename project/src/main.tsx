import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '/home/user/Downloads/dqms-frontend/project/src/app/App.tsx';
import './index.css';

import { ServiceProvider } from './contexts/ServiceContext';
import { authService } from './features/auth/services/authService';
import { realmService } from './features/auth/services/realmService';
import { roleService } from './features/auth/services/roleService';
import { ThemeProvider } from './contexts/ThemeContext'; // ✅ import ThemeProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ThemeProvider> 
    <ServiceProvider services={{ authService, realmService, roleService }}>
      <App />
    </ServiceProvider>
   </ThemeProvider>
  </StrictMode>
);
