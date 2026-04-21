import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { SOSProvider } from './context/SOSContext'

import ProtectedRoute from './components/shared/ProtectedRoute'
import RoleRoute from './components/shared/RoleRoute'
import ToastContainer from './components/shared/Toast'
import Spinner from './components/shared/Spinner'

// Public pages
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import NotFound from './pages/NotFound'

// Citizen pages (eager-loaded except heavy ones)
import CitizenDashboard from './pages/citizen/CitizenDashboard'
import SOSSetup from './pages/citizen/SOSSetup'
import LegalAid from './pages/citizen/LegalAid'
import HelplineResources from './pages/citizen/HelplineResources'

// NGO pages
import NGODashboard from './pages/ngo/NGODashboard'
import NGOReports from './pages/ngo/NGOReports'
import NGOForum from './pages/ngo/NGOForum'
import NGOEvents from './pages/ngo/NGOEvents'

// Admin pages
import AdminNGOApprovals from './pages/admin/AdminNGOApprovals'
import AdminReports from './pages/admin/AdminReports'
import AdminHelplines from './pages/admin/AdminHelplines'
import AdminArticles from './pages/admin/AdminArticles'

// Lazy loaded (heavy components)
const SafetyMap = lazy(() => import('./pages/citizen/SafetyMap'))
const Forum = lazy(() => import('./pages/citizen/Forum'))
const ForumChannel = lazy(() => import('./pages/citizen/ForumChannel'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <Spinner size="lg" className="text-rose-500" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <SOSProvider>
              <ToastContainer />
              <Routes>
                {/* Public */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Citizen Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute><RoleRoute allowedRole="citizen"><CitizenDashboard /></RoleRoute></ProtectedRoute>
                } />
                <Route path="/sos-setup" element={
                  <ProtectedRoute><RoleRoute allowedRole="citizen"><SOSSetup /></RoleRoute></ProtectedRoute>
                } />
                <Route path="/safety-map" element={
                  <ProtectedRoute><RoleRoute allowedRole="citizen">
                    <Suspense fallback={<PageLoader />}><SafetyMap /></Suspense>
                  </RoleRoute></ProtectedRoute>
                } />
                <Route path="/legal-aid" element={
                  <ProtectedRoute><RoleRoute allowedRole="citizen"><LegalAid /></RoleRoute></ProtectedRoute>
                } />
                <Route path="/forum" element={
                  <ProtectedRoute><RoleRoute allowedRole="citizen">
                    <Suspense fallback={<PageLoader />}><Forum /></Suspense>
                  </RoleRoute></ProtectedRoute>
                } />
                <Route path="/forum/:channelId" element={
                  <ProtectedRoute><RoleRoute allowedRole="citizen">
                    <Suspense fallback={<PageLoader />}><ForumChannel /></Suspense>
                  </RoleRoute></ProtectedRoute>
                } />
                <Route path="/helpline" element={
                  <ProtectedRoute><RoleRoute allowedRole="citizen"><HelplineResources /></RoleRoute></ProtectedRoute>
                } />

                {/* NGO Routes */}
                <Route path="/ngo/dashboard" element={
                  <ProtectedRoute><RoleRoute allowedRole="ngo"><NGODashboard /></RoleRoute></ProtectedRoute>
                } />
                <Route path="/ngo/reports" element={
                  <ProtectedRoute><RoleRoute allowedRole="ngo"><NGOReports /></RoleRoute></ProtectedRoute>
                } />
                <Route path="/ngo/forum" element={
                  <ProtectedRoute><RoleRoute allowedRole="ngo"><NGOForum /></RoleRoute></ProtectedRoute>
                } />
                <Route path="/ngo/events" element={
                  <ProtectedRoute><RoleRoute allowedRole="ngo"><NGOEvents /></RoleRoute></ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute><RoleRoute allowedRole="admin">
                    <Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>
                  </RoleRoute></ProtectedRoute>
                } />
                <Route path="/admin/ngo-approvals" element={
                  <ProtectedRoute><RoleRoute allowedRole="admin"><AdminNGOApprovals /></RoleRoute></ProtectedRoute>
                } />
                <Route path="/admin/reports" element={
                  <ProtectedRoute><RoleRoute allowedRole="admin"><AdminReports /></RoleRoute></ProtectedRoute>
                } />
                <Route path="/admin/helplines" element={
                  <ProtectedRoute><RoleRoute allowedRole="admin"><AdminHelplines /></RoleRoute></ProtectedRoute>
                } />
                <Route path="/admin/articles" element={
                  <ProtectedRoute><RoleRoute allowedRole="admin"><AdminArticles /></RoleRoute></ProtectedRoute>
                } />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SOSProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
