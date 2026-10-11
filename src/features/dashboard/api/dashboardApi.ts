import { customers, serviceRequests, appointments, invoices } from '@/data/mockData';

export const getDashboardStats = async () => {
  return {
    totalCustomers: customers.length,
    activeServiceRequests: serviceRequests.filter((request) => request.status !== 'Closed' && request.status !== 'Cancelled').length,
    todaysAppointments: appointments.filter((appointment) => appointment.date === '2026-10-02').length,
    pendingPayments: invoices.filter((invoice) => invoice.amountPaid < invoice.total).length,
    monthlyRevenue: invoices.reduce((sum, invoice) => sum + invoice.total, 0),
    serviceStatusBreakdown: {
      New: 3,
      Assigned: 4,
      Scheduled: 2,
      'In Progress': 5,
      Completed: 2,
      Closed: 6,
    },
    branchComparison: [
      { branch: 'North Branch', value: 18 },
      { branch: 'South Branch', value: 11 },
      { branch: 'Central Branch', value: 14 },
    ],
  };
};
