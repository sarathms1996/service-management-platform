import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { employees as seedEmployees, branches } from '@/data/mockData';
import { ErrorState } from '@/components/ui/ErrorState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { Employee } from '@/types/employee';

const createBlankEmployee = (): Omit<Employee, 'id'> => ({
  name: '',
  email: '',
  phone: '',
  role: 'staff',
  branchId: 'b-1',
  isActive: true,
});

export function EmployeesPage() {
  const [rows, setRows] = useState(seedEmployees);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<Employee, 'id'>>(createBlankEmployee());

  const handleCreateEmployee = () => {
    const nextEmployee: Employee = {
      id: `e-${Date.now()}`,
      ...draft,
    };

    setRows((current) => [nextEmployee, ...current]);
    setDraft(createBlankEmployee());
    setIsFormOpen(false);
  };

  const { isLoading, isError, error, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => seedEmployees,
  });

  if (isLoading) return <div className="card">Loading employees…</div>;
  if (isError) return <ErrorState message={error instanceof Error ? error.message : 'Something went wrong.'} onRetry={() => refetch()} />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Employees</h2>
          <p className="text-slate-600">Manage staff assignments and branch coverage</p>
        </div>
        <button className="btn-primary" onClick={() => setIsFormOpen(true)}>Add Employee</button>
      </div>

      {isFormOpen && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Create employee</h3>
            <button type="button" className="btn-secondary" onClick={() => setIsFormOpen(false)}>Close</button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Employee name" />
            <input value={draft.email} onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Email" />
            <input value={draft.phone} onChange={(event) => setDraft((current) => ({ ...current, phone: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Phone" />
            <select value={draft.branchId} onChange={(event) => setDraft((current) => ({ ...current, branchId: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2">
              {branches.map((branch) => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
            </select>
            <select value={draft.role} onChange={(event) => setDraft((current) => ({ ...current, role: event.target.value as Employee['role'] }))} className="rounded-lg border border-slate-300 px-3 py-2">
              <option value="admin">Admin</option>
              <option value="branch_manager">Branch Manager</option>
              <option value="staff">Staff</option>
            </select>
            <select value={draft.isActive ? 'active' : 'inactive'} onChange={(event) => setDraft((current) => ({ ...current, isActive: event.target.value === 'active' }))} className="rounded-lg border border-slate-300 px-3 py-2">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-secondary" onClick={() => setIsFormOpen(false)}>Cancel</button>
            <button type="button" className="btn-primary" onClick={handleCreateEmployee}>Save employee</button>
          </div>
        </div>
      )}

      <div className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-600">
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Role</th>
              <th className="px-3 py-3">Branch</th>
              <th className="px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((employee) => (
              <tr key={employee.id} className="border-b border-slate-100">
                <td className="px-3 py-3">{employee.name}</td>
                <td className="px-3 py-3">{employee.role}</td>
                <td className="px-3 py-3">{branches.find((branch) => branch.id === employee.branchId)?.name}</td>
                <td className="px-3 py-3"><StatusBadge label={employee.isActive ? 'Active' : 'Inactive'} tone={employee.isActive ? 'success' : 'neutral'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
