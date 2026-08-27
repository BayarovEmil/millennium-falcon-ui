import { Navigate, createBrowserRouter } from 'react-router-dom'

import { DayView } from '../features/day/DayView'
import { MonthView } from '../features/month/MonthView'
import { MonthReview } from '../features/review/MonthReview'
import { WeekReview } from '../features/review/WeekReview'
import { WeekView } from '../features/week/WeekView'
import { currentMonthParam } from '../lib/dates'
import { App } from './App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to={`/month/${currentMonthParam()}`} replace /> },
      { path: 'month/:month', element: <MonthView /> },
      { path: 'week/:date', element: <WeekView /> },
      { path: 'day/:date', element: <DayView /> },
      { path: 'review/week/:date', element: <WeekReview /> },
      { path: 'review/month/:month', element: <MonthReview /> },
    ],
  },
])
