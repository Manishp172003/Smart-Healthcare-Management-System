# SmartHealth Frontend Design Specification & Page Tracker

This document serves as the master page tracker and design reference for the **SmartHealth Management System** frontend. It details the visual theme, typography, routes, and layout structures implemented so far.

---

## 1. Design System & Global Styles

### Visual Theme: Premium Glassmorphism
All dashboard views employ a unified glassmorphic style that provides visual depth, clean spacing, and modern Fluent-design aesthetics:
*   **Canvas Backdrops:** Soft slate-gray gradients (`bg-gradient-to-tr from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]`).
*   **Ambient Glow Blobs:** Drifting, absolute-positioned, low-opacity colored spheres (`from-[#2563EB]/8 to-[#0D9488]/8` and `bg-[#0D9488]/6`) that sit behind dashboard cards.
*   **Glass Containers:** Semi-transparent white card frames (`bg-white/60 border-white/45 backdrop-blur-md`) with rounded corners (`rounded-3xl` or `rounded-2xl`).
*   **Tab Switching Transitions:** Slide-up and fade-in keyframe animations (`@keyframes viewFadeInUp` over `400ms` with `cubic-bezier(0.16, 1, 0.3, 1)` easing) triggered dynamically upon clicking sidebar tabs.

### Color Palette
*   **Brand Blue:** `#2563EB` (Tailwind `blue-600`) - Used for primary actions, navigation highlights, and info cards.
*   **Brand Teal:** `#0D9488` (Tailwind `teal-600`) - Used for secondary actions, confirmation badges, and success highlights.
*   **Sidebar Slate:** Gradient `from-[#0F172A] via-[#1E293B] to-[#0D9488]` - Used for clinician and administrator navigation backdrops.
*   **Alert Red:** `#EA4335` (Tailwind `red-500`) - Used for critical system notifications, cancellations, and emergency indicators.

---

## 2. Route Configuration

All routes are registered inside [`App.jsx`](file:///d:/Hackathon/Hack%202.0%20project/App/Smart-Healthcare-Management-System/Frontend/src/App.jsx):

| Route Path | Element | Description |
| :--- | :--- | :--- |
| `/` | `Home` | Patient-facing public landing page. |
| `/login` | `Auth` (Login) | Patient sign-in portal. |
| `/register` | `Auth` (Register) | Patient account creation portal. |
| `/patient/dashboard` | `PatientDashboard` | Secured portal for patients. |
| `/doctor/dashboard` | `DoctorDashboard` | Secured portal for clinicians (Doctors). |
| `/admin/login` | `AdminLogin` | Secured login page for IT Administrators. |
| `/admin/dashboard` | `AdminDashboard` | Secured master control dashboard for IT Administrators. |

---

## 3. Page & Component Directory

### A. Patient Portal (`/login` & `/register` & `/patient/dashboard`)
*   **Authentication (`Auth.jsx` & `AuthBrandPanel.jsx`):**
    *   Toggles smoothly between **Login** and **Registration** form columns.
    *   Integrates **"Sign in with Google"** and **"Sign up with Google"** buttons featuring official SVG icons, borders, and hover-lift actions.
*   **Dashboard Container (`PatientDashboard.jsx` & `Sidebar.jsx` & `DashboardHeader.jsx`):**
    *   Hosts the patient sidebar navigation (profile photo, account links) and maps dynamic page titles.
*   **Dashboard Subviews:**
    1.  *Dashboard Home:* Displays the **Next Appointment** card (scaled cardiology checkup details, glass controls), a **Quick Actions** widget (book new, query record, contact support), a scrolling **Upcoming Appointments** schedule, and a **Recent History** table.
    2.  *My Appointments:* Renders active consultations list with status badges and cancellation hooks.
    3.  *Book Appointment:* Multi-step wizard layout for choosing departments (Cardiology, Pediatrics, Neurology), doctor slots, and booking payment receipts.
    4.  *Medical Records:* Searchable directory for diagnostic lab reports, file upload triggers, and PDF download hooks.
    5.  *Patient Profile:* Input forms to edit personal records (height, weight, blood type, emergency contacts).
    6.  *Help Center (`HelpCenter.jsx`):* Searchable FAQ accordion matching clinical categories, hotline support channels, and support ticket forms.

### B. Doctor Portal (`/doctor/dashboard`)
*   **Dashboard Shell (`DoctorDashboard.jsx` & `DoctorSidebar.jsx` & `DoctorHeader.jsx`):**
    *   Teal-slate gradient sidebar featuring the official high-contrast heart-pulse logo and doctor profile avatars.
*   **Doctor Subviews:**
    1.  *Dashboard Home (`DoctorHome.jsx`):* Today's schedule table (Elena Silva in-progress followups, Marcus Johnson physicals, Arthur Pendelton reviews), quick confirmations, and clinical load counters (visits, active patients, hours clocked).
    2.  *Patients (`DoctorPatients.jsx`):* Searchable clinician directory mapping patient lists, ages, and diagnostic details.
    3.  *Schedules (`DoctorSchedules.jsx`):* Toggles availability slots on a calendar matrix.
    4.  *Medical Records (`DoctorRecords.jsx`):* Electronic prescription writing forms and archival documents.
    5.  *Analytics (`DoctorAnalytics.jsx`):* consultation ratios and progress charts.

### C. Admin Portal (`/admin/login` & `/admin/dashboard`)
*   **Admin Login (`AdminLogin.jsx` & `AdminBranding.jsx` & `AdminLoginForm.jsx` & `SecurityFeatures.jsx`):**
    *   Rounded card container (`rounded-[32px]`) floating on a glowing canvas.
    *   *Branding (Left):* Official gradient logo text (`SmartHealth - Admin Portal`) on a full-height image panel.
    *   *Form (Right):* Standard credentials (`admin@smarthealth.com`), brand button gradients, and 2FA toggles.
*   **Admin Dashboard Shell (`AdminDashboard.jsx` & `AdminSidebar.jsx` & `AdminHeader.jsx`):**
    *   Features a critical **Emergency Alert** button (triggers safety lockdowns) in the navigation pane.
*   **Admin Subviews:**
    1.  *Dashboard Home (`AdminHome.jsx`):*
        *   **5 Stats Cards:** Total Patients (12,485), Total Doctors (342), Appointments Today (856), Pending Approvals (43, warning style), and System Status (Optimal). Configured to sit in a single horizontal row (`grid-cols-5 gap-4 md:gap-5 lg:gap-6`) and styled as perfect squares (`aspect-square p-5 lg:p-6`) with scaled typography.
        *   **Appointment Trends Chart:** Weekly column bar chart drawn using native CSS percentage heights (`style={{ height: data.height }}`) to prevent JIT compile issues.
        *   **Recent Activity:** Scrolling feed mapping system event logs.
        *   **Upcoming Appointments Table:** Eleanor Pena, Wade Warren, and Brooklyn Simmons audit logs.
        *   **Footer:** HIPAA compliance links and copyright details.
    2.  *Patients Audit (`AdminPatients.jsx`):* Access accounts directory list (Active/Suspended states).
    3.  *Schedules Audit (`AdminSchedules.jsx`):* Visual schedules and doctor queue load monitor.
    4.  *Medical Records (`AdminRecords.jsx`):* Logs secure HIPAA file access audits and system log signatures.
    5.  *Analytics (`AdminAnalytics.jsx`):* Monitored network latency, CPU usage, and database sync integrity rates.
