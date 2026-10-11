interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong.', onRetry }: ErrorStateProps) {
  return (
    <div className="card border-red-200 bg-red-50 text-red-700">
      <p className="font-medium">{message}</p>
      {onRetry && (
        <button className="btn-secondary mt-3" onClick={onRetry}>Retry</button>
      )}
    </div>
  );
}
