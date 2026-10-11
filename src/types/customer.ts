export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchId: string;
  status: 'active' | 'inactive';
  address: string;
  notes?: string;
}
