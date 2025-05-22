export interface User {
  id: string;
  userName: string;
  email: string;
  roles: string[];
  name?: string;
}


export interface RegisterDto {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  isEmailVerified: boolean;
  isDeleted: boolean;
}

export interface IAuthService {
  login: (email: string, password: string) => Promise<any>;
  loginWithSession: (email: string) => Promise<any>; // 👈 Add this line
  register: (user: any) => Promise<any>;
  logout: (refreshToken: string) => Promise<void>;
  getUserInfo: (token: string) => Promise<any>;
  validateToken: (token: string) => Promise<boolean>;
}

