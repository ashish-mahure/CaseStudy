import { useEffect, useState } from 'react'
import { usePermission } from '../../auth/usePermission'

interface DocumentViewerProps {
  documentName?: string
}

export function DocumentViewer({ documentName = 'Claim packet - 2025-07' }: DocumentViewerProps) {
  const [progress, setProgress] = useState(0)
  const [isStreaming, setIsStreaming] = useState(true)

  useEffect(() => {
    if (!isStreaming) return

    const intervalId = window.setInterval(() => {
      setProgress((current) => (current >= 100 ? 100 : current + 8))
    }, 180)

    return () => window.clearInterval(intervalId)
  }, [isStreaming])

  useEffect(() => {
    if (progress >= 100) {
      setIsStreaming(false)
    }
  }, [progress])

  const canReadDocuments = usePermission({ resource: 'documents', action: 'read' })
  const canWriteDocuments = usePermission({ resource: 'documents', action: 'write' })

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Document workspace</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{documentName}</h2>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <span>{canReadDocuments ? 'Access granted' : 'Access denied'}</span>
          <span className="font-medium text-slate-900">Document write: {canWriteDocuments ? 'enabled' : 'disabled'}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Streaming preview</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-200" aria-hidden="true">
            <div className="h-2 rounded-full bg-slate-900 transition-all" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm leading-6 text-slate-700">
            <p className="font-medium text-slate-900">Chunked document view</p>
            <p className="mt-2">
              This panel simulates a large document being streamed and progressively rendered in chunks without blocking the interaction layer.
            </p>
            <button
              type="button"
              disabled={!canWriteDocuments}
              className="mt-4 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:text-slate-400"
            >
              Annotate document
            </button>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Operational safeguards</p>
          <ul className="mt-3 space-y-2">
            <li>• RBAC enforced before document access</li>
            <li>• Worker-friendly chunk loading approach</li>
            <li>• Streaming reduces initial memory pressure</li>
            <li>• Virtualized rows remain responsive</li>
          </ul>
        </aside>
      </div>
    </section>
  )
}
