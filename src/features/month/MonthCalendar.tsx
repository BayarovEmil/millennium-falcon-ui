import { getISOWeek, isToday } from 'date-fns'
import { Link } from 'react-router-dom'

import { formatDayParam } from '../../lib/dates'
import type { DayTaskSummary } from './dayTaskSummary'
import { chunkIntoWeeks, type MonthGridDay } from './monthGrid'

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface MonthCalendarProps {
  days: MonthGridDay[]
  tasksByDate: Map<string, DayTaskSummary>
  lifeAreaColorById: Map<number, string>
}

export function MonthCalendar({ days, tasksByDate, lifeAreaColorById }: MonthCalendarProps) {
  const weeks = chunkIntoWeeks(days)

  return (
    <div className="grid grid-cols-[2rem_repeat(7,1fr)] gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800">
      <div className="bg-white dark:bg-neutral-950" />
      {WEEKDAY_LABELS.map((label) => (
        <div
          key={label}
          className="bg-white px-2 py-1.5 text-center text-xs font-medium text-neutral-400 dark:bg-neutral-950 dark:text-neutral-500"
        >
          {label}
        </div>
      ))}

      {weeks.map((week, weekIndex) => {
        const monday = week[0]
        return (
          <div key={monday ? monday.date.toISOString() : weekIndex} className="contents">
            <Link
              to={monday ? `/week/${formatDayParam(monday.date)}` : '#'}
              className="flex items-center justify-center bg-white text-xs text-neutral-400 hover:text-neutral-900 dark:bg-neutral-950 dark:text-neutral-500 dark:hover:text-neutral-100"
            >
              {monday ? getISOWeek(monday.date) : ''}
            </Link>
            {week.map((day) => (
              <DayCell
                key={day.date.toISOString()}
                day={day}
                summary={tasksByDate.get(formatDayParam(day.date))}
                lifeAreaColorById={lifeAreaColorById}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

interface DayCellProps {
  day: MonthGridDay
  summary: DayTaskSummary | undefined
  lifeAreaColorById: Map<number, string>
}

function DayCell({ day, summary, lifeAreaColorById }: DayCellProps) {
  const today = isToday(day.date)
  const completedDots = summary?.completedLifeAreaIds ?? []
  const remaining = summary?.remainingCount ?? 0

  return (
    <Link
      to={`/day/${formatDayParam(day.date)}`}
      className={`flex min-h-20 flex-col gap-1.5 bg-white p-1.5 transition-colors hover:bg-neutral-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 ${
        day.inCurrentMonth ? '' : 'opacity-40'
      }`}
    >
      <span
        className={`inline-flex size-6 items-center justify-center rounded-full text-xs ${
          today
            ? 'font-semibold text-neutral-900 ring-2 ring-inset ring-indigo-500 dark:text-neutral-100 dark:ring-indigo-400'
            : 'text-neutral-600 dark:text-neutral-400'
        }`}
      >
        {day.date.getDate()}
      </span>

      {completedDots.length > 0 && (
        <div className="flex flex-wrap gap-0.5">
          {completedDots.map((lifeAreaId, i) => (
            <span
              key={`${lifeAreaId}-${i}`}
              className="size-1.5 rounded-full"
              style={{ backgroundColor: lifeAreaColorById.get(lifeAreaId) ?? '#a3a3a3' }}
            />
          ))}
        </div>
      )}

      {remaining > 0 && (
        <span className="mt-auto text-[11px] text-neutral-400 dark:text-neutral-500">{remaining} left</span>
      )}
    </Link>
  )
}
