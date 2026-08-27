import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { queryKeys } from '../../lib/queryKeys'
import { getMonthPeriod } from './api'

export function useMonthQuery(month: string) {
  return useQuery({
    queryKey: queryKeys.period.month(month),
    queryFn: () => getMonthPeriod(month),
    placeholderData: keepPreviousData,
  })
}
