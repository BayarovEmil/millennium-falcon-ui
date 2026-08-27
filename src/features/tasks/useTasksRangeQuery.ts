import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { queryKeys } from '../../lib/queryKeys'
import { listTasksByRange } from './api'

export function useTasksRangeQuery(from: string, to: string) {
  return useQuery({
    queryKey: queryKeys.tasks.byRange(from, to),
    queryFn: () => listTasksByRange(from, to),
    placeholderData: keepPreviousData,
  })
}
