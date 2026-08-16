export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-orchid-300 border-t-ink-700" />
      <p className="text-sm font-medium text-ink-700/70 animate-pulse-soft">{label}</p>
    </div>
  )
}
