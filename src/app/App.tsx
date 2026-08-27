import { Outlet } from 'react-router-dom'

import { Header } from '../components/Header'
import { ToastViewport } from '../components/ToastViewport'

export function App() {
  return (
    <div className="flex min-h-svh flex-col bg-white dark:bg-neutral-950">
      <Header />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <ToastViewport />
    </div>
  )
}
