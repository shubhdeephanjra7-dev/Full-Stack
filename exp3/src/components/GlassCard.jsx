import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = false, as = 'div', ...rest }) {
  const Component = motion[as] || motion.div
  return (
    <Component
      className={`glass rounded-3xl ${hover ? 'transition-transform duration-300 hover:-translate-y-1' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  )
}
