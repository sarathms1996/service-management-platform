import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCustomerById } from '@/features/customers/api/customersApi';
import { appointments, activityLog, branches, invoices, serviceRequests } from '@/data/mockData';
import { ErrorState } from '@/components/ui/ErrorState';
import { StatusBadge } from '@/components/ui/StatusBadge';

export function CustomerDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomerById(id ?? ''),
    enabled: !!id,
  });

  if (isLoading) return <div className="card">Loading customer…</div>;
  if (isError) return <ErrorState message={error instanceof Error ? error.message : 'Something went wrong.'} onRetry={() => refetch()} />;
  if (!data) return <div className="card">Customer not found.</div>;

  const customerRequests = serviceRequests.filter((request) => request.customerId === data.id);
  const customerAppointments = appointments.filter((appointment) => appointment.customerId === data.id);
  const customerInvoices = invoices.filter((invoice) => invoice.customerId === data.id);

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{data.name}</h2>
            <p className="text-slate-600">{data.email} • {data.phone}</p>
          </div>
          <Link to="/app/customers" className="btn-secondary">Back to customers</Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="card"><h3 className="font-semibold">Service Requests</h3><p className="mt-2 text-2xl font-bold">{customerRequests.length}</p></div>
        <div className="card"><h3 className="font-semibold">Appointments</h3><p className="mt-2 text-2xl font-bold">{customerAppointments.length}</p></div>
        <div className="card"><h3 className="font-semibold">Invoices</h3><p className="mt-2 text-2xl font-bold">{customerInvoices.length}</p></div>
        <div className="card"><h3 className="font-semibold">Branch</h3><p className="mt-2 text-xl font-bold">{branches.find((branch) => branch.id === data.branchId)?.name ?? 'N/A'}</p></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-semibold">Profile</h3>
          <dl className="mt-4 space-y-2 text-sm text-slate-600">
            <div><dt className="font-medium text-slate-800">Address</dt><dd>{data.address}</dd></div>
            <div><dt className="font-medium text-slate-800">Status</dt><dd><StatusBadge label={data.status} tone={data.status === 'active' ? 'success' : 'neutral'} /></dd></div>
            <div><dt className="font-medium text-slate-800">Notes</dt><dd>{data.notes ?? 'No notes.'}</dd></div>
          </dl>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold">Activity History</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {activityLog.map((item) => (
              <li key={item.id} className="border-b border-slate-100 pb-2">{item.user} — {item.action}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
