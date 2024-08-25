import { FormEvent, ReactNode } from 'react';

interface FormDialogInterface {
  handleSubmit: () => void;
  errorMessage?: string;
  cancelFn: () => void;
  submitBtnText: string;
  children: ReactNode;
}

export function FormDialog({
  handleSubmit: customHandleSubmit,
  errorMessage,
  cancelFn,
  submitBtnText,
  children
}: FormDialogInterface) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    customHandleSubmit();
  };

  return (
    <dialog
      className="absolute top-0 flex items-center justify-center z-10 w-full h-full
        bg-slate-900/90 text-base"
    >
      <div className="relative w-92 bg-slate-50 rounded-xl p-8 pb-20">
        <form onSubmit={handleSubmit}>
          {children}
          {errorMessage ? (
            <span className="text-red-500">{errorMessage}</span>
          ) : null}
          <div className="flex justify-end mt-4 absolute bottom-5 right-5">
            <button
              type="button"
              className="px-3 py-2 bg-slate-200 hover:bg-slate-200/75 text-slate-600 rounded-lg"
              onClick={cancelFn}
            >
              Cancel
            </button>
            <button
              className="px-3 py-2 bg-green-500 hover:bg-green-500/75 text-slate-50 ml-2
                rounded-lg"
              type="submit"
            >
              {submitBtnText}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
