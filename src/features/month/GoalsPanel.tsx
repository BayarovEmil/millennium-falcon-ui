import type { GoalDto } from '../../api/types'
import { groupGoalsByLifeArea, milestoneProgress } from '../goals/goalProgress'
import { AddGoalForm } from './AddGoalForm'

interface GoalsPanelProps {
  month: string
  periodId: number
  goals: GoalDto[]
}

export function GoalsPanel({ month, periodId, goals }: GoalsPanelProps) {
  const groups = groupGoalsByLifeArea(goals)

  return (
    <section className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Goals</h2>
        <AddGoalForm month={month} periodId={periodId} />
      </div>

      {groups.length === 0 ? (
        <p className="text-xs text-neutral-400 dark:text-neutral-500">No goals yet this month.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {groups.map((group) => (
            <div key={group.lifeAreaId}>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                <span className="size-2 rounded-full" style={{ backgroundColor: group.color }} />
                {group.name}
              </p>
              <div className="flex flex-col gap-2">
                {group.goals.map((goal) => (
                  <GoalRow key={goal.id} goal={goal} color={group.color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function GoalRow({ goal, color }: { goal: GoalDto; color: string }) {
  if (goal.type === 'MILESTONE') {
    const progress = milestoneProgress(goal)
    return (
      <div>
        <div className="mb-0.5 flex items-center justify-between text-xs">
          <span className="text-neutral-700 dark:text-neutral-300">{goal.title}</span>
          <span className="text-neutral-400 dark:text-neutral-500">
            {goal.currentCount ?? 0}/{goal.targetCount ?? '—'}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-900">
          <div
            className="h-1.5 rounded-full transition-all"
            style={{ width: `${progress * 100}%`, backgroundColor: color }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-neutral-700 dark:text-neutral-300">{goal.title}</span>
      <span className="text-neutral-400 dark:text-neutral-500">
        {goal.targetPerWeek ? `${goal.targetPerWeek}×/week` : 'no cadence set'}
      </span>
    </div>
  )
}
