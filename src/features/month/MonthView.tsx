import { useParams } from 'react-router-dom'

import { formatDayParam, parseMonthParam } from '../../lib/dates'
import { useLifeAreasQuery } from '../life-areas/useLifeAreasQuery'
import { useMonthQuery } from '../periods/useMonthQuery'
import { useTasksRangeQuery } from '../tasks/useTasksRangeQuery'
import { summarizeTasksByDate } from './dayTaskSummary'
import { GoalsPanel } from './GoalsPanel'
import { MonthCalendar } from './MonthCalendar'
import { MonthNoteEditor } from './MonthNoteEditor'
import { buildMonthGrid, getGridBounds } from './monthGrid'

export function MonthView() {
  const { month } = useParams<{ month: string }>()
  const monthParam = month ?? ''
  const monthDate = parseMonthParam(monthParam)

  const days = buildMonthGrid(monthDate)
  const { start, end } = getGridBounds(monthDate)
  const from = formatDayParam(start)
  const to = formatDayParam(end)

  const monthQuery = useMonthQuery(monthParam)
  const tasksQuery = useTasksRangeQuery(from, to)
  const lifeAreasQuery = useLifeAreasQuery()

  const tasksByDate = summarizeTasksByDate(tasksQuery.data ?? [])
  const lifeAreaColorById = new Map((lifeAreasQuery.data ?? []).map((la) => [la.id, la.color]))

  return (
    <div className="flex h-full flex-col gap-6 p-4 lg:flex-row">
      <div className="flex-1">
        <MonthCalendar days={days} tasksByDate={tasksByDate} lifeAreaColorById={lifeAreaColorById} />
      </div>

      <aside className="flex w-full flex-col gap-4 lg:w-80">
        {monthQuery.data ? (
          <>
            <MonthNoteEditor
              key={monthQuery.data.period.id}
              month={monthParam}
              periodId={monthQuery.data.period.id}
              note={monthQuery.data.period.note ?? ''}
            />
            <GoalsPanel month={monthParam} periodId={monthQuery.data.period.id} goals={monthQuery.data.goals} />
          </>
        ) : (
          <SidebarSkeleton />
        )}
      </aside>
    </div>
  )
}

function SidebarSkeleton() {
  return (
    <>
      <div className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
        <div className="mb-2 h-4 w-24 animate-pulse rounded bg-neutral-100 dark:bg-neutral-900" />
        <div className="h-32 animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-900" />
      </div>
      <div className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
        <div className="mb-3 h-4 w-16 animate-pulse rounded bg-neutral-100 dark:bg-neutral-900" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-2 w-full animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-900" />
          ))}
        </div>
      </div>
    </>
  )
}
