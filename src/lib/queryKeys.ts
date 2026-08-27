import type { GoalStatus, GoalType } from '../api/types'

/**
 * Central query key registry. Keep every key factory here so invalidation
 * call sites (mutations) and read call sites (queries) can't drift apart.
 */
export const queryKeys = {
  period: {
    month: (month: string) => ['period', 'month', month] as const,
    week: (date: string) => ['period', 'week', date] as const,
    day: (date: string) => ['period', 'day', date] as const,
  },
  tasks: {
    byPeriod: (periodId: number) => ['tasks', periodId] as const,
    byRange: (from: string, to: string) => ['tasks', 'range', from, to] as const,
  },
  goals: {
    list: (params: { periodId?: number; status?: GoalStatus; type?: GoalType } = {}) =>
      ['goals', params] as const,
  },
  lifeAreas: {
    list: () => ['life-areas'] as const,
  },
  review: {
    week: (date: string) => ['review', 'week', date] as const,
    month: (month: string) => ['review', 'month', month] as const,
  },
}
