import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiHome, FiUploadCloud, FiFileText, FiClock } from 'react-icons/fi'
import DashboardLayout from '../components/DashboardLayout'
import GlassCard from '../components/GlassCard'
import StatCard from '../components/StatCard'
import PostCard from '../components/PostCard'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../context/PostContext'

const LINKS = [
  { to: '/collaborator', label: 'Dashboard', icon: FiHome, end: true },
  { to: '/collaborator/upload', label: 'Upload Post', icon: FiUploadCloud }
]

export default function CollaboratorDashboard() {
  const { currentUser, getAdminById } = useAuth()
  const { posts } = usePosts()
  const navigate = useNavigate()

  const admin = getAdminById(currentUser.adminId)
  const workspacePosts = posts.filter((p) => p.adminId === currentUser.adminId)
  const myUploads = workspacePosts.filter((p) => p.createdBy === currentUser.id)
  const recent = [...workspacePosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

  return (
    <DashboardLayout links={LINKS}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink-800">Welcome, {currentUser.name.split(' ')[0]} 👋</h1>
            <p className="mt-1 text-sm text-ink-700/60">
              You're working inside <span className="font-semibold text-ink-800">{admin?.name}</span>'s workspace.
            </p>
          </div>
          <Button icon={FiUploadCloud} onClick={() => navigate('/collaborator/upload')}>
            Upload Post
          </Button>
        </GlassCard>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard label="Workspace Posts" value={workspacePosts.length} icon={FiFileText} />
        <StatCard label="Your Uploads" value={myUploads.length} icon={FiUploadCloud} accent="from-fuchsia-500 to-pink-600" />
      </div>

      <div className="mt-8 flex items-center gap-2">
        <FiClock className="text-orchid-600" />
        <h2 className="font-display text-lg font-bold text-ink-800">Recent Uploads in Your Workspace</h2>
      </div>

      <div className="mt-4">
        {recent.length === 0 ? (
          <EmptyState
            title="No posts here yet"
            subtitle="Be the first to upload something to this workspace."
            action={
              <Button className="mt-2" icon={FiUploadCloud} onClick={() => navigate('/collaborator/upload')}>
                Upload Post
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
