import { useParams } from 'react-router-dom'

export function MonthReview() {
  const { month } = useParams<{ month: string }>()

  return (
    <div className="p-4">
      <p className="text-sm text-neutral-400 dark:text-neutral-500">Month review for {month} — built in Phase 5.</p>
    </div>
  )
}
