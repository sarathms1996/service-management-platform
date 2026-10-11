export interface Branch {
  id: string;
  name: string;
  code: string;
  location: string;
  managerId?: string;
  status: 'active' | 'inactive';
}
