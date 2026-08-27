import type { TaskDto } from '../../api/types'

export interface DayTaskSummary {
  completedLifeAreaIds: number[]
  remainingCount: number
}

/** Groups a flat task list (e.g. from the from/to range query) by their day, for the calendar cells. */
export function summarizeTasksByDate(tasks: TaskDto[]): Map<string, DayTaskSummary> {
  const byDate = new Map<string, DayTaskSummary>()

  for (const task of tasks) {
    const summary = byDate.get(task.periodDate) ?? { completedLifeAreaIds: [], remainingCount: 0 }
    if (task.done) {
      if (task.lifeAreaId !== undefined) {
        summary.completedLifeAreaIds.push(task.lifeAreaId)
      }
    } else {
      summary.remainingCount += 1
    }
    byDate.set(task.periodDate, summary)
  }

  return byDate
}
