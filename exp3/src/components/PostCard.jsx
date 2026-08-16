import { motion } from 'framer-motion'
import { FiCalendar, FiEdit2, FiTrash2, FiUser } from 'react-icons/fi'
import { formatDate } from '../utils/helpers'

export default function PostCard({ post, onEdit, onDelete, canManage = false }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="glass group overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-glow"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <span className="badge absolute left-3 top-3">{post.category}</span>
        {post.status === 'draft' && (
          <span className="absolute right-3 top-3 rounded-full bg-ink-900/70 px-3 py-1 text-xs font-semibold text-white">
            Draft
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="line-clamp-1 text-base font-bold text-ink-800">{post.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-700/70">{post.description}</p>

        <div className="mt-4 flex items-center justify-between text-xs text-ink-700/60">
          <span className="flex items-center gap-1.5">
            <FiUser size={13} /> {post.createdByName}
          </span>
          <span className="flex items-center gap-1.5">
            <FiCalendar size={13} /> {formatDate(post.date)}
          </span>
        </div>

        {canManage && (
          <div className="mt-4 flex gap-2 border-t border-white/50 pt-4">
            <button
              onClick={() => onEdit?.(post)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/60 px-3 py-2 text-xs font-semibold text-ink-800 hover:bg-white/90 transition-colors"
            >
              <FiEdit2 size={13} /> Edit
            </button>
            <button
              onClick={() => onDelete?.(post)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-500/20 transition-colors"
            >
              <FiTrash2 size={13} /> Delete
            </button>
          </div>
        )}
      </div>
    </motion.article>
  )
}
