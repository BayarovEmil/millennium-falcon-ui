const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

/** RFC 7807 problem+json body shape the backend returns on error. */
export interface ProblemDetails {
  type?: string
  title?: string
  status?: number
  detail?: string
  instance?: string
}

export class ApiError extends Error {
  readonly status: number
  readonly problem: ProblemDetails | undefined

  constructor(status: number, problem: ProblemDetails | undefined, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.problem = problem
  }
}

/**
 * The one place to attach auth once the backend needs it — merged into every
 * request's headers. Empty for now since there's no auth.
 */
function authHeaders(): HeadersInit {
  return {}
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  signal?: AbortSignal
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal } = options

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    signal,
    headers: {
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      Accept: 'application/json',
      ...authHeaders(),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    throw await toApiError(res)
  }

  if (res.status === 204) {
    return undefined as T
  }

  return (await res.json()) as T
}

async function toApiError(res: Response): Promise<ApiError> {
  const contentType = res.headers.get('content-type') ?? ''
  if (contentType.includes('application/problem+json') || contentType.includes('application/json')) {
    const problem = (await res.json().catch(() => undefined)) as ProblemDetails | undefined
    if (problem) {
      return new ApiError(res.status, problem, problem.detail ?? problem.title ?? res.statusText)
    }
  }
  return new ApiError(res.status, undefined, res.statusText)
}

export const api = {
  get: <T>(path: string, signal?: AbortSignal) => apiFetch<T>(path, { method: 'GET', signal }),
  post: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
    apiFetch<T>(path, { method: 'POST', body, signal }),
  put: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
    apiFetch<T>(path, { method: 'PUT', body, signal }),
  patch: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
    apiFetch<T>(path, { method: 'PATCH', body, signal }),
  delete: (path: string, signal?: AbortSignal) => apiFetch<void>(path, { method: 'DELETE', signal }),
}
