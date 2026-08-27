import { useLocation, useParams } from 'react-router-dom'

import { currentPeriodParams, periodParamsFromDay, periodParamsFromMonth, type PeriodParams } from './period'

/**
 * Resolves the current route (month/week/day/review) to the same point in
 * time expressed in every route's param format, so the header and view
 * switcher can jump between views without losing "where you are."
 */
export function useActivePeriod(): PeriodParams {
  const { pathname } = useLocation()
  const params = useParams<{ month?: string; date?: string }>()

  if (pathname.startsWith('/month/') && params.month) {
    return periodParamsFromMonth(params.month)
  }
  if ((pathname.startsWith('/week/') || pathname.startsWith('/day/')) && params.date) {
    return periodParamsFromDay(params.date)
  }
  if (pathname.startsWith('/review/month/') && params.month) {
    return periodParamsFromMonth(params.month)
  }
  if (pathname.startsWith('/review/week/') && params.date) {
    return periodParamsFromDay(params.date)
  }
  return currentPeriodParams()
}
