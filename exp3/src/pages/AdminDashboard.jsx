import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiFileText, FiCheckCircle, FiClock, FiPlusCircle, FiGrid, FiHome, FiUsers } from 'react-icons/fi'
import DashboardLayout from '../components/DashboardLayout'
import GlassCard from '../components/GlassCard'
import StatCard from '../components/StatCard'
import PostCard from '../components/PostCard'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../context/PostContext'

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: FiHome, end: true },
  { to: '/admin/create', label: 'Create Post', icon: FiPlusCircle },
  { to: '/admin/posts', label: 'Manage Posts', icon: FiGrid }
]

export default function AdminDashboard() {
  const { currentUser, getCollaboratorsForAdmin } = useAuth()
  const { posts } = usePosts()
  const navigate = useNavigate()

  const myPosts = posts.filter((p) => p.createdBy === currentUser.id)
  const published = myPosts.filter((p) => p.status === 'published')
  const recent = [...myPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
  const collaborators = getCollaboratorsForAdmin(currentUser.id)

  return (
    <DashboardLayout links={LINKS}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink-800">Welcome back, {currentUser.name.split(' ')[0]} 👋</h1>
            <p className="mt-1 text-sm text-ink-700/60">
              You're managing {collaborators.length} collaborator{collaborators.length !== 1 ? 's' : ''} and {myPosts.length} post{myPosts.length !== 1 ? 's' : ''}.
            </p>
          </div>
          <Button icon={FiPlusCircle} onClick={() => navigate('/admin/create')}>
            Create Post
          </Button>
        </GlassCard>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Posts" value={myPosts.length} icon={FiFileText} />
        <StatCard label="Published Posts" value={published.length} icon={FiCheckCircle} accent="from-emerald-500 to-teal-600" />
        <StatCard label="Collaborators" value={collaborators.length} icon={FiUsers} accent="from-fuchsia-500 to-pink-600" />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink-800 flex items-center gap-2">
          <FiClock className="text-orchid-600" /> Recent Posts
        </h2>
        <button onClick={() => navigate('/admin/posts')} className="text-sm font-semibold text-orchid-700 hover:underline">
          View all
        </button>
      </div>

      <div className="mt-4">
        {recent.length === 0 ? (
          <EmptyState
            title="You haven't published anything yet"
            subtitle="Create your first post to see it appear here."
            action={
              <Button className="mt-2" icon={FiPlusCircle} onClick={() => navigate('/admin/create')}>
                Create Post
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
