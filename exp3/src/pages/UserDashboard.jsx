import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCompass, FiHome } from 'react-icons/fi'
import DashboardLayout from '../components/DashboardLayout'
import GlassCard from '../components/GlassCard'
import PostCard from '../components/PostCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import EmptyState from '../components/EmptyState'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../context/PostContext'
import { CATEGORIES } from '../data/dummyData'

const LINKS = [
  { to: '/user', label: 'Explore Posts', icon: FiCompass, end: true }
]

export default function UserDashboard() {
  const { currentUser } = useAuth()
  const { posts } = usePosts()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const publishedPosts = useMemo(() => posts.filter((p) => p.status === 'published'), [posts])

  const filtered = publishedPosts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || p.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout links={LINKS}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className="p-6">
          <h1 className="font-display text-2xl font-bold text-ink-800">
            Explore Posts, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="mt-1 text-sm text-ink-700/60">Browse posts published by every Admin on Post Organizer.</p>

          <div className="mt-5">
            <SearchBar value={search} onChange={setSearch} placeholder="Search by title or description..." />
          </div>
          <div className="mt-4">
            <CategoryFilter categories={CATEGORIES} active={category} onChange={setCategory} />
          </div>
        </GlassCard>
      </motion.div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState title="No posts found" subtitle="Try adjusting your search or category filter." />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
