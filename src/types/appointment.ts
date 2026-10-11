export type AppointmentStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';

export interface Appointment {
  id: string;
  customerId: string;
  requestId?: string;
  employeeId: string;
  branchId: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: AppointmentStatus;
}
