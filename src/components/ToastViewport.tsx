import { useEffect, useState } from 'react'

import { dismissToast, subscribeToasts, type Toast } from '../lib/toastStore'

export function ToastViewport() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => subscribeToasts(setToasts), [])

  if (toasts.length === 0) {
    return null
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className="pointer-events-auto flex items-start justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div>
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{toast.title}</p>
            {toast.detail && <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{toast.detail}</p>}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss"
            className="shrink-0 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
