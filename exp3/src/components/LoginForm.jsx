import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import Button from './Button'

const ROLE_ROUTES = {
  admin: '/admin',
  collaborator: '/collaborator',
  user: '/user'
}

export default function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues: { email: '', password: '', role: 'admin', remember: true } })

  function onSubmit(values) {
    const result = login(values)
    if (!result.success) {
      toast.error(result.message)
      return
    }
    toast.success(`Welcome back, ${result.user.name.split(' ')[0]}!`)
    navigate(ROLE_ROUTES[result.user.role])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink-800">Email</label>
        <div className="relative">
          <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/40" size={17} />
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="you@postorganizer.com"
            className="input-field pl-11"
          />
        </div>
        {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink-800">Password</label>
        <div className="relative">
          <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/40" size={17} />
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password is required' })}
            placeholder="••••••••"
            className="input-field pl-11 pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-700/40 hover:text-ink-700"
          >
            {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink-800">Login as</label>
        <select {...register('role')} className="input-field">
          <option value="admin">Admin</option>
          <option value="collaborator">Collaborator</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-ink-700/70">
          <input type="checkbox" {...register('remember')} className="h-4 w-4 rounded accent-orchid-600" />
          Remember me
        </label>
        <button
          type="button"
          onClick={() => toast.info('Password reset is not part of this demo.')}
          className="font-medium text-orchid-700 hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Signing in...' : 'Login'}
      </Button>
    </form>
  )
}
