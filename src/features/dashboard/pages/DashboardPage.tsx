import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { ErrorState } from '@/components/ui/ErrorState';
import { getDashboardStats } from '@/features/dashboard/api/dashboardApi';
import { formatCurrency } from '@/lib/utilities';

export function DashboardPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
  });

  const title = user?.role === 'admin' ? 'Admin Dashboard' : user?.role === 'branch_manager' ? 'Branch Manager Dashboard' : 'Staff Dashboard';

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (<SkeletonCard key={index} />))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorState message={error instanceof Error ? error.message : 'Something went wrong.'} onRetry={() => refetch()} />;
  }

  const stats = [
    { label: 'Total Customers', value: data?.totalCustomers ?? 0 },
    { label: 'Active Requests', value: data?.activeServiceRequests ?? 0 },
    { label: 'Today\'s Appointments', value: data?.todaysAppointments ?? 0 },
    { label: 'Pending Payments', value: data?.pendingPayments ?? 0 },
    { label: 'Monthly Revenue', value: formatCurrency(data?.monthlyRevenue ?? 0) },
  ];

  const handleStatClick = (index: number) => {
    const routes = ['/app/customers', '/app/requests', '/app/appointments', '/app/invoices', '/app/dashboard'];
    navigate(routes[index] ?? '/app/dashboard');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-600">Welcome back, {user?.name}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat, index) => (
          <button type="button" key={stat.label} className="card text-left" onClick={() => handleStatClick(index)}>
            <div className="text-sm text-slate-500">{stat.label}</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</div>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-semibold">Service Request Status Breakdown</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {Object.entries(data?.serviceStatusBreakdown ?? {}).map(([key, value]) => (
              <li key={key}>{key}: {value}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Branch Comparison</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {(data?.branchComparison ?? []).map((item) => (
              <li key={item.branch}>{item.branch}: {item.value} requests</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
