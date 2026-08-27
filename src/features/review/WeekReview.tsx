import { useParams } from 'react-router-dom'

export function WeekReview() {
  const { date } = useParams<{ date: string }>()

  return (
    <div className="p-4">
      <p className="text-sm text-neutral-400 dark:text-neutral-500">Week review for {date} — built in Phase 5.</p>
    </div>
  )
}
