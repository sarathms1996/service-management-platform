import type { RequestStatus } from '@/types/request';

export const requestStatusSequence: RequestStatus[] = [
  'New',
  'Assigned',
  'Scheduled',
  'In Progress',
  'Completed',
  'Closed',
];

const validTransitionMap: Record<RequestStatus, RequestStatus[]> = {
  New: ['Assigned', 'Cancelled'],
  Assigned: ['Scheduled', 'In Progress', 'On Hold', 'Cancelled'],
  Scheduled: ['In Progress', 'On Hold', 'Cancelled'],
  'In Progress': ['Completed', 'On Hold', 'Cancelled'],
  'On Hold': ['Assigned', 'Scheduled', 'In Progress', 'Cancelled'],
  Completed: ['Closed', 'Reopened'],
  Closed: ['Reopened'],
  Cancelled: [],
  Reopened: ['Assigned', 'Scheduled', 'In Progress', 'Cancelled'],
};

export const getValidTransitions = (status: RequestStatus) => validTransitionMap[status] ?? [];

export const canTransition = (from: RequestStatus, to: RequestStatus) =>
  getValidTransitions(from).includes(to);

export const isTerminalStatus = (status: RequestStatus) => ['Closed', 'Cancelled'].includes(status);

export const getRequestSummary = (status: RequestStatus) => ({
  New: 'Request created and awaiting assignment',
  Assigned: 'Work assigned to a technician',
  Scheduled: 'Appointment scheduled for the customer',
  'In Progress': 'Technician is actively working on the service',
  'On Hold': 'Customer or team follow-up is pending',
  Completed: 'Work is complete and awaiting closure',
  Closed: 'Work is closed and finalised',
  Cancelled: 'Request was cancelled',
  Reopened: 'Request was reopened for follow-up',
}[status] ?? 'Unknown status');
