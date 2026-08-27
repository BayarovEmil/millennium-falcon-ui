import { useQuery } from '@tanstack/react-query'

import type { GoalStatus, GoalType } from '../../api/types'
import { queryKeys } from '../../lib/queryKeys'
import { listGoals } from './api'

export function useGoalsQuery(params: { periodId?: number; status?: GoalStatus; type?: GoalType } = {}) {
  return useQuery({
    queryKey: queryKeys.goals.list(params),
    queryFn: () => listGoals(params),
    enabled: params.periodId !== undefined,
  })
}
