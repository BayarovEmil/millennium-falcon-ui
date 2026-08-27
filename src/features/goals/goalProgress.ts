import type { GoalDto } from '../../api/types'

export interface LifeAreaGoalGroup {
  lifeAreaId: number
  name: string
  color: string
  goals: GoalDto[]
}

/** Milestone completion fraction, clamped to [0, 1]. 0 when there's no target to measure against. */
export function milestoneProgress(goal: GoalDto): number {
  if (!goal.targetCount || goal.targetCount <= 0) {
    return 0
  }
  return Math.min(1, (goal.currentCount ?? 0) / goal.targetCount)
}

export function groupGoalsByLifeArea(goals: GoalDto[]): LifeAreaGoalGroup[] {
  const groups = new Map<number, LifeAreaGoalGroup>()

  for (const goal of goals) {
    const existing = groups.get(goal.lifeArea.id)
    if (existing) {
      existing.goals.push(goal)
    } else {
      groups.set(goal.lifeArea.id, {
        lifeAreaId: goal.lifeArea.id,
        name: goal.lifeArea.name,
        color: goal.lifeArea.color,
        goals: [goal],
      })
    }
  }

  return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name))
}
