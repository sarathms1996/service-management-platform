export type EmployeeRole = 'admin' | 'branch_manager' | 'staff';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  branchId: string;
  isActive: boolean;
}
