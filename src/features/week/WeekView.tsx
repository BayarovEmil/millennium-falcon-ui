import { useParams } from 'react-router-dom'

export function WeekView() {
  const { date } = useParams<{ date: string }>()

  return (
    <div className="p-4">
      <p className="text-sm text-neutral-400 dark:text-neutral-500">Week view for {date} — built in Phase 4.</p>
    </div>
  )
}
