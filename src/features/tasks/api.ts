import type { TaskDto } from '../../api/types'
import { api } from '../../lib/api/client'
import { toQueryString } from '../../lib/api/queryString'

export function listTasksByRange(from: string, to: string): Promise<TaskDto[]> {
  return api.get<TaskDto[]>(`/api/tasks${toQueryString({ from, to })}`)
}

export function listTasksByPeriod(periodId: number): Promise<TaskDto[]> {
  return api.get<TaskDto[]>(`/api/tasks${toQueryString({ periodId })}`)
}
