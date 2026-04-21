import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from './firebase'

const googleProvider = new GoogleAuthProvider()

export async function signInWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider)
}

export async function registerWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export async function sendPasswordReset(email) {
  return sendPasswordResetEmail(auth, email)
}

export async function signOutUser() {
  return signOut(auth)
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback)
}
