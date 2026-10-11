import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRequests } from '@/features/requests/api/requestsApi';
import { branches, customers, employees, services, serviceRequests } from '@/data/mockData';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { canTransition, getValidTransitions } from '@/lib/requestLifecycle';
import type { RequestStatus, ServiceRequest } from '@/types/request';

type RequestDraft = Pick<ServiceRequest, 'customerId' | 'serviceId' | 'branchId' | 'priority' | 'status' | 'notes'> & {
  assignedEmployeeId: string;
};

const statusOptions: RequestStatus[] = [
  'New',
  'Assigned',
  'Scheduled',
  'In Progress',
  'On Hold',
  'Completed',
  'Closed',
  'Cancelled',
  'Reopened',
];

const createBlankRequest = (): RequestDraft => ({
  customerId: customers[0]?.id ?? '',
  serviceId: services[0]?.id ?? '',
  branchId: branches[0]?.id ?? '',
  assignedEmployeeId: employees[0]?.id ?? '',
  priority: 'Medium',
  status: 'New',
  notes: '',
});

export function RequestsPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({ queryKey: ['requests'], queryFn: getRequests });

    const [rows, setRows] = useState<ServiceRequest[]>(serviceRequests);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [draft, setDraft] = useState<RequestDraft>(createBlankRequest());

    useEffect(() => {
      if (data) {
        setRows(data);
      }
    }, [data]);

    const filteredRequests = useMemo(() => {
      const query = search.toLowerCase();
      return [...rows].filter((request) => {
        const customerName = customers.find((customer) => customer.id === request.customerId)?.name ?? '';
        const statusMatch = statusFilter === 'all' || request.status === statusFilter;
        const queryMatch = !query || customerName.toLowerCase().includes(query) || request.notes.toLowerCase().includes(query);
        return statusMatch && queryMatch;
      });
    }, [rows, search, statusFilter]);

    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(filteredRequests.length / pageSize));
    const paginatedRequests = filteredRequests.slice((page - 1) * pageSize, page * pageSize);

    useEffect(() => {
      setPage(1);
    }, [search, statusFilter]);

    const handleStatusChange = (requestId: string, nextStatus: RequestStatus) => {
      setRows((current) =>
        current.map((request) => {
          if (request.id !== requestId) return request;
          if (!canTransition(request.status, nextStatus)) {
            alert(`Status change from ${request.status} to ${nextStatus} is not allowed.`);
            return request;
          }
          return { ...request, status: nextStatus, updatedAt: new Date().toISOString() };
        }),
      );
    };

    const handleCreateRequest = () => {
      if (!draft.customerId || !draft.serviceId || !draft.assignedEmployeeId) {
        alert('Please select a customer, service, and assigned employee.');
        return;
      }

      const nextRequest: ServiceRequest = {
        id: `r-${Date.now()}`,
        customerId: draft.customerId,
        serviceId: draft.serviceId,
        branchId: draft.branchId,
        assignedEmployeeId: draft.assignedEmployeeId,
        priority: draft.priority,
        status: draft.status,
        notes: draft.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setRows((current) => [nextRequest, ...current]);
      setDraft(createBlankRequest());
      setIsFormOpen(false);
    };

    if (isLoading) {
      return <div className="card">Loading requests…</div>;
    }

    if (isError) {
      return <ErrorState message={error instanceof Error ? error.message : 'Something went wrong.'} onRetry={() => refetch()} />;
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Service Requests</h2>
            <p className="text-slate-600">Track work across the service lifecycle</p>
          </div>
          <button className="btn-primary" onClick={() => setIsFormOpen(true)}>New Request</button>
        </div>

        <div className="card space-y-3 md:flex md:items-center md:justify-between">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 md:max-w-sm"
            placeholder="Search requests by customer or note"
          />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2">
            <option value="all">All statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {isFormOpen && (
          <div className="card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Create service request</h3>
              <button type="button" className="btn-secondary" onClick={() => setIsFormOpen(false)}>Close</button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <select value={draft.customerId} onChange={(event) => setDraft((current) => ({ ...current, customerId: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2">
                {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
              </select>
              <select value={draft.serviceId} onChange={(event) => setDraft((current) => ({ ...current, serviceId: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2">
                {services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
              </select>
              <select value={draft.branchId} onChange={(event) => setDraft((current) => ({ ...current, branchId: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2">
                {branches.map((branch) => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
              </select>
              <select value={draft.assignedEmployeeId} onChange={(event) => setDraft((current) => ({ ...current, assignedEmployeeId: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2">
                {employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}
              </select>
              <select value={draft.priority} onChange={(event) => setDraft((current) => ({ ...current, priority: event.target.value as ServiceRequest['priority'] }))} className="rounded-lg border border-slate-300 px-3 py-2">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
              <select value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value as RequestStatus }))} className="rounded-lg border border-slate-300 px-3 py-2">
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <textarea value={draft.notes} onChange={(event) => setDraft((current) => ({ ...current, notes: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2" placeholder="Service notes" rows={3} />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="btn-secondary" onClick={() => setIsFormOpen(false)}>Cancel</button>
              <button type="button" className="btn-primary" onClick={handleCreateRequest}>Save request</button>
            </div>
          </div>
        )}

        {paginatedRequests.length === 0 ? (
          <EmptyState title="No service requests found." message="Create a new request to start tracking work." />
        ) : (
          <div className="card overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-600">
                  <th className="px-3 py-3">Customer</th>
                  <th className="px-3 py-3">Service</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Priority</th>
                  <th className="px-3 py-3">Update</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.map((request) => (
                  <tr key={request.id} className="border-b border-slate-100">
                    <td className="px-3 py-3">{customers.find((customer) => customer.id === request.customerId)?.name}</td>
                    <td className="px-3 py-3">{services.find((service) => service.id === request.serviceId)?.name}</td>
                    <td className="px-3 py-3"><StatusBadge label={request.status} tone={request.status === 'Completed' ? 'success' : request.status === 'Cancelled' ? 'danger' : 'info'} /></td>
                    <td className="px-3 py-3">{request.priority}</td>
                    <td className="px-3 py-3">
                      <select
                        value={request.status}
                        onChange={(event) => handleStatusChange(request.id, event.target.value as RequestStatus)}
                        className="rounded-lg border border-slate-300 px-2 py-1"
                      >
                        {statusOptions.map((status) => (
                          <option
                            key={status}
                            value={status}
                            disabled={status !== request.status && !getValidTransitions(request.status).includes(status)}
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-600">Page {page} of {totalPages}</p>
              <div className="flex gap-2">
                <button type="button" className="btn-secondary" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</button>
                <button type="button" className="btn-secondary" disabled={page >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

