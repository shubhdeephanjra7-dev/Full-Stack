export default function CategoryFilter({ categories, active, onChange }) {
  const all = ['All', ...categories]
  return (
    <div className="flex flex-wrap gap-2">
      {all.map((cat) => {
        const isActive = active === cat
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-indigoDeep to-orchid-600 text-white shadow-glow'
                : 'bg-white/50 text-ink-700/70 hover:bg-white/80'
            }`}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
