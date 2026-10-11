export type RequestStatus =
  | 'New'
  | 'Assigned'
  | 'Scheduled'
  | 'In Progress'
  | 'On Hold'
  | 'Completed'
  | 'Closed'
  | 'Cancelled'
  | 'Reopened';

export type RequestPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface ServiceRequest {
  id: string;
  customerId: string;
  serviceId: string;
  branchId: string;
  assignedEmployeeId?: string;
  priority: RequestPriority;
  status: RequestStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
