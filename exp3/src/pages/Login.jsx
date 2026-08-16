import { motion } from 'framer-motion'
import { HiSparkles } from 'react-icons/hi2'
import { FiLayers, FiUsers, FiZap } from 'react-icons/fi'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientBackground from '../components/GradientBackground'
import GlassCard from '../components/GlassCard'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../context/AuthContext'

const ROLE_ROUTES = { admin: '/admin', collaborator: '/collaborator', user: '/user' }

export default function Login() {
  const { currentUser, isReady } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isReady && currentUser) navigate(ROLE_ROUTES[currentUser.role], { replace: true })
  }, [isReady, currentUser, navigate])

  return (
    <GradientBackground>
      <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-4xl shadow-glass lg:grid-cols-2">
          {/* Illustration side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-dark relative hidden flex-col justify-between bg-gradient-to-br from-indigoDeep via-orchid-600 to-fuchsia-600 p-10 text-white lg:flex"
          >
            <div>
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-white/20 p-2">
                  <HiSparkles size={20} />
                </div>
                <span className="font-display text-xl font-bold">Post Organizer</span>
              </div>
              <h2 className="mt-10 font-display text-3xl font-bold leading-tight">
                Organize every post,
                <br /> across every team.
              </h2>
              <p className="mt-4 max-w-xs text-sm text-white/80">
                Admins publish, collaborators contribute, and everyone stays in sync — no backend required.
              </p>
            </div>

            <div className="space-y-4">
              <FeatureRow icon={FiLayers} text="Role-based dashboards for Admins, Collaborators & Users" />
              <FeatureRow icon={FiUsers} text="Each collaborator works inside their admin's workspace" />
              <FeatureRow icon={FiZap} text="Instant local persistence — nothing ever leaves your browser" />
            </div>

            <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          </motion.div>

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="flex h-full flex-col justify-center rounded-none p-8 sm:p-10">
              <div className="mb-6 flex items-center gap-2 lg:hidden">
                <div className="rounded-xl bg-gradient-to-br from-orchid-500 to-indigoDeep p-2 text-white">
                  <HiSparkles size={18} />
                </div>
                <span className="font-display text-lg font-bold text-ink-800">Post Organizer</span>
              </div>

              <h1 className="font-display text-2xl font-bold text-ink-800">Welcome back</h1>
              <p className="mt-1 text-sm text-ink-700/60">Sign in to manage and explore posts.</p>

              <div className="mt-6">
                <LoginForm />
              </div>

              <div className="mt-6 rounded-2xl bg-white/40 p-4 text-xs text-ink-700/60">
                <p className="font-semibold text-ink-700/80">Demo credentials</p>
                <p className="mt-1">Admin — ariana.admin@postorganizer.com / admin123</p>
                <p>Collaborator — leo.collab@postorganizer.com / collab123</p>
                <p>User — jordan.user@postorganizer.com / user123</p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </GradientBackground>
  )
}

function FeatureRow({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-white/15 p-2">
        <Icon size={16} />
      </div>
      <p className="text-sm text-white/85">{text}</p>
    </div>
  )
}
