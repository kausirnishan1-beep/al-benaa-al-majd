import React from 'react'

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon: Icon,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors'

  const variantStyles = {
    default: 'bg-gray-100 text-gray-700 border border-gray-200',
    benaa: 'bg-[#0f4c3a]/10 text-[#0f4c3a] border border-[#0f4c3a]/20',
    majd: 'bg-[#b8860b]/10 text-[#8b6508] border border-[#b8860b]/20',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    white: 'bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-200/50 shadow-sm',
    dark: 'bg-gray-900 text-white border border-gray-800',
  }

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-xs sm:text-sm px-3 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  }

  const dotColorStyles = {
    default: 'bg-gray-400',
    benaa: 'bg-[#0f4c3a]',
    majd: 'bg-[#b8860b]',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    white: 'bg-emerald-500',
    dark: 'bg-emerald-400',
  }

  const selectedVariant = variantStyles[variant] || variantStyles.default
  const selectedSize = sizeStyles[size] || sizeStyles.md
  const selectedDotColor = dotColorStyles[variant] || dotColorStyles.default

  return (
    <span className={`${baseStyles} ${selectedVariant} ${selectedSize} ${className}`} {...props}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${selectedDotColor}`} />}
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  )
}
