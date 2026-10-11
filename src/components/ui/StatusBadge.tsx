interface StatusBadgeProps {
  label: string;
  tone?: 'success' | 'warning' | 'info' | 'danger' | 'neutral';
}

const toneMap: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-blue-100 text-blue-700',
  danger: 'bg-red-100 text-red-700',
  neutral: 'bg-slate-200 text-slate-700',
};

export function StatusBadge({ label, tone = 'neutral' }: StatusBadgeProps) {
  return <span className={`badge ${toneMap[tone]}`}>{label}</span>;
}
