import { format } from 'date-fns'
import { NavLink } from 'react-router-dom'

import { parseMonthParam } from '../lib/dates'
import { useActivePeriod } from '../lib/useActivePeriod'
import { ThemeToggle } from './ThemeToggle'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
  }`

export function Header() {
  const period = useActivePeriod()
  const monthLabel = format(parseMonthParam(period.month), 'MMMM yyyy')

  return (
    <header className="flex items-center justify-between gap-4 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Planner</span>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">{monthLabel}</span>
      </div>

      <nav className="flex items-center gap-1" aria-label="Views">
        <NavLink to={`/month/${period.month}`} className={navLinkClass}>
          Month
        </NavLink>
        <NavLink to={`/week/${period.week}`} className={navLinkClass}>
          Week
        </NavLink>
        <NavLink to={`/day/${period.day}`} className={navLinkClass}>
          Day
        </NavLink>
        <NavLink to={`/review/week/${period.week}`} className={navLinkClass}>
          Review
        </NavLink>
      </nav>

      <ThemeToggle />
    </header>
  )
}
