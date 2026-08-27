import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

import { ApiError } from './api/client'
import { pushToast } from './toastStore'

function handleError(error: unknown): void {
  if (error instanceof ApiError) {
    pushToast({
      title: error.problem?.title ?? 'Request failed',
      detail: error.problem?.detail,
    })
  }
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleError }),
  mutationCache: new MutationCache({ onError: handleError }),
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          return false
        }
        return failureCount < 2
      },
    },
    mutations: {
      retry: false,
    },
  },
})
