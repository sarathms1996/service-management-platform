import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { userRoleLabel } from '@/lib/permissions';
import { logoutApi } from '@/features/auth/api/authApi';
import { notifications } from '@/data/mockData';

const navigation = {
  admin: [
    { label: 'Dashboard', to: '/app/dashboard' },
    { label: 'Customers', to: '/app/customers' },
    { label: 'Requests', to: '/app/requests' },
    { label: 'Appointments', to: '/app/appointments' },
    { label: 'Employees', to: '/app/employees' },
    { label: 'Branches', to: '/app/branches' },
    { label: 'Services', to: '/app/services' },
    { label: 'Invoices', to: '/app/invoices' },
    { label: 'Notifications', to: '/app/notifications' },
  ],
  branch_manager: [
    { label: 'Dashboard', to: '/app/dashboard' },
    { label: 'Customers', to: '/app/customers' },
    { label: 'Requests', to: '/app/requests' },
    { label: 'Appointments', to: '/app/appointments' },
    { label: 'Employees', to: '/app/employees' },
    { label: 'Services', to: '/app/services' },
    { label: 'Invoices', to: '/app/invoices' },
    { label: 'Notifications', to: '/app/notifications' },
  ],
  staff: [
    { label: 'Dashboard', to: '/app/dashboard' },
    { label: 'Customers', to: '/app/customers' },
    { label: 'Requests', to: '/app/requests' },
    { label: 'Appointments', to: '/app/appointments' },
    { label: 'Invoices', to: '/app/invoices' },
    { label: 'Notifications', to: '/app/notifications' },
  ],
};

export function AppLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const roleItems = user ? navigation[user.role] : navigation.admin;
  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead && (user?.role === 'admin' || notification.userId === user?.id),
  ).length;

  const handleLogout = async () => {
    await logoutApi();
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-200 bg-slate-900 text-slate-100 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="p-5">
            <div className="text-xl font-bold">ServiceOps</div>
            <div className="mt-2 text-sm text-slate-300">Operations Platform</div>
          </div>
          <nav className="space-y-1 p-3">
            {roleItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-slate-700 text-white' : 'text-slate-200 hover:bg-slate-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div>
              <h1 className="text-lg font-semibold">Service Management & Operations</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-secondary" onClick={() => navigate('/app/notifications')}>
                🔔 {unreadNotifications}
              </button>
              <div className="text-right">
                <div className="text-sm font-semibold">{user?.name}</div>
                <div className="text-xs text-slate-500">{user ? userRoleLabel(user.role) : 'User'}</div>
              </div>
              <button className="btn-danger" onClick={handleLogout}>Logout</button>
            </div>
          </header>
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
