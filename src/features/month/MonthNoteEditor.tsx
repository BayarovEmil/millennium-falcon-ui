import { useEffect, useRef, useState, type ChangeEvent } from 'react'

import { useUnsavedChangesGuard } from '../../lib/useUnsavedChangesGuard'
import { useUpdateMonthNoteMutation } from '../periods/useUpdateMonthNoteMutation'

const AUTOSAVE_DELAY_MS = 2000

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

interface MonthNoteEditorProps {
  month: string
  periodId: number
  note: string
}

export function MonthNoteEditor({ month, periodId, note }: MonthNoteEditorProps) {
  const [draft, setDraft] = useState(note)
  const [savedNote, setSavedNote] = useState(note)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [showPreview, setShowPreview] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const mutation = useUpdateMonthNoteMutation(month)

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  const hasUnsavedChanges = draft !== savedNote
  useUnsavedChangesGuard(hasUnsavedChanges)

  function save(value: string) {
    if (value === savedNote) {
      return
    }
    setSaveStatus('saving')
    mutation.mutate(
      { periodId, note: value },
      {
        onSuccess: () => {
          setSavedNote(value)
          setSaveStatus('saved')
        },
        onError: () => setSaveStatus('error'),
      },
    )
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value
    setDraft(value)
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => save(value), AUTOSAVE_DELAY_MS)
  }

  function handleBlur() {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    save(draft)
  }

  return (
    <section className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Month note</h2>
        <div className="flex items-center gap-2">
          <SaveIndicator status={saveStatus} />
          <button
            type="button"
            onClick={() => setShowPreview((p) => !p)}
            className="text-xs text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
          >
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      {showPreview ? (
        <div className="min-h-32 whitespace-pre-wrap text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {draft || <span className="text-neutral-400 dark:text-neutral-500">Nothing written yet.</span>}
        </div>
      ) : (
        <textarea
          value={draft}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={8}
          placeholder="What do you want to be true this month?"
          className="w-full resize-none rounded-md bg-transparent text-sm leading-relaxed text-neutral-800 outline-none placeholder:text-neutral-400 dark:text-neutral-200 dark:placeholder:text-neutral-500"
        />
      )}
    </section>
  )
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === 'idle') {
    return null
  }
  const label: Record<Exclude<SaveStatus, 'idle'>, string> = {
    saving: 'Saving…',
    saved: 'Saved',
    error: 'Failed to save',
  }
  return (
    <span className={`text-xs ${status === 'error' ? 'text-red-500' : 'text-neutral-400 dark:text-neutral-500'}`}>
      {label[status]}
    </span>
  )
}
