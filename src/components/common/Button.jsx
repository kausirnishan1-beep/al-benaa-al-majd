import React from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

export default function Button({
  to,
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'start',
  className = '',
  type = 'button',
  target,
  rel,
  ariaLabel,
  ...props
}) {
  // Base button styling with focus ring and transition
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]'

  // Variants
  const variantStyles = {
    primary: 'bg-benaa text-white hover:bg-benaa-light focus:ring-benaa shadow-sm hover:shadow-md hover:-translate-y-0.5',
    secondary: 'bg-majd text-white hover:bg-majd-light focus:ring-majd shadow-sm hover:shadow-md hover:-translate-y-0.5',
    benaaGreen: 'bg-[#0f4c3a] text-white hover:bg-[#1a6b52] focus:ring-[#0f4c3a] shadow-sm hover:shadow-md hover:-translate-y-0.5',
    majdGold: 'bg-[#b8860b] text-white hover:bg-[#d4a017] focus:ring-[#b8860b] shadow-sm hover:shadow-md hover:-translate-y-0.5',
    outline: 'border-2 border-gray-300 text-gray-700 bg-transparent hover:border-benaa hover:text-benaa focus:ring-benaa',
    outlineWhite: 'border-2 border-white/80 text-white bg-transparent hover:bg-white hover:text-gray-900 focus:ring-white',
    outlineBenaa: 'border-2 border-benaa text-benaa bg-transparent hover:bg-benaa hover:text-white focus:ring-benaa',
    outlineMajd: 'border-2 border-majd text-majd bg-transparent hover:bg-majd hover:text-white focus:ring-majd',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-300',
    white: 'bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-200 shadow-md hover:shadow-lg hover:-translate-y-0.5',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md',
  }

  // Sizes
  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
    xl: 'text-lg px-8 py-4 gap-3',
    icon: 'p-2.5',
  }

  const selectedVariant = variantStyles[variant] || variantStyles.primary
  const selectedSize = sizeStyles[size] || sizeStyles.md
  const fullClasses = `${baseStyles} ${selectedVariant} ${selectedSize} ${className}`

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {!isLoading && Icon && iconPosition === 'start' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'end' && <Icon className="w-4 h-4 shrink-0" />}
    </>
  )

  if (to && !disabled && !isLoading) {
    return (
      <Link to={to} className={fullClasses} aria-label={ariaLabel} {...props}>
        {content}
      </Link>
    )
  }

  if (href && !disabled && !isLoading) {
    return (
      <a
        href={href}
        className={fullClasses}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        aria-label={ariaLabel}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={fullClasses}
      aria-label={ariaLabel}
      {...props}
    >
      {content}
    </button>
  )
}
