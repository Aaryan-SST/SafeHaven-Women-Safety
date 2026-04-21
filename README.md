# 🛡️ SafeHaven — Women's Safety & Support Network

A production-level, full-stack React web application built as an end-term project. SafeHaven is a community-driven platform dedicated to women's safety, legal empowerment, and anonymous peer support across India.

---

## 🎯 Problem Statement

Women across India face daily safety challenges — from street harassment to domestic violence — yet lack a single unified platform that combines emergency response, legal help, community support, and incident reporting. SafeHaven bridges this gap by putting emergency SOS, a community safety map, legal aid, an anonymous support forum, and a helpline directory all in one place.

---

## ✨ Features

### 🚨 Emergency SOS System
- One-tap WhatsApp alert sent to up to 5 trusted contacts
- Automatically includes a live Google Maps location link
- Works on any device — zero backend, zero API cost
- Test mode available (sends clearly labeled test alerts)

### 🗺️ Community Safety Map
- Real-time incident pins powered by Firestore onSnapshot
- Citizens can report incidents with type, description, and photo
- Filter pins by incident type or status
- Color-coded markers per incident category

### ⚖️ Legal Aid Directory
- Browse verified lawyers specializing in women's rights
- Filter by state, case type, language, and pro-bono availability
- Request a consultation directly through the platform
- Client-side filtering using useMemo for instant results

### 💬 Anonymous Community Forum
- 5 moderated channels (General, Domestic Violence, Workplace, Legal, Success Stories)
- Every post uses a randomly generated alias — real identity never exposed
- Verified NGO counselors marked with a green badge
- Real-time posts via onSnapshot, upvotes, replies, and reporting

### 📞 Helpline & Resources
- Complete national and state-level helpline directory
- Searchable and filterable by category
- Bookmark helplines and articles for quick access
- Rights guides and articles written by NGO partners (Markdown rendered)

### 🏢 NGO Partner Portal
- Manage assigned incident reports and update status
- Participate in forum as verified counselors
- Create and manage awareness events
- Submit articles for admin review

### 🔐 Admin Dashboard
- Platform analytics with charts (Recharts)
- Approve or reject NGO registrations
- Assign reports to NGOs
- Manage helpline directory and publish/unpublish articles

---

## 🧩 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5 |
| Styling | Tailwind CSS 3 (dark mode support) |
| Routing | React Router v6 |
| Backend / DB | Firebase 10 (Auth, Firestore, Storage) |
| Maps | @vis.gl/react-google-maps |
| Charts | Recharts |
| Markdown | react-markdown + remark-gfm |
| IDs | nanoid |
| Dates | date-fns |
| Deployment | Vercel |

---

## ⚛️ React Concepts Covered

| Concept | Where Used |
|---|---|
| useState | Every form, toggle, filter state |
| useEffect | Auth listener, Firestore subscriptions, geolocation, debounce |
| useReducer | SOSSetup 3-step wizard, ReportModal 4-step form |
| useContext | AuthContext, SOSContext, ThemeContext, ToastContext |
| useMemo | Lawyer filtering, map pin filtering, forum search, helpline filtering |
| useCallback | SOS trigger, bookmark toggle, filter setters |
| useRef | Google Maps instance, debounce timer, file input |
| React.lazy + Suspense | SafetyMap, Forum, ForumChannel, AdminDashboard |
| Context API | 4 providers: Auth, SOS, Theme, Toast |
| Controlled components | All forms throughout |
| Lifting state up | ReportModal state lifted to SafetyMap page |
| Conditional rendering | Role-aware nav, pending approval states, loading/error states |
| Lists & Keys | Lawyer cards, pins, forum posts, helpline cards |
| Protected Routes | ProtectedRoute + RoleRoute components |
| React Router v6 | Full client-side routing with nested routes |

---

## 🗂️ Project Structure

src/
├── App.jsx
├── context/
│ ├── AuthContext.jsx
│ ├── SOSContext.jsx
│ ├── ThemeContext.jsx
│ └── ToastContext.jsx
├── hooks/
│ ├── useAuth.js
│ ├── useSOS.js
│ ├── useGeolocation.js
│ ├── useMapPins.js
│ ├── useLawyerFilter.js
│ ├── useForumSearch.js
│ ├── useBookmarks.js
│ └── useAnonymousAlias.js
├── services/
│ ├── firebase.js
│ ├── authService.js
│ ├── userService.js
│ ├── sosService.js
│ ├── reportService.js
│ ├── forumService.js
│ ├── lawyerService.js
│ ├── helplineService.js
│ ├── articleService.js
│ ├── eventService.js
│ ├── storageService.js
│ ├── analyticsService.js
│ └── bookmarkService.js
├── utils/
│ ├── constants.js
│ ├── aliasGenerator.js
│ ├── whatsappHelper.js
│ ├── geoHelpers.js
│ ├── formatters.js
│ ├── roleGuards.js
│ └── validators.js
├── components/
│ ├── layout/ # Navbar, Footer, Sidebar, PageWrapper
│ ├── shared/ # Button, Input, Modal, Toast, Badge, Spinner...
│ ├── sos/ # SOSButton, SOSModal, ContactCard
│ ├── map/ # ReportModal (useReducer 4-step)
│ ├── forum/ # PostCard, PostComposer, CommentThread, UpvoteButton
│ ├── legal/ # LawyerCard, LawyerFilterPanel, ConsultationModal
│ ├── helpline/ # HelplineCard, ArticleCard
│ ├── dashboard/ # StatCard, QuickSOSWidget, RecentReports
│ ├── admin/ # AnalyticsChart, NGOApprovalCard, ReportAssignmentRow
│ └── ngo/ # ReportStatusEditor, EventForm, ArticleUploadForm
└── pages/
├── Landing.jsx
├── NotFound.jsx
├── auth/ # Login, Register, ForgotPassword
├── citizen/ # Dashboard, SOSSetup, SafetyMap*, Forum*, ForumChannel*, LegalAid, HelplineResources
├── ngo/ # NGODashboard, NGOReports, NGOForum, NGOEvents
└── admin/ # AdminDashboard*, AdminNGOApprovals, AdminReports, AdminHelplines, AdminArticles

`*` = React.lazy + Suspense (code-split chunks)

---

## 👥 User Roles

| Role | Access | Approval |
|---|---|---|
| Citizen | Dashboard, SOS, Safety Map, Legal Aid, Forum, Helplines | Auto-approved |
| NGO Partner | Assigned reports, Forum moderation, Events, Articles | Admin approval required |
| Admin | Full platform — analytics, approvals, assignments | Pre-seeded in Firestore |

---
