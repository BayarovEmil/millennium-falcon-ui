import { currentDayParam, formatDayParam, formatMonthParam, parseDayParam, parseMonthParam, startOfWeek } from './dates'

/** The same point in time expressed as each route's param format. */
export interface PeriodParams {
  month: string
  /** Monday of the containing week, in DAY_PARAM_FORMAT. */
  week: string
  day: string
}

export function periodParamsFromDay(dayParam: string): PeriodParams {
  const date = parseDayParam(dayParam)
  return {
    month: formatMonthParam(date),
    week: formatDayParam(startOfWeek(date)),
    day: dayParam,
  }
}

export function periodParamsFromMonth(monthParam: string): PeriodParams {
  return periodParamsFromDay(formatDayParam(parseMonthParam(monthParam)))
}

export function currentPeriodParams(): PeriodParams {
  return periodParamsFromDay(currentDayParam())
}
