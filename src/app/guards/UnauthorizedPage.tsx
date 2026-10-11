import { Link } from 'react-router-dom';

export function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="card max-w-md text-center">
        <h1 className="text-2xl font-bold text-slate-900">Access denied</h1>
        <p className="mt-3 text-slate-600">You do not have access to this page.</p>
        <Link to="/app/dashboard" className="btn-primary mt-6 w-full">
          Return to dashboard
        </Link>
      </div>
    </div>
  );
}
