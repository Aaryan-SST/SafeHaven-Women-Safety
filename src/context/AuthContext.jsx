import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthChange, signInWithEmail, signInWithGoogle, registerWithEmail, signOutUser } from '../services/authService'
import { createUserDocument, getUserDocument, updateUserDocument } from '../services/userService'
import { getRoleHomePath } from '../utils/roleGuards'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      setCurrentUser(user)
      if (user) {
        const profile = await getUserDocument(user.uid)
        setUserProfile(profile)
        setUserRole(profile?.role || null)
      } else {
        setUserProfile(null)
        setUserRole(null)
      }
      setAuthLoading(false)
    })
    return unsubscribe
  }, [])

  async function login(email, password) {
    setAuthError(null)
    const cred = await signInWithEmail(email, password)
    return cred
  }

  async function loginWithGoogle(role = 'citizen', extraData = {}) {
    setAuthError(null)
    const cred = await signInWithGoogle()
    const existing = await getUserDocument(cred.user.uid)
    if (!existing) {
      await createUserDocument(cred.user.uid, {
        email: cred.user.email,
        displayName: cred.user.displayName,
        photoURL: cred.user.photoURL,
        role,
        isApproved: role === 'citizen',
        ...extraData,
      })
    }
    return cred
  }

  async function register(email, password, role, extraData = {}) {
    setAuthError(null)
    const cred = await registerWithEmail(email, password)
    await createUserDocument(cred.user.uid, {
      email,
      displayName: extraData.displayName || '',
      photoURL: null,
      role,
      isApproved: role === 'citizen',
      phone: extraData.phone || null,
      state: extraData.state || null,
      city: extraData.city || null,
      organizationName: extraData.organizationName || null,
    })
    return cred
  }

  async function logout() {
    await signOutUser()
    setCurrentUser(null)
    setUserProfile(null)
    setUserRole(null)
  }

  async function updateProfile(data) {
    if (!currentUser) return
    await updateUserDocument(currentUser.uid, data)
    setUserProfile((prev) => ({ ...prev, ...data }))
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        userRole,
        authLoading,
        authError,
        login,
        loginWithGoogle,
        register,
        logout,
        updateProfile,
        getRoleHome: () => getRoleHomePath(userRole),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider')
  return ctx
}
