'use client';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger'
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      bg: 'bg-red-600',
      hover: 'hover:bg-red-700',
      text: 'text-red-600',
      light: 'bg-red-100',
      icon: (
        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      )
    },
    warning: {
      bg: 'bg-yellow-600',
      hover: 'hover:bg-yellow-700',
      text: 'text-yellow-600',
      light: 'bg-yellow-100',
      icon: (
        <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      )
    },
    info: {
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-600',
      light: 'bg-blue-100',
      icon: (
        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12v-.008z" />
        </svg>
      )
    }
  };

  const config = typeConfig[type];

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#0a0a0a] rounded-3xl border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,1)] w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex flex-col items-center text-center gap-6">
            <div className={`p-5 rounded-full bg-red-600/10 border border-red-600/20 shadow-[0_0_20px_rgba(255,0,51,0.1)]`}>
              {config.icon}
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase">
                {title}
              </h3>
              <p className="text-zinc-400 leading-relaxed font-medium">
                {message}
              </p>
            </div>
          </div>
        </div>
        
        <div className="px-8 py-6 bg-zinc-900/50 border-t border-zinc-800 flex flex-col gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full btn-primary h-14 flex items-center justify-center"
          >
            <span className="uppercase tracking-widest font-black">{confirmText}</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full px-6 py-4 text-sm font-bold text-zinc-500 hover:text-white transition-all uppercase tracking-widest"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
