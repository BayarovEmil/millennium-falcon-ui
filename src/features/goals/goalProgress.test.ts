import { describe, expect, it } from 'vitest'

import type { GoalDto, LifeAreaDto } from '../../api/types'
import { groupGoalsByLifeArea, milestoneProgress } from './goalProgress'

function lifeArea(overrides: Partial<LifeAreaDto>): LifeAreaDto {
  return { id: 1, name: 'Health', color: '#ff0000', sortOrder: 0, ...overrides }
}

function goal(overrides: Partial<GoalDto>): GoalDto {
  return {
    id: 1,
    title: 'Goal',
    type: 'MILESTONE',
    status: 'ACTIVE',
    lifeArea: lifeArea({}),
    periodId: 1,
    ...overrides,
  }
}

describe('milestoneProgress', () => {
  it('clamps to 1 when currentCount exceeds targetCount', () => {
    expect(milestoneProgress(goal({ targetCount: 4, currentCount: 6 }))).toBe(1)
  })

  it('returns 0 when there is no target', () => {
    expect(milestoneProgress(goal({ targetCount: undefined }))).toBe(0)
  })

  it('treats a missing currentCount as 0', () => {
    expect(milestoneProgress(goal({ targetCount: 4, currentCount: undefined }))).toBe(0)
  })
})

describe('groupGoalsByLifeArea', () => {
  it('groups goals under their life area and sorts groups by name', () => {
    const health = lifeArea({ id: 1, name: 'Health' })
    const english = lifeArea({ id: 2, name: 'English' })

    const groups = groupGoalsByLifeArea([
      goal({ id: 1, lifeArea: health }),
      goal({ id: 2, lifeArea: english }),
      goal({ id: 3, lifeArea: health }),
    ])

    expect(groups.map((g) => g.name)).toEqual(['English', 'Health'])
    expect(groups.find((g) => g.name === 'Health')?.goals).toHaveLength(2)
  })
})
