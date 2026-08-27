import type { MonthViewDto, NoteRequest, PlanPeriodDto } from '../../api/types'
import { api } from '../../lib/api/client'

export function getMonthPeriod(month: string): Promise<MonthViewDto> {
  return api.get<MonthViewDto>(`/api/periods/month/${month}`)
}

export function getWeekPeriod(date: string): Promise<PlanPeriodDto> {
  return api.get<PlanPeriodDto>(`/api/periods/week/${date}`)
}

export function getDayPeriod(date: string): Promise<PlanPeriodDto> {
  return api.get<PlanPeriodDto>(`/api/periods/day/${date}`)
}

export function updatePeriodNote(periodId: number, note: NoteRequest): Promise<PlanPeriodDto> {
  return api.put<PlanPeriodDto>(`/api/periods/${periodId}/note`, note)
}
