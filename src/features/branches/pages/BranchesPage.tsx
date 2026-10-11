import { useState } from 'react';
import { branches as seedBranches, customers, employees } from '@/data/mockData';
import { StatusBadge } from '@/components/ui/StatusBadge';

const createBlankBranch = () => ({
  name: '',
  code: '',
  location: '',
  managerId: employees[0]?.id ?? '',
  status: 'active' as const,
});

export function BranchesPage() {
  const [rows, setRows] = useState(seedBranches);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [draft, setDraft] = useState(createBlankBranch());

  const handleCreateBranch = () => {
    const nextBranch = {
      id: `b-${Date.now()}`,
      name: draft.name,
      code: draft.code,
      location: draft.location,
      managerId: draft.managerId,
      status: draft.status,
    };

    setRows((current) => [nextBranch, ...current]);
    setDraft(createBlankBranch());
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Branches</h2>
          <p className="text-slate-600">Regional coverage and performance</p>
        </div>
        <button className="btn-primary" onClick={() => setIsFormOpen(true)}>Add Branch</button>
      </div>

      {isFormOpen && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Create branch</h3>
            <button type="button" className="btn-secondary" onClick={() => setIsFormOpen(false)}>Close</button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Branch name" />
            <input value={draft.code} onChange={(event) => setDraft((current) => ({ ...current, code: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Code" />
            <input value={draft.location} onChange={(event) => setDraft((current) => ({ ...current, location: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2" placeholder="Location" />
            <select value={draft.managerId} onChange={(event) => setDraft((current) => ({ ...current, managerId: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2">
              {employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-secondary" onClick={() => setIsFormOpen(false)}>Cancel</button>
            <button type="button" className="btn-primary" onClick={handleCreateBranch}>Save branch</button>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {rows.map((branch) => {
          const manager = employees.find((employee) => employee.id === branch.managerId);
          const customerCount = customers.filter((customer) => customer.branchId === branch.id).length;

          return (
            <div key={branch.id} className="card">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{branch.name}</h3>
                <StatusBadge label={branch.status} tone={branch.status === 'active' ? 'success' : 'neutral'} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{branch.location}</p>
              <p className="mt-3 text-sm text-slate-600">Manager: {manager?.name ?? 'Unassigned'}</p>
              <p className="mt-1 text-sm text-slate-600">Customers: {customerCount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
