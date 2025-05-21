import { IRealmService, NewRealmDto } from '../../../types/services/IRealmService';
import authAPI from './axiosInstance';

export const realmService: IRealmService = {
  createRealm: async (realmData: NewRealmDto) => {
    const { data } = await authAPI.post('/', realmData);
    return data;
  },
};
