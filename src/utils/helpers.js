export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function truncate(text, length = 100) {
  if (!text) return ''
  return text.length > length ? `${text.slice(0, length)}...` : text
}
