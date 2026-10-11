import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getCustomers } from '@/features/customers/api/customersApi';
import { branches } from '@/data/mockData';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { StatusBadge } from '@/components/ui/StatusBadge';

export function CustomersPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({ queryKey: ['customers'], queryFn: getCustomers });
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCustomers = useMemo(() => {
    const query = search.toLowerCase();
    return (data ?? []).filter((customer) => {
      const matchesBranch = branchFilter === 'all' || customer.branchId === branchFilter;
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      const matchesQuery = !query || [customer.name, customer.email, customer.phone].some((value) => value.toLowerCase().includes(query));
      return matchesBranch && matchesStatus && matchesQuery;
    });
  }, [data, search, branchFilter, statusFilter]);

  if (isLoading) {
    return <div className="grid gap-4 md:grid-cols-2"><SkeletonCard /><SkeletonCard /></div>;
  }

  if (isError) {
    return <ErrorState message={error instanceof Error ? error.message : 'Something went wrong.'} onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Customers</h2>
          <p className="text-slate-600">Manage customer records across all branches</p>
        </div>
        <button className="btn-primary">Add Customer</button>
      </div>

      <div className="card">
        <div className="space-y-3 md:flex md:items-center md:justify-between">
          <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 md:max-w-sm" placeholder="Search customers..." />
          <div className="flex gap-2">
            <select value={branchFilter} onChange={(event) => setBranchFilter(event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2">
              <option value="all">All branches</option>
              {branches.map((branch) => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2">
              <option value="all">All status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <EmptyState title="No customers found." message="Try adjusting filters or create a new customer." />
      ) : (
        <div className="card overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-600">
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">Branch</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-slate-100">
                  <td className="px-3 py-3 font-medium"><Link to={`/app/customers/${customer.id}`}>{customer.name}</Link></td>
                  <td className="px-3 py-3">{customer.email}</td>
                  <td className="px-3 py-3">{branches.find((branch) => branch.id === customer.branchId)?.name ?? 'Unknown'}</td>
                  <td className="px-3 py-3"><StatusBadge label={customer.status} tone={customer.status === 'active' ? 'success' : 'neutral'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
