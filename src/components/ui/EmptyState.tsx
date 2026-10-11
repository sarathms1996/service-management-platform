interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="card text-center">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {message && <p className="mt-2 text-sm text-slate-600">{message}</p>}
      {onAction && actionLabel && (
        <button className="btn-primary mt-4" onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}
