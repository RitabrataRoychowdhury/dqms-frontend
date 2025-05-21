export interface User {
  id: string;
  email: string;
  userName: string;
  roles: string[];
  [key: string]: any;
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
  login(email: string, password: string): Promise<any>;
  register(user: RegisterDto): Promise<any>;
  logout(refreshToken: string): Promise<void>;
  getUserInfo(token: string): Promise<User>;
  validateToken(token: string): Promise<boolean>;
}
