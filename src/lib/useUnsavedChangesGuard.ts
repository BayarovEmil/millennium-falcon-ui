import { useEffect } from 'react'
import { useBlocker } from 'react-router-dom'

/** Warns before leaving the page (hard navigation) or switching routes (in-app) while a note has unsaved edits. */
export function useUnsavedChangesGuard(hasUnsavedChanges: boolean): void {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname,
  )

  useEffect(() => {
    if (blocker.state !== 'blocked') {
      return
    }
    if (window.confirm('You have unsaved changes. Leave anyway?')) {
      blocker.proceed()
    } else {
      blocker.reset()
    }
  }, [blocker])

  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (hasUnsavedChanges) {
        event.preventDefault()
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])
}
