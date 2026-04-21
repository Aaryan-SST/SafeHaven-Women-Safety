import { format, formatDistanceToNow, isValid } from 'date-fns'

export function formatDate(timestamp) {
  if (!timestamp) return ''
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp)
  if (!isValid(date)) return ''
  return format(date, 'dd MMM yyyy')
}

export function formatDateTime(timestamp) {
  if (!timestamp) return ''
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp)
  if (!isValid(date)) return ''
  return format(date, 'dd MMM yyyy, h:mm a')
}

export function formatRelative(timestamp) {
  if (!timestamp) return ''
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp)
  if (!isValid(date)) return ''
  return formatDistanceToNow(date, { addSuffix: true })
}

export function formatTime(timestamp) {
  if (!timestamp) return ''
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp)
  if (!isValid(date)) return ''
  return format(date, 'h:mm a')
}
