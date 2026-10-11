import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { loginApi } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/store/authStore';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function LoginPage() {
  const navigate = useNavigate();
  const { login, hydrate } = useAuthStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'admin@serviceops.com', password: 'admin123' },
  });

  hydrate();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const session = await loginApi(values);
      login(session);
      navigate('/app/dashboard');
    } catch (error) {
      console.error(error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900">ServiceOps</h1>
          <p className="mt-2 text-slate-500">Sign in to your service operations portal</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
          <div>Demo roles:</div>
          <div>Admin: admin@serviceops.com / admin123</div>
          <div>Branch Manager: manager@northbranch.com / manager123</div>
          <div>Staff: staff@serviceops.com / staff123</div>
        </div>
      </div>
    </div>
  );
}
