import { describe, expect, it } from 'vitest'

import type { TaskDto } from '../../api/types'
import { summarizeTasksByDate } from './dayTaskSummary'

function task(overrides: Partial<TaskDto>): TaskDto {
  return {
    id: 1,
    title: 'Task',
    periodId: 1,
    periodDate: '2026-08-14',
    done: false,
    sortOrder: 0,
    ...overrides,
  }
}

describe('summarizeTasksByDate', () => {
  it('collects completed life-area ids and counts remaining tasks per day', () => {
    const tasks = [
      task({ id: 1, periodDate: '2026-08-14', done: true, lifeAreaId: 1 }),
      task({ id: 2, periodDate: '2026-08-14', done: true, lifeAreaId: 2 }),
      task({ id: 3, periodDate: '2026-08-14', done: false }),
      task({ id: 4, periodDate: '2026-08-15', done: false }),
    ]

    const byDate = summarizeTasksByDate(tasks)

    expect(byDate.get('2026-08-14')).toEqual({ completedLifeAreaIds: [1, 2], remainingCount: 1 })
    expect(byDate.get('2026-08-15')).toEqual({ completedLifeAreaIds: [], remainingCount: 1 })
    expect(byDate.has('2026-08-16')).toBe(false)
  })

  it('ignores completed tasks with no life area for the dot list', () => {
    const byDate = summarizeTasksByDate([task({ periodDate: '2026-08-14', done: true })])

    expect(byDate.get('2026-08-14')).toEqual({ completedLifeAreaIds: [], remainingCount: 0 })
  })
})
