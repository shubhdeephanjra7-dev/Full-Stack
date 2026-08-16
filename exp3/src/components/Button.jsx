const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger'
}

export default function Button({ variant = 'primary', icon: Icon, children, className = '', ...rest }) {
  return (
    <button className={`${VARIANTS[variant]} ${className}`} {...rest}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  )
}
