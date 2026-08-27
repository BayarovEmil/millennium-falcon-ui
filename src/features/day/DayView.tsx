import { useParams } from 'react-router-dom'

export function DayView() {
  const { date } = useParams<{ date: string }>()

  return (
    <div className="p-4">
      <p className="text-sm text-neutral-400 dark:text-neutral-500">Day view for {date} — built in Phase 3.</p>
    </div>
  )
}
