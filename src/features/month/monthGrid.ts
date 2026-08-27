import { addDays, getMonth, startOfMonth } from 'date-fns'

import { startOfWeek } from '../../lib/dates'

export interface MonthGridDay {
  date: Date
  inCurrentMonth: boolean
}

/** The 42-cell grid always spans this Monday-to-Sunday date range for a given month. */
export function getGridBounds(monthDate: Date): { start: Date; end: Date } {
  const start = startOfWeek(startOfMonth(monthDate))
  return { start, end: addDays(start, 41) }
}

/** Always 42 cells (6 Monday-first weeks) so the grid never reflows between months. */
export function buildMonthGrid(monthDate: Date): MonthGridDay[] {
  const { start } = getGridBounds(monthDate)
  const targetMonth = getMonth(monthDate)

  return Array.from({ length: 42 }, (_, i) => {
    const date = addDays(start, i)
    return { date, inCurrentMonth: getMonth(date) === targetMonth }
  })
}

export function chunkIntoWeeks(days: MonthGridDay[]): MonthGridDay[][] {
  const weeks: MonthGridDay[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  return weeks
}
