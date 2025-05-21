import { IRoleService } from '../../../types/services/IRoleService';
import authAPI from './axiosInstance';

export const roleService: IRoleService = {
  assignRole: async (userId, roleName) => {
    const { data } = await authAPI.post('/assign', null, {
      params: { userId, roleName },
    });
    return data;
  },
  removeRole: async (userId, roleName) => {
    const { data } = await authAPI.post('/remove', null, {
      params: { userId, roleName },
    });
    return data;
  },
  getAllRoles: async () => {
    const { data } = await authAPI.get('/all');
    return data.roles;
  },
};
