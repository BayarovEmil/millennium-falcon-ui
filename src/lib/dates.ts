import { format, parse, startOfWeek as dateFnsStartOfWeek } from 'date-fns'

/** URL param format for month-scoped routes, e.g. "2026-08". */
export const MONTH_PARAM_FORMAT = 'yyyy-MM'

/** URL param format for day/week-scoped routes, e.g. "2026-08-27". */
export const DAY_PARAM_FORMAT = 'yyyy-MM-dd'

/** The backend is ISO / Monday-first — use this instead of date-fns' default Sunday start. */
export function startOfWeek(date: Date): Date {
  return dateFnsStartOfWeek(date, { weekStartsOn: 1 })
}

export function formatMonthParam(date: Date): string {
  return format(date, MONTH_PARAM_FORMAT)
}

export function formatDayParam(date: Date): string {
  return format(date, DAY_PARAM_FORMAT)
}

export function parseMonthParam(param: string): Date {
  return parse(param, MONTH_PARAM_FORMAT, new Date())
}

export function parseDayParam(param: string): Date {
  return parse(param, DAY_PARAM_FORMAT, new Date())
}

export function currentMonthParam(): string {
  return formatMonthParam(new Date())
}

export function currentDayParam(): string {
  return formatDayParam(new Date())
}
