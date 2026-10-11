import type { Branch } from '@/types/branch';
import type { Customer } from '@/types/customer';
import type { Employee } from '@/types/employee';
import type { Invoice } from '@/types/invoice';
import type { NotificationItem } from '@/types/notification';
import type { ServiceRequest } from '@/types/request';
import type { ServiceItem } from '@/types/service';
import type { Appointment } from '@/types/appointment';

export const branches: Branch[] = [
  { id: 'b-1', name: 'North Branch', code: 'NTH', location: 'Downtown', managerId: 'e-2', status: 'active' },
  { id: 'b-2', name: 'South Branch', code: 'STH', location: 'Harbor District', managerId: 'e-3', status: 'active' },
  { id: 'b-3', name: 'Central Branch', code: 'CTR', location: 'Midtown', managerId: 'e-4', status: 'active' },
];

export const employees: Employee[] = [
  { id: 'e-1', name: 'Alice', email: 'admin@serviceops.com', phone: '555-1111', role: 'admin', branchId: 'b-1', isActive: true },
  { id: 'e-2', name: 'John', email: 'manager@northbranch.com', phone: '555-2222', role: 'branch_manager', branchId: 'b-1', isActive: true },
  { id: 'e-3', name: 'Priya', email: 'staff@serviceops.com', phone: '555-3333', role: 'staff', branchId: 'b-1', isActive: true },
  { id: 'e-4', name: 'Damu', email: 'luis@serviceops.com', phone: '555-4444', role: 'staff', branchId: 'b-2', isActive: true },
  { id: 'e-5', name: 'kannappi', email: 'nina@serviceops.com', phone: '555-5555', role: 'staff', branchId: 'b-3', isActive: true },
];

export const customers: Customer[] = [
  { id: 'c-1', name: 'John Smith', email: 'john@acme.com', phone: '555-0001', branchId: 'b-1', status: 'active', address: '18 Cedar Ave', notes: 'Prefers morning appointments.' },
  { id: 'c-2', name: 'Robert', email: 'maria@park.com', phone: '555-0002', branchId: 'b-2', status: 'active', address: '91 Harbor Road', notes: 'Needs follow-up once work is completed.' },
  { id: 'c-3', name: 'Samuel', email: 'david@greenfield.com', phone: '555-0003', branchId: 'b-3', status: 'inactive', address: '40 Elm St', notes: 'Paused work after last invoice.' },
  { id: 'c-4', name: 'Sarah', email: 'sarah@riverside.com', phone: '555-0004', branchId: 'b-1', status: 'active', address: '12 Lakeview Circle', notes: 'Urgent request on water heater.' },
];

export const services: ServiceItem[] = [
  { id: 's-1', name: 'HVAC Maintenance', description: 'Seasonal maintenance and inspection', category: 'HVAC', basePrice: 240, durationHours: 3 },
  { id: 's-2', name: 'Electrical Repair', description: 'Circuit diagnostics and repair', category: 'Electrical', basePrice: 315, durationHours: 2 },
  { id: 's-3', name: 'Plumbing Service', description: 'Leak detection and fixture repairs', category: 'Plumbing', basePrice: 220, durationHours: 2 },
];

export const serviceRequests: ServiceRequest[] = [
  { id: 'r-1', customerId: 'c-1', serviceId: 's-1', branchId: 'b-1', assignedEmployeeId: 'e-3', priority: 'High', status: 'Assigned', notes: 'Cooling issue', createdAt: '2026-09-28T10:00:00', updatedAt: '2026-09-30T11:30:00' },
  { id: 'r-2', customerId: 'c-2', serviceId: 's-2', branchId: 'b-2', assignedEmployeeId: 'e-4', priority: 'Urgent', status: 'In Progress', notes: 'Power outage in office', createdAt: '2026-09-27T09:00:00', updatedAt: '2026-10-01T08:45:00' },
  { id: 'r-3', customerId: 'c-4', serviceId: 's-3', branchId: 'b-1', assignedEmployeeId: 'e-3', priority: 'Medium', status: 'Scheduled', notes: 'Water heater replacement', createdAt: '2026-09-29T12:00:00', updatedAt: '2026-10-01T07:00:00' },
];

export const appointments: Appointment[] = [
  { id: 'a-1', customerId: 'c-1', requestId: 'r-1', employeeId: 'e-3', branchId: 'b-1', date: '2026-10-03', time: '09:00', durationMinutes: 120, status: 'Scheduled' },
  { id: 'a-2', customerId: 'c-2', requestId: 'r-2', employeeId: 'e-4', branchId: 'b-2', date: '2026-10-02', time: '14:00', durationMinutes: 90, status: 'Scheduled' },
  { id: 'a-3', customerId: 'c-4', requestId: 'r-3', employeeId: 'e-3', branchId: 'b-1', date: '2026-10-05', time: '11:30', durationMinutes: 120, status: 'Rescheduled' },
];

export const invoices: Invoice[] = [
  {
    id: 'inv-1001',
    customerId: 'c-1',
    serviceRequestId: 'r-1',
    branchId: 'b-1',
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    status: 'Partially Paid',
    items: [{ id: 'li-1', description: 'HVAC Maintenance', quantity: 1, unitPrice: 240, discount: 0, taxRate: 8 }],
    subtotal: 240,
    discount: 0,
    tax: 19.2,
    total: 259.2,
    amountPaid: 100,
  },
];

export const notifications: NotificationItem[] = [
  { id: 'n-1', userId: 'e-3', title: 'Service request assigned', message: 'Request R-1 assigned to you.', type: 'info', isRead: false, createdAt: '2026-10-01T09:15:00' },
  { id: 'n-2', userId: 'e-3', title: 'Appointment rescheduled', message: 'Customer requested a new appointment time.', type: 'warning', isRead: true, createdAt: '2026-10-01T07:00:00' },
];

export const activityLog = [
  { id: 'h-1', user: 'Alice', action: 'Service request created', date: '2026-09-28T10:00:00', relatedEntity: 'R-1' },
  { id: 'h-2', user: 'John', action: 'Employee assigned', date: '2026-09-29T11:00:00', relatedEntity: 'R-1' },
  { id: 'h-3', user: 'Priya', action: 'Appointment scheduled', date: '2026-10-01T08:00:00', relatedEntity: 'A-1' },
];
