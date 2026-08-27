import { useState, type ChangeEvent, type FormEvent } from 'react'

import type { GoalType } from '../../api/types'
import { useCreateGoalMutation } from '../goals/useCreateGoalMutation'
import { useLifeAreasQuery } from '../life-areas/useLifeAreasQuery'

interface AddGoalFormProps {
  month: string
  periodId: number
}

const GOAL_TYPES: { value: GoalType; label: string }[] = [
  { value: 'MILESTONE', label: 'Milestone' },
  { value: 'HABIT', label: 'Habit' },
]

export function AddGoalForm({ month, periodId }: AddGoalFormProps) {
  const lifeAreasQuery = useLifeAreasQuery()
  const createGoal = useCreateGoalMutation(month)

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState<GoalType>('MILESTONE')
  const [lifeAreaId, setLifeAreaId] = useState<number | ''>('')
  const [targetCount, setTargetCount] = useState('')
  const [targetPerWeek, setTargetPerWeek] = useState('')

  const lifeAreas = lifeAreasQuery.data ?? []

  function reset() {
    setTitle('')
    setType('MILESTONE')
    setLifeAreaId('')
    setTargetCount('')
    setTargetPerWeek('')
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim() || lifeAreaId === '') {
      return
    }

    createGoal.mutate(
      {
        title: title.trim(),
        type,
        lifeAreaId,
        periodId,
        targetCount: type === 'MILESTONE' && targetCount ? Number(targetCount) : undefined,
        targetPerWeek: type === 'HABIT' && targetPerWeek ? Number(targetPerWeek) : undefined,
      },
      {
        onSuccess: () => {
          reset()
          setOpen(false)
        },
      },
    )
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        + Add goal
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 rounded-md border border-neutral-200 p-2 dark:border-neutral-800"
    >
      <input
        autoFocus
        value={title}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
        placeholder="Goal title"
        className="rounded border border-neutral-200 bg-transparent px-2 py-1 text-sm outline-none focus:border-neutral-400 dark:border-neutral-700 dark:focus:border-neutral-500"
      />

      <div className="flex gap-1">
        {GOAL_TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setType(t.value)}
            className={`rounded px-2 py-1 text-xs ${
              type === t.value
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <select
        value={lifeAreaId}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setLifeAreaId(event.target.value ? Number(event.target.value) : '')
        }
        className="rounded border border-neutral-200 bg-transparent px-2 py-1 text-sm dark:border-neutral-700"
      >
        <option value="">Life area…</option>
        {lifeAreas.map((lifeArea) => (
          <option key={lifeArea.id} value={lifeArea.id}>
            {lifeArea.name}
          </option>
        ))}
      </select>

      {type === 'MILESTONE' ? (
        <input
          type="number"
          min={1}
          value={targetCount}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setTargetCount(event.target.value)}
          placeholder="Target count"
          className="rounded border border-neutral-200 bg-transparent px-2 py-1 text-sm dark:border-neutral-700"
        />
      ) : (
        <input
          type="number"
          min={1}
          max={7}
          value={targetPerWeek}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setTargetPerWeek(event.target.value)}
          placeholder="Times per week"
          className="rounded border border-neutral-200 bg-transparent px-2 py-1 text-sm dark:border-neutral-700"
        />
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={createGoal.isPending}
          className="rounded bg-neutral-900 px-2 py-1 text-xs text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => {
            reset()
            setOpen(false)
          }}
          className="rounded px-2 py-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
