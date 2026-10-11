import api from '@/lib/axios';
import type { LoginPayload } from '@/types/user';

export const loginApi = async (payload: LoginPayload) => {
  const users = [
    { id: 'u-1', name: 'Alice', email: 'admin@serviceops.com', password: 'admin123', role: 'admin', branchId: 'b-1', isActive: true },
    { id: 'u-2', name: 'John', email: 'manager@northbranch.com', password: 'manager123', role: 'branch_manager', branchId: 'b-1', isActive: true },
    { id: 'u-3', name: 'Priya', email: 'staff@serviceops.com', password: 'staff123', role: 'staff', branchId: 'b-1', isActive: true },
  ];

  const match = users.find((user) => user.email === payload.email && user.password === payload.password);

  if (!match) {
    throw new Error('Invalid email or password');
  }

  const { password: _password, ...user } = match;

  return {
    token: `mock-token-${match.id}`,
    user,
  };
};

export const getMe = async () => {
  const session = JSON.parse(localStorage.getItem('smop_session') || 'null');
  if (!session?.token) throw new Error('No session');

  return session.user;
};

export const logoutApi = async () => {
  localStorage.removeItem('smop_session');
  localStorage.removeItem('smop_user');
  return true;
};
