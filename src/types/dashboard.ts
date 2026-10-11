export interface DashboardSummary {
  totalCustomers: number;
  activeServiceRequests: number;
  todaysAppointments: number;
  pendingPayments: number;
  monthlyRevenue: number;
  serviceStatusBreakdown: Record<string, number>;
  branchComparison: { branch: string; value: number }[];
}
