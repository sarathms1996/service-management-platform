import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from '@/app/guards/ProtectedRoute';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { CustomersPage } from '@/features/customers/pages/CustomersPage';
import { CustomerDetailPage } from '@/features/customers/pages/CustomerDetailPage';
import { RequestsPage } from '@/features/requests/pages/RequestsPage';
import { AppointmentsPage } from '@/features/appointments/pages/AppointmentsPage';
import { EmployeesPage } from '@/features/employees/pages/EmployeesPage';
import { BranchesPage } from '@/features/branches/pages/BranchesPage';
import { ServicesPage } from '@/features/services/pages/ServicesPage';
import { InvoicesPage } from '@/features/invoices/pages/InvoicesPage';
import { NotificationsPage } from '@/features/notifications/pages/NotificationsPage';
import { UnauthorizedPage } from '@/app/guards/UnauthorizedPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/app/dashboard" element={<DashboardPage />} />
        <Route path="/app/customers" element={<CustomersPage />} />
        <Route path="/app/customers/:id" element={<CustomerDetailPage />} />
        <Route path="/app/requests" element={<RequestsPage />} />
        <Route path="/app/appointments" element={<AppointmentsPage />} />
        <Route path="/app/employees" element={<ProtectedRoute allowedRoles={['admin']}><EmployeesPage /></ProtectedRoute>} />
        <Route path="/app/branches" element={<ProtectedRoute allowedRoles={['admin']}><BranchesPage /></ProtectedRoute>} />
        <Route path="/app/services" element={<ServicesPage />} />
        <Route path="/app/invoices" element={<InvoicesPage />} />
        <Route path="/app/notifications" element={<NotificationsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
