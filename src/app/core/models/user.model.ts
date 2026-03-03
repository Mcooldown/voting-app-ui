export type UserRole = 'admin' | 'user';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface UsersResponse {
  success: boolean;
  data: {
    users: User[];
    count: number;
  };
}

export interface UserResponse {
  success: boolean;
  data: { user: User };
}

export interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}
