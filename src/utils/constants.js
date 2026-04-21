export const USER_ROLES = {
  CITIZEN: 'citizen',
  NGO: 'ngo',
  ADMIN: 'admin',
}

export const INCIDENT_TYPES = [
  { value: 'harassment', label: 'Harassment', color: '#f97316', pinColor: 'orange' },
  { value: 'assault', label: 'Assault / Physical Violence', color: '#ef4444', pinColor: 'red' },
  { value: 'stalking', label: 'Stalking', color: '#a855f7', pinColor: 'purple' },
  { value: 'theft', label: 'Theft / Robbery', color: '#3b82f6', pinColor: 'blue' },
  { value: 'cyber', label: 'Cyber Crime', color: '#06b6d4', pinColor: 'cyan' },
  { value: 'other', label: 'Other', color: '#6b7280', pinColor: 'gray' },
]

export const CASE_TYPES = [
  { value: 'domestic_violence', label: 'Domestic Violence' },
  { value: 'workplace_harassment', label: 'Workplace Harassment' },
  { value: 'divorce', label: 'Divorce & Separation' },
  { value: 'property', label: 'Property Rights' },
  { value: 'cyber_crime', label: 'Cyber Crime' },
  { value: 'criminal', label: 'Criminal Defense' },
  { value: 'child_custody', label: 'Child Custody' },
  { value: 'consumer', label: 'Consumer Rights' },
]

export const INDIAN_LANGUAGES = [
  'Hindi', 'English', 'Bengali', 'Telugu', 'Marathi',
  'Tamil', 'Urdu', 'Gujarati', 'Kannada', 'Malayalam',
  'Odia', 'Punjabi', 'Assamese',
]

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
]

export const FORUM_CHANNELS = [
  {
    id: 'general',
    name: 'General Support',
    description: 'Share your experiences, seek advice, and support others',
    icon: '💬',
  },
  {
    id: 'domestic_violence',
    name: 'Domestic Violence Support',
    description: 'A safe space for survivors and those seeking help',
    icon: '🏠',
  },
  {
    id: 'workplace',
    name: 'Workplace Safety',
    description: 'Discuss workplace harassment and rights',
    icon: '💼',
  },
  {
    id: 'legal',
    name: 'Legal Questions',
    description: 'Ask legal questions, get guidance from counselors',
    icon: '⚖️',
  },
  {
    id: 'success_stories',
    name: 'Success Stories',
    description: 'Share your journey and inspire others',
    icon: '⭐',
  },
]

export const HELPLINE_CATEGORIES = [
  { value: 'emergency', label: 'Emergency', color: 'red' },
  { value: 'domestic_violence', label: 'Domestic Violence', color: 'rose' },
  { value: 'legal', label: 'Legal Aid', color: 'blue' },
  { value: 'mental_health', label: 'Mental Health', color: 'purple' },
  { value: 'child', label: 'Child Protection', color: 'orange' },
  { value: 'cyber', label: 'Cyber Crime', color: 'cyan' },
]

export const ARTICLE_CATEGORIES = [
  { value: 'rights', label: 'Know Your Rights' },
  { value: 'safety_tips', label: 'Safety Tips' },
  { value: 'legal_guide', label: 'Legal Guide' },
  { value: 'mental_health', label: 'Mental Health' },
  { value: 'resources', label: 'Resources' },
]

export const REPORT_STATUSES = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
}

export const STATUS_LABELS = {
  pending: { label: 'Submitted', color: 'yellow' },
  assigned: { label: 'Assigned to NGO', color: 'blue' },
  in_progress: { label: 'Action in Progress', color: 'orange' },
  resolved: { label: 'Resolved', color: 'green' },
  closed: { label: 'Closed', color: 'gray' },
}

export const MAX_SOS_CONTACTS = 5

export const DEFAULT_ALERT_MESSAGE =
  'I need help. Please check on me immediately. My current location:'
