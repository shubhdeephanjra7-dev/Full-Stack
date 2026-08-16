import { FiInbox } from 'react-icons/fi'

export default function EmptyState({ title = 'Nothing here yet', subtitle = '', icon: Icon = FiInbox, action = null }) {
  return (
    <div className="glass flex flex-col items-center justify-center gap-3 rounded-3xl px-8 py-16 text-center">
      <div className="rounded-2xl bg-white/60 p-4 text-orchid-600">
        <Icon size={32} />
      </div>
      <h3 className="text-lg font-semibold text-ink-800">{title}</h3>
      {subtitle && <p className="max-w-sm text-sm text-ink-700/60">{subtitle}</p>}
      {action}
    </div>
  )
}
