import { FiSearch } from 'react-icons/fi'

export default function SearchBar({ value, onChange, placeholder = 'Search posts...' }) {
  return (
    <div className="relative w-full">
      <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/40" size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-11"
      />
    </div>
  )
}
