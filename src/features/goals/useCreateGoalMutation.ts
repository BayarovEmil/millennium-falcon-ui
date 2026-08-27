import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '../../lib/queryKeys'
import { createGoal } from './api'

export function useCreateGoalMutation(month: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.period.month(month) })
      void queryClient.invalidateQueries({ queryKey: ['goals'] })
    },
  })
}
