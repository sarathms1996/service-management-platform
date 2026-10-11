import type { User, UserRole } from '@/types/user';

export const canAccessAdmin = (user?: User | null) => user?.role === 'admin';
export const canAccessBranchManager = (user?: User | null) => user?.role === 'branch_manager';
export const canAccessStaff = (user?: User | null) => user?.role === 'staff';

export const canManageCustomers = (user?: User | null) => !!user && ['admin', 'branch_manager'].includes(user.role);
export const canCreateCustomer = canManageCustomers;
export const canEditCustomer = canManageCustomers;
export const canViewEmployees = (user?: User | null) => !!user && ['admin', 'branch_manager'].includes(user.role);
export const canManageBranches = (user?: User | null) => user?.role === 'admin';
export const canManageServiceRequests = (user?: User | null) => !!user && ['admin', 'branch_manager'].includes(user.role);
export const canViewBranchData = (user?: User | null, branchId?: string) => {
  if (!user || !branchId) return false;
  if (user.role === 'admin') return true;
  if (user.role === 'branch_manager') return user.branchId === branchId;
  return false;
};
export const canViewDashboard = (user?: User | null) => !!user;
export const canAssignRequest = (user?: User | null) => !!user && ['admin', 'branch_manager'].includes(user.role);
export const canRecordPayment = (user?: User | null) => !!user && ['admin', 'branch_manager'].includes(user.role);
export const canCreateEmployee = (user?: User | null) => user?.role === 'admin';
export const canEditEmployee = (user?: User | null) => user?.role === 'admin';
export const canManageInvoices = (user?: User | null) => !!user && ['admin', 'branch_manager'].includes(user.role);
export const canManageAppointments = (user?: User | null) => !!user && ['admin', 'branch_manager'].includes(user.role);
export const canViewCustomerDetails = (user?: User | null) => !!user;
export const userRoleLabel = (role: UserRole) => ({ admin: 'Admin', branch_manager: 'Branch Manager', staff: 'Staff' }[role] ?? role);
