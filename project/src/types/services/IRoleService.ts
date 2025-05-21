export interface IRoleService {
  assignRole(userId: string, roleName: string): Promise<any>;
  removeRole(userId: string, roleName: string): Promise<any>;
  getAllRoles(): Promise<string[]>;
}
