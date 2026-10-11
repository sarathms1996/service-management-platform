export function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="h-4 w-24 rounded bg-slate-200" />
      <div className="mt-4 h-8 w-2/3 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-1/2 rounded bg-slate-200" />
    </div>
  );
}
