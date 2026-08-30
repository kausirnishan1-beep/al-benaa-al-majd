import { Link } from 'react-router-dom'

export default function Button({ to, href, onClick, children, variant = 'primary', className = '' }) {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  const classes = `${base} inline-block ${className}`

  if (to) return <Link to={to} className={classes}>{children}</Link>
  if (href) return <a href={href} className={classes}>{children}</a>
  return <button onClick={onClick} className={classes}>{children}</button>
}
