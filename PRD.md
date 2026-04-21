# SafeHaven — Product Requirements Document (PRD)

---

## 1. Executive Summary

**Product Name:** SafeHaven — Women's Safety & Support Network
**Product Type:** Web Application (PWA-ready)
**Target Market:** India
**Primary Users:** Women aged 18–45 in urban and semi-urban India
**Problem:** Women in India lack a single unified platform that combines emergency response, legal help, community support, and incident reporting into one accessible tool.
**Solution:** A community-driven safety platform with three user roles — Citizen, NGO Partner, and Admin — providing real-time emergency SOS, safety mapping, legal aid, anonymous peer support, and curated helpline resources.

---

## 2. Problem Statement

### 2.1 Background
India records over 4 lakh crimes against women annually (NCRB 2022). Despite this, women face:
- **No single emergency tool** — SOS apps exist but don't integrate legal or community support
- **Fragmented helplines** — Women don't know which number to call in which situation
- **No safe space to talk** — Stigma prevents women from seeking help openly
- **Legal illiteracy** — Most women don't know their rights under POCSO, DV Act, or IT Act
- **Underreporting** — Fear of identity exposure prevents incident reporting

### 2.2 Gap in Market
Existing apps (Nirbhaya, Himmat, bSafe) address only emergency SOS. None combine:
- Community incident mapping
- Legal aid directory
- Anonymous peer support
- NGO coordination
- Admin oversight

SafeHaven fills this gap with a single cohesive platform.

---

## 3. Goals & Success Metrics

| Goal | Metric | Target (6 months) |
|---|---|---|
| Emergency response | SOS triggers per month | 500+ |
| Community safety | Incident reports submitted | 1,000+ |
| Legal access | Consultation requests sent | 300+ |
| Community support | Forum posts per month | 2,000+ |
| NGO engagement | Active NGO partners | 50+ |
| Platform growth | Registered users | 10,000+ |

---

## 4. User Personas

### 4.1 Priya — The Citizen (Primary)
- **Age:** 23, college student in Delhi
- **Goals:** Feel safe commuting, know her rights, have someone to talk to
- **Pain Points:** Doesn't know which helpline to call, afraid to report incidents, no legal knowledge
- **Uses:** SOS setup, Safety Map, Forum, Helplines

### 4.2 Sneha — The NGO Worker
- **Age:** 31, works at a women's shelter in Mumbai
- **Goals:** Respond to incidents efficiently, counsel women anonymously, organize awareness drives
- **Pain Points:** Incident reports scattered across emails and calls, no digital workflow
- **Uses:** NGO Reports, Forum counseling, Events

### 4.3 Rajesh — The Admin
- **Age:** 40, platform administrator
- **Goals:** Keep the platform safe, approve genuine NGOs, maintain resource quality
- **Pain Points:** Manual NGO vetting, no analytics on platform usage
- **Uses:** Admin Dashboard, NGO Approvals, Report Assignment, Article management

---

## 5. Features & Requirements

### 5.1 Authentication

| ID | Requirement | Priority |
|---|---|---|
| AUTH-01 | Email/password registration and login | P0 |
| AUTH-02 | Google OAuth sign-in | P0 |
| AUTH-03 | Password reset via email | P0 |
| AUTH-04 | Role selection at registration (Citizen / NGO) | P0 |
| AUTH-05 | NGO accounts locked pending admin approval | P0 |
| AUTH-06 | Redirect to role-specific dashboard after login | P0 |
| AUTH-07 | Persistent session via Firebase Auth state | P0 |

### 5.2 Emergency SOS

| ID | Requirement | Priority |
|---|---|---|
| SOS-01 | Add up to 5 emergency contacts (name + phone) | P0 |
| SOS-02 | Custom alert message (max 200 chars) | P0 |
| SOS-03 | One-tap SOS trigger from Navbar | P0 |
| SOS-04 | Auto-attach live GPS location as Google Maps link | P0 |
| SOS-05 | Send alerts via WhatsApp deep links (wa.me) | P0 |
| SOS-06 | Test mode — sends clearly labeled test messages | P1 |
| SOS-07 | Log every SOS trigger to Firestore | P1 |
| SOS-08 | 3-step wizard for SOS setup (Contacts → Message → Test) | P1 |
| SOS-09 | Graceful fallback if GPS unavailable | P0 |

### 5.3 Community Safety Map

| ID | Requirement | Priority |
|---|---|---|
| MAP-01 | Interactive Google Maps embed | P0 |
| MAP-02 | Real-time incident pins via Firestore onSnapshot | P0 |
| MAP-03 | Color-coded pins by incident type | P1 |
| MAP-04 | Click pin to view incident details | P0 |
| MAP-05 | 4-step report modal (Location → Type → Description → Photo) | P0 |
| MAP-06 | Anonymous report option | P0 |
| MAP-07 | Photo upload to Firebase Storage | P1 |
| MAP-08 | Filter pins by incident type and status | P1 |
| MAP-09 | Manual coordinate entry if GPS unavailable | P1 |
| MAP-10 | Graceful fallback UI if Maps API key not set | P1 |

### 5.4 Legal Aid Directory

| ID | Requirement | Priority |
|---|---|---|
| LEGAL-01 | Browse verified lawyers | P0 |
| LEGAL-02 | Filter by state, case type, language, pro-bono | P0 |
| LEGAL-03 | Search by name, city, or bio | P0 |
| LEGAL-04 | Lawyer profile card with rating and specializations | P0 |
| LEGAL-05 | Consultation request modal with message + contact info | P0 |
| LEGAL-06 | Request submitted to Firestore, lawyer notified | P1 |
| LEGAL-07 | Client-side filtering with useMemo (no re-fetch) | P0 |
| LEGAL-08 | Legal disclaimer shown below directory | P1 |

### 5.5 Anonymous Community Forum

| ID | Requirement | Priority |
|---|---|---|
| FORUM-01 | 5 topic channels | P0 |
| FORUM-02 | Auto-generate alias per user per session | P0 |
| FORUM-03 | Real-time posts via onSnapshot | P0 |
| FORUM-04 | Post with optional anonymous toggle | P0 |
| FORUM-05 | Reply/comment thread per post | P0 |
| FORUM-06 | Upvote posts and comments | P1 |
| FORUM-07 | Report post for moderation | P1 |
| FORUM-08 | Verified Counselor badge for NGO users | P0 |
| FORUM-09 | Search posts with 300ms debounce | P1 |
| FORUM-10 | authorUid stored server-side only, never exposed | P0 |

### 5.6 Helplines & Resources

| ID | Requirement | Priority |
|---|---|---|
| HELP-01 | Curated national and state helpline directory | P0 |
| HELP-02 | Filter helplines by category | P0 |
| HELP-03 | Search by name or number | P0 |
| HELP-04 | Tap-to-call (tel: links) | P0 |
| HELP-05 | Bookmark helplines and articles | P1 |
| HELP-06 | Articles and rights guides (Markdown rendered) | P1 |
| HELP-07 | Filter articles by category | P1 |
| HELP-08 | Bookmarks persisted to Firestore | P1 |

### 5.7 NGO Portal

| ID | Requirement | Priority |
|---|---|---|
| NGO-01 | View reports assigned by admin | P0 |
| NGO-02 | Update report status (Assigned → In Progress → Resolved) | P0 |
| NGO-03 | Add notes to reports | P0 |
| NGO-04 | Forum moderation — view and remove posts | P0 |
| NGO-05 | View all channel posts (not just reported) | P1 |
| NGO-06 | Create awareness events | P1 |
| NGO-07 | Submit articles for admin review | P1 |
| NGO-08 | NGO dashboard with assigned/resolved stats | P1 |

### 5.8 Admin Panel

| ID | Requirement | Priority |
|---|---|---|
| ADMIN-01 | Platform analytics — users, reports, posts, articles | P0 |
| ADMIN-02 | Bar chart — reports by incident type | P0 |
| ADMIN-03 | Pie chart — user distribution | P0 |
| ADMIN-04 | Approve or reject NGO registrations | P0 |
| ADMIN-05 | Assign incident reports to NGOs | P0 |
| ADMIN-06 | Filter reports by status | P1 |
| ADMIN-07 | Add / delete helplines | P0 |
| ADMIN-08 | Publish / unpublish / delete articles | P0 |

---

## 6. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | Initial load under 3s on 4G. Vendor chunks split (Firebase, React, Recharts, Maps, Markdown loaded separately) |
| **Responsiveness** | Fully responsive — 375px (mobile), 768px (tablet), 1280px+ (desktop) |
| **Accessibility** | Semantic HTML, ARIA labels on interactive elements, keyboard navigation for modals |
| **Dark Mode** | Full dark mode support via Tailwind `class` strategy, persisted to localStorage |
| **Security** | No PII exposed client-side. `authorUid` never sent to other users. Firestore rules enforce auth on all reads/writes |
| **Privacy** | Anonymous posting by default. No tracking. Location only captured on explicit user action |
| **Reliability** | Firebase onSnapshot auto-reconnects on network drop. Graceful empty states on all data views |
| **SEO** | Meta description on index.html. Vercel SPA rewrite prevents 404 on direct URL access |

---

## 7. User Flows

### 7.1 New Citizen Registration
```
Landing → Register → Role: Citizen → Fill form → 
Firebase Auth creates account → Firestore user doc created (isApproved: true) → 
Redirect to /dashboard
```

### 7.2 SOS Trigger
```
Navbar SOS button → SOSModal opens → Auto-requests GPS → 
Contacts listed → "Send Alert" clicked → 
WhatsApp links open for each contact (with location) → 
Event logged to Firestore → Modal closes
```

### 7.3 Incident Report
```
Safety Map → "+ Report Incident" → 
Step 1: GPS captured / manual coords → 
Step 2: Select incident type → 
Step 3: Write description → 
Step 4: Upload photo (optional) → 
Firestore doc created → Pin appears on map in real-time
```

### 7.4 NGO Approval Flow
```
NGO registers (isApproved: false) → Sees "Pending Approval" screen → 
Admin sees NGO in Approvals list → Admin clicks Approve → 
Firestore updated (isApproved: true) → NGO can now access dashboard
```

---

## 8. Data Model (Firestore)

| Collection | Key Fields |
|---|---|
| `users` | uid, email, displayName, role, isApproved, state, city, organizationName |
| `sosContacts` | uid (docId), contacts[], alertMessage |
| `sosEvents` | uid, coords, triggeredAt |
| `incidentReports` | incidentType, description, location{lat,lng}, photoURL, status, assignedTo, ngoNotes |
| `forumPosts` | channelId, authorUid, alias, content, upvotes, upvotedBy[], isCounselorPost, isRemoved |
| `forumComments` | postId, authorUid, alias, content, upvotes, isRemoved |
| `lawyers` | name, state, city, caseTypes[], languages[], isProBono, bio, rating |
| `consultationRequests` | citizenUid, lawyerId, message, contactEmail, status |
| `helplines` | name, number, description, category, isActive |
| `articles` | title, content (markdown), category, authorUid, isPublished |
| `bookmarks` | uid (docId), articleIds[], helplineIds[] |
| `events` | title, description, eventDate, location, organiserUid |

---

## 9. Technical Architecture

```
┌─────────────────────────────────────────────┐
│                   Browser                    │
│                                             │
│  React 18 + Vite 5 + Tailwind CSS 3        │
│  React Router v6 (client-side routing)      │
│                                             │
│  Context Layer:                             │
│  AuthContext → SOSContext → ToastContext    │
│  ThemeContext                               │
│                                             │
│  Services Layer (Firebase SDK):             │
│  authService  reportService  forumService   │
│  lawyerService  helplineService  sosService │
└──────────────────┬──────────────────────────┘
                   │ Firebase SDK v10
┌──────────────────▼──────────────────────────┐
│              Firebase (BaaS)                 │
│                                             │
│  Authentication  →  Email/Password + Google  │
│  Firestore       →  Real-time + One-shot    │
│  Storage         →  Incident photos         │
└─────────────────────────────────────────────┘
                   │ Deployed via
┌──────────────────▼──────────────────────────┐
│                  Vercel                      │
│  SPA rewrite: all routes → index.html       │
│  Auto HTTPS, CDN, Preview deployments       │
└─────────────────────────────────────────────┘
```

---

## 10. Scope & Limitations

### In Scope (v1.0)
- All features listed above
- Web app (desktop + mobile browser)
- India-specific (Indian states, languages, helplines)

### Out of Scope (Future Versions)
- Native mobile app (React Native)
- Push notifications (FCM)
- Real-time chat between citizen and lawyer
- AI-powered incident severity classification
- Multi-language UI (Hindi, Tamil, etc.)
- Offline mode (Service Worker / PWA)
- In-app calling
- Payment gateway (for paid consultations)

---

## 11. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Fake NGO registrations | High | Admin approval gate before NGO access |
| User identity exposure in forum | Critical | Alias system — authorUid never client-exposed |
| Abuse of incident reporting | Medium | NGO moderation + admin oversight |
| Firebase billing costs | Low | Free tier sufficient for student project scale |
| Google Maps API quota | Low | Graceful fallback UI if key missing |
| SOS misfire | Medium | Confirmation modal before sending alerts |

---

## 12. Timeline

| Phase | Deliverables | Duration |
|---|---|---|
| 0 | Scaffold, Tailwind, Firebase init, folder structure | Day 1 |
| 1 | Auth system (Login, Register, Guards) | Days 1–2 |
| 2 | Layout, Landing, Shared components, Theme | Day 2 |
| 3 | SOS system (Context, wizard, WhatsApp) | Day 3 |
| 4 | Citizen Dashboard | Days 3–4 |
| 5 | Safety Map + Incident Reports | Days 4–5 |
| 6 | Legal Aid Directory | Days 5–6 |
| 7 | Anonymous Forum | Days 6–7 |
| 8 | Helplines & Resources + Bookmarks | Days 7–8 |
| 9 | NGO Portal | Days 8–9 |
| 10 | Admin Panel + Analytics | Days 9–10 |
| 11 | Polish, lazy loading, Vercel deploy | Days 10–11 |

---

## 13. Team

| Role | Responsible |
|---|---|
| Product Design & Development | Aaryan (Batch 2029) |
| Backend (Firebase) | Aaryan |
| UI/UX | Aaryan |
| Deployment | Vercel (automated) |

---

*Document Version: 1.0 | Date: April 2026 | Status: Final*