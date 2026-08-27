import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { MonthViewDto } from '../../api/types'
import { queryKeys } from '../../lib/queryKeys'
import { updatePeriodNote } from './api'

export function useUpdateMonthNoteMutation(month: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ periodId, note }: { periodId: number; note: string }) =>
      updatePeriodNote(periodId, { note }),
    onSuccess: (updatedPeriod) => {
      queryClient.setQueryData<MonthViewDto>(queryKeys.period.month(month), (old) =>
        old ? { ...old, period: updatedPeriod } : old,
      )
    },
  })
}
