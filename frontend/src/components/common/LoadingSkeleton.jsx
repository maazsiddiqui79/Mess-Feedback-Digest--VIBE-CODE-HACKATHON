export function StatCardSkeleton() {
  return (
    <div className="card flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-surface-2 shrink-0" />
      <div className="space-y-2 flex-1">
        <div className="h-3 w-20 bg-surface-2 rounded" />
        <div className="h-6 w-14 bg-surface-2 rounded" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 4 }) {
  return (
    <tr className="animate-pulse border-b border-border/40">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-3 px-4">
          <div className="h-4 bg-surface-2 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export function ContentSkeleton({ lines = 3 }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-surface-2 rounded"
          style={{ width: `${85 - i * 15}%` }}
        />
      ))}
    </div>
  );
}

export function Spinner({ size = 'md', text = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-7 h-7 border-2',
    lg: 'w-10 h-10 border-3',
  }[size] || 'w-7 h-7 border-2';

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 animate-fade-in">
      <div
        className={`${sizeClasses} border-surface-2 border-t-accent rounded-full animate-spin`}
      />
      {text && <p className="text-xs text-secondary animate-pulse2">{text}</p>}
    </div>
  );
}
