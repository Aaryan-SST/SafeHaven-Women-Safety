import { USER_ROLES } from './constants'

export function getRoleHomePath(role) {
  switch (role) {
    case USER_ROLES.ADMIN: return '/admin/dashboard'
    case USER_ROLES.NGO: return '/ngo/dashboard'
    case USER_ROLES.CITIZEN: return '/dashboard'
    default: return '/'
  }
}

export function canAccessRoute(userRole, requiredRole) {
  if (!userRole) return false
  if (requiredRole === USER_ROLES.ADMIN) return userRole === USER_ROLES.ADMIN
  if (requiredRole === USER_ROLES.NGO) return userRole === USER_ROLES.NGO
  if (requiredRole === USER_ROLES.CITIZEN) return userRole === USER_ROLES.CITIZEN
  return false
}
