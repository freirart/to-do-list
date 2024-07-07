import { FormEvent, ReactNode } from 'react';

interface FormDialogInterface {
  handleSubmit: (e: FormEvent) => void;
  children: ReactNode;
}

export function FormDialog({
  handleSubmit,
  children
}: FormDialogInterface) {
  return (
    <dialog
      className="absolute top-0 flex items-center justify-center z-10 w-full h-full
        bg-slate-900/90 text-base"
    >
      <div className="relative w-92 bg-slate-50 rounded-xl p-8 pb-20">
        <form onSubmit={handleSubmit}>{children}</form>
      </div>
    </dialog>
  );
}
