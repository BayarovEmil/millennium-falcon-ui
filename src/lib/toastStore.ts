export interface Toast {
  id: number
  title: string
  detail?: string
}

type Listener = (toasts: Toast[]) => void

let toasts: Toast[] = []
let nextId = 0
const listeners = new Set<Listener>()

function emit(): void {
  for (const listener of listeners) {
    listener(toasts)
  }
}

export function pushToast(toast: Omit<Toast, 'id'>): void {
  const id = nextId++
  toasts = [...toasts, { ...toast, id }]
  emit()
  setTimeout(() => dismissToast(id), 6000)
}

export function dismissToast(id: number): void {
  toasts = toasts.filter((t) => t.id !== id)
  emit()
}

export function subscribeToasts(listener: Listener): () => void {
  listeners.add(listener)
  listener(toasts)
  return () => listeners.delete(listener)
}
