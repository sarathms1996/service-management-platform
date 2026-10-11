import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAppointments } from '@/features/appointments/api/appointmentsApi';
import { appointments as seedAppointments, customers, employees } from '@/data/mockData';
import { ErrorState } from '@/components/ui/ErrorState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { Appointment } from '@/types/appointment';

export function AppointmentsPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({ queryKey: ['appointments'], queryFn: getAppointments });
  const [rows, setRows] = useState<Appointment[]>(seedAppointments);
  const [dateFilter, setDateFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const filteredAppointments = useMemo(
    () => rows.filter((appointment) => {
      const matchesDate = !dateFilter || appointment.date === dateFilter;
      const matchesEmployee = employeeFilter === 'all' || appointment.employeeId === employeeFilter;
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      return matchesDate && matchesEmployee && matchesStatus;
    }),
    [rows, dateFilter, employeeFilter, statusFilter],
  );

  const upcomingAppointments = useMemo(() => {
    const now = new Date();
    return filteredAppointments.filter((appointment) => {
      const appointmentDate = new Date(`${appointment.date}T${appointment.time}:00`);
      const diffInDays = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return diffInDays >= 0 && diffInDays <= 7;
    });
  }, [filteredAppointments]);

  const monthStart = new Date();
  monthStart.setDate(1);
  const calendarDays = Array.from({ length: new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate() }, (_, index) => {
    const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), index + 1);
    const isoDate = date.toISOString().split('T')[0];
    return { day: index + 1, isoDate, count: filteredAppointments.filter((appointment) => appointment.date === isoDate).length };
  });

  const handleCreateAppointment = () => {
    const nextAppointment: Appointment = {
      id: `a-${Date.now()}`,
      customerId: 'c-1',
      requestId: 'r-1',
      employeeId: 'e-3',
      branchId: 'b-1',
      date: '2026-10-10',
      time: '09:00',
      durationMinutes: 90,
      status: 'Scheduled',
    };

    setRows((current) => [nextAppointment, ...current]);
  };

  if (isLoading) return <div className="card">Loading appointments…</div>;
  if (isError) return <ErrorState message={error instanceof Error ? error.message : 'Something went wrong.'} onRetry={() => refetch()} />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Appointments</h2>
          <p className="text-slate-600">Schedule and track customer visits</p>
        </div>
        <button className="btn-primary" onClick={handleCreateAppointment}>New Appointment</button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><h3 className="font-semibold">Filter by date</h3><input type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} className="mt-3 w-full rounded-lg border border-slate-300 p-2" /></div>
        <div className="card"><h3 className="font-semibold">Employee</h3><select value={employeeFilter} onChange={(event) => setEmployeeFilter(event.target.value)} className="mt-3 w-full rounded-lg border border-slate-300 p-2"><option value="all">All employees</option>{employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}</select></div>
        <div className="card"><h3 className="font-semibold">Status</h3><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="mt-3 w-full rounded-lg border border-slate-300 p-2"><option value="all">All status</option><option value="Scheduled">Scheduled</option><option value="Completed">Completed</option><option value="Cancelled">Cancelled</option><option value="Rescheduled">Rescheduled</option></select></div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-semibold">Monthly calendar</h3>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
            {calendarDays.map((day) => (
              <div key={day.isoDate} className="rounded-lg border border-slate-200 p-2">
                <div className="font-semibold text-slate-700">{day.day}</div>
                <div className="mt-1 text-slate-500">{day.count} appt{day.count === 1 ? '' : 's'}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold">Upcoming (next 7 days)</h3>
          <div className="mt-4 space-y-3">
            {upcomingAppointments.length === 0 ? (
              <p className="text-sm text-slate-600">No upcoming appointments in the next seven days.</p>
            ) : (
              upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="rounded-lg border border-slate-200 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold">{customers.find((customer) => customer.id === appointment.customerId)?.name}</span>
                    <StatusBadge label={appointment.status} tone={appointment.status === 'Completed' ? 'success' : appointment.status === 'Cancelled' ? 'danger' : 'info'} />
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{appointment.date} at {appointment.time}</p>
                  <p className="text-sm text-slate-600">Assigned to: {employees.find((employee) => employee.id === appointment.employeeId)?.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="card">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{customers.find((customer) => customer.id === appointment.customerId)?.name}</h3>
              <StatusBadge label={appointment.status} tone={appointment.status === 'Completed' ? 'success' : appointment.status === 'Cancelled' ? 'danger' : 'info'} />
            </div>
            <p className="mt-2 text-sm text-slate-600">{appointment.date} • {appointment.time}</p>
            <p className="mt-1 text-sm text-slate-600">Assigned to: {employees.find((employee) => employee.id === appointment.employeeId)?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
