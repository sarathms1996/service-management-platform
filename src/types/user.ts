export type UserRole = 'admin' | 'branch_manager' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branchId?: string;
  isActive: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthSession {
  token: string;
  user: User;
}
