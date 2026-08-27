import type { CreateGoalRequest, GoalDto, GoalStatus, GoalType, UpdateGoalRequest } from '../../api/types'
import { api } from '../../lib/api/client'
import { toQueryString } from '../../lib/api/queryString'

export function listGoals(params: { periodId?: number; status?: GoalStatus; type?: GoalType } = {}): Promise<
  GoalDto[]
> {
  return api.get<GoalDto[]>(`/api/goals${toQueryString(params)}`)
}

export function createGoal(request: CreateGoalRequest): Promise<GoalDto> {
  return api.post<GoalDto>('/api/goals', request)
}

export function updateGoal(id: number, request: UpdateGoalRequest): Promise<GoalDto> {
  return api.put<GoalDto>(`/api/goals/${id}`, request)
}

export function deleteGoal(id: number): Promise<void> {
  return api.delete(`/api/goals/${id}`)
}
