import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiHome, FiUploadCloud } from 'react-icons/fi'
import DashboardLayout from '../components/DashboardLayout'
import GlassCard from '../components/GlassCard'
import UploadForm from '../components/UploadForm'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../context/PostContext'

const LINKS = [
  { to: '/collaborator', label: 'Dashboard', icon: FiHome, end: true },
  { to: '/collaborator/upload', label: 'Upload Post', icon: FiUploadCloud }
]

export default function CollaboratorUpload() {
  const { currentUser, getAdminById } = useAuth()
  const { createPost } = usePosts()
  const navigate = useNavigate()
  const admin = getAdminById(currentUser.adminId)

  function handleSubmit(values) {
    createPost({
      title: values.title,
      description: values.description,
      category: values.category,
      image: values.image,
      status: 'published',
      createdBy: currentUser.id,
      createdByName: currentUser.name,
      adminId: currentUser.adminId
    })
    toast.success(`Uploaded to ${admin?.name}'s workspace.`)
    navigate('/collaborator')
  }

  return (
    <DashboardLayout links={LINKS}>
      <GlassCard className="mx-auto max-w-2xl p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold text-ink-800">Upload a Post</h1>
        <p className="mt-1 text-sm text-ink-700/60">
          This will be added to <span className="font-semibold text-ink-800">{admin?.name}</span>'s workspace. You won't be able to edit or delete it once uploaded.
        </p>

        <div className="mt-6">
          <UploadForm submitLabel="Upload Post" onSubmit={handleSubmit} onCancel={() => navigate('/collaborator')} />
        </div>
      </GlassCard>
    </DashboardLayout>
  )
}
