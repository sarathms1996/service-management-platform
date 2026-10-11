import { useMemo, useState } from 'react';
import { notifications as seedNotifications } from '@/data/mockData';
import { useAuthStore } from '@/store/authStore';

export function NotificationsPage() {
  const { user } = useAuthStore();
  const [items, setItems] = useState(seedNotifications);

  const visibleNotifications = useMemo(
    () => items.filter((notification) => user?.role === 'admin' || notification.userId === user?.id),
    [items, user],
  );

  const handleOpen = (notificationId: string) => {
    setItems((current) =>
      current.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
        <p className="text-slate-600">Recent activity and important updates</p>
      </div>

      <div className="space-y-3">
        {visibleNotifications.map((notification) => (
          <button
            key={notification.id}
            type="button"
            onClick={() => handleOpen(notification.id)}
            className="card flex w-full items-start justify-between gap-4 text-left"
          >
            <div>
              <div className="font-semibold">{notification.title}</div>
              <div className="text-sm text-slate-600">{notification.message}</div>
              <div className="mt-1 text-xs text-slate-500">{new Date(notification.createdAt).toLocaleString()}</div>
            </div>
            <span className={`badge ${notification.isRead ? 'bg-slate-200 text-slate-700' : 'bg-blue-100 text-blue-700'}`}>
              {notification.isRead ? 'Read' : 'Unread'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
