import React from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useResumeContext();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 transform animate-slide-up ${
            toast.type === 'success'
              ? 'bg-emerald-500/90 text-white border-emerald-400'
              : toast.type === 'error'
              ? 'bg-rose-500/90 text-white border-rose-400'
              : 'bg-slate-900/90 text-white border-slate-700'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-200" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-200" />}
            {toast.type === 'info' && <Info className="w-5 h-5 flex-shrink-0 text-sky-200" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
