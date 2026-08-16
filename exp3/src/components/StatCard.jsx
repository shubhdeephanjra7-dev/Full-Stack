import { motion } from 'framer-motion'

export default function StatCard({ label, value, icon: Icon, accent = 'from-indigoDeep to-orchid-600' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass flex items-center gap-4 rounded-3xl p-5"
    >
      <div className={`rounded-2xl bg-gradient-to-br ${accent} p-3 text-white shadow-glow`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-bold text-ink-800">{value}</p>
        <p className="text-xs font-medium text-ink-700/60">{label}</p>
      </div>
    </motion.div>
  )
}
