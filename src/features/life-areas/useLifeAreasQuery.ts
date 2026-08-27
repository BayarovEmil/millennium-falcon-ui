import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '../../lib/queryKeys'
import { listLifeAreas } from './api'

export function useLifeAreasQuery() {
  return useQuery({
    queryKey: queryKeys.lifeAreas.list(),
    queryFn: listLifeAreas,
    staleTime: 5 * 60_000,
  })
}
