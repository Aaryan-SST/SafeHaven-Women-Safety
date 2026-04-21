export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePhone(phone) {
  const digits = phone.replace(/[^\d]/g, '')
  return digits.length === 10 || digits.length === 12
}

export function validatePassword(password) {
  if (password.length < 8) return 'Password must be at least 8 characters'
  return null
}

export function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`
  }
  return null
}
