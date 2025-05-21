import { createContext, ReactNode, useContext } from 'react';
import { IAuthService } from '../types/services/IAuthService';
import { IRealmService } from '../types/services/IRealmService';
import { IRoleService } from '../types/services/IRoleService';

export interface ServiceContextProps {
  authService: IAuthService;
  realmService: IRealmService;
  roleService: IRoleService;
}

const ServiceContext = createContext<ServiceContextProps | null>(null);

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) throw new Error('useServices must be used within a ServiceProvider');
  return context;
};

export const ServiceProvider = ({
  children,
  services,
}: {
  children: ReactNode;
  services: ServiceContextProps;
}) => (
  <ServiceContext.Provider value={services}>
    {children}
  </ServiceContext.Provider>
);
