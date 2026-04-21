import { coordsToGoogleMapsLink } from './geoHelpers'

export function buildWhatsAppLinks(contacts, alertMessage, coords) {
  const locationPart = coords
    ? ` ${coordsToGoogleMapsLink(coords.latitude, coords.longitude)}`
    : ' (location unavailable)'

  const fullMessage = `${alertMessage}${locationPart}`
  const encoded = encodeURIComponent(fullMessage)

  return contacts.map((contact) => ({
    name: contact.name,
    phone: contact.phone,
    url: `https://wa.me/${sanitizePhone(contact.phone)}?text=${encoded}`,
  }))
}

export function buildTestWhatsAppLinks(contacts, alertMessage) {
  const testMessage = `[TEST ALERT - Please ignore] ${alertMessage} (location unavailable)`
  const encoded = encodeURIComponent(testMessage)
  return contacts.map((contact) => ({
    name: contact.name,
    phone: contact.phone,
    url: `https://wa.me/${sanitizePhone(contact.phone)}?text=${encoded}`,
  }))
}

function sanitizePhone(phone) {
  // Strip everything except digits and leading +
  const digits = phone.replace(/[^\d]/g, '')
  // If doesn't start with country code, assume India (+91)
  if (digits.startsWith('91') && digits.length === 12) return digits
  if (digits.length === 10) return `91${digits}`
  return digits
}
