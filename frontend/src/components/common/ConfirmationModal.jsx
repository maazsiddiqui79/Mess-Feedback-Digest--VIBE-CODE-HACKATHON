import { useEffect } from 'react';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function ConfirmationModal({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // 'danger' | 'warning' | 'info'
  isLoading = false,
  onConfirm,
  onClose,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isLoading) onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      icon: AlertTriangle,
      color: 'text-danger',
      bg: 'bg-danger/10',
      border: 'border-danger/30',
      button: 'bg-danger hover:bg-danger/85 text-white shadow-[0_0_16px_rgba(248,81,73,0.3)]',
    },
    warning: {
      icon: AlertCircle,
      color: 'text-warning',
      bg: 'bg-warning/10',
      border: 'border-warning/30',
      button: 'bg-warning hover:bg-warning/85 text-white shadow-[0_0_16px_rgba(210,153,34,0.3)]',
    },
    info: {
      icon: Info,
      color: 'text-accent',
      bg: 'bg-accent/10',
      border: 'border-accent/30',
      button: 'btn-primary shadow-[0_0_16px_rgba(88,166,255,0.3)]',
    },
  }[type] || typeConfig.danger;

  const Icon = typeConfig.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="card w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden p-6 animate-scale-in relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface-2 transition-all disabled:opacity-50"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${typeConfig.bg} ${typeConfig.border} ${typeConfig.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-primary">{title}</h3>
            <p className="text-sm text-secondary mt-1 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-secondary hover:text-primary hover:bg-surface-2 border border-border transition-all disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${typeConfig.button} disabled:opacity-50`}
          >
            {isLoading && <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
