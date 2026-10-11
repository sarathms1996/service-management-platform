HEAD
# service-management-platform
React project 1

# Service Management & Operations Platform

A production-style React + TypeScript application for coordinating customers, employees, appointments, service requests, invoices, payments, dashboards, notifications, and activity history for a multi-branch service company.

## 1. Project Overview

This platform provides a centralized source of truth for managing business operations across multiple branches. It helps teams coordinate work, track customer relationships, dispatch service activities, manage billing, and monitor branch performance from a single application.

## 2. Features

- Authentication with role-based access control
- Admin, branch manager, and staff dashboards
- Customer management with list, search, filters, and detail views
- Service request lifecycle tracking and assignment workflows
- Appointment scheduling, calendar filters, and upcoming views
- Employee and branch administration
- Service catalog integration for requests and invoices
- Invoice creation with live totals and payment tracking
- Notification center and activity history
- Data-driven UI with loading, empty, success, and error states
- Responsive layout for mobile, tablet, and desktop

## 3. User Roles

### Admin
- Company-wide access to customers, employees, branches, service requests, appointments, finance, and dashboards.

### Branch Manager
- Manages branch-based customers, requests, appointments, and invoices for their assigned location.

### Staff
- Accesses only assigned requests, related customers, appointments, and relevant invoice information.

## 4. Technology Stack

- React for the frontend UI
- TypeScript for type safety
- Vite for fast development and builds
- React Router for protected routing and navigation
- Axios for centralized REST API communication
- TanStack Query for server-state caching and refetching
- Zustand for client-side session state
- React Hook Form with Zod for form validation
- Tailwind CSS for design and responsiveness
- Vitest for unit and component testing
- React Testing Library for UI interaction tests
- Playwright for end-to-end verification

## 5. Project Structure

- src/app - app shell, providers, guards, and routing
- src/features - domain-based feature modules
- src/components - shared UI building blocks
- src/lib - shared utilities, API config, and permission helpers
- src/store - Zustand state
- src/types - domain types
- src/test - test setup

## 6. Prerequisites

- Node.js 18+
- npm 9+
- Modern browser

## 7. Installation

```bash
npm install
```

## 8. Environment Setup

Create a .env file in the project root:

```text
VITE_API_BASE_URL=http://localhost:3000/api
```

A template is provided in .env.example.

## 9. Running the Application

```bash
npm run dev
```

## 10. Production Build

```bash
npm run build
```

## 11. Testing

```bash
npm run test
npm run test:run
npx playwright install
npm run e2e
```

## 12. Deployment

This project is intended to be deployed to a public web host with the API base URL configured through the VITE_API_BASE_URL environment variable. No hardcoded production endpoint should be committed to source code.

## 13. Demo Accounts

Use placeholder demo credentials when the API is unavailable:

- Admin: admin@serviceops.com / admin123
- Branch Manager: manager@northbranch.com / manager123
- Staff: staff@serviceops.com / staff123

## 14. Technical Decisions

The app uses a feature-first structure so modules stay organized and can scale with real-world business requirements. TanStack Query manages server data and invalidation, while Zustand manages session and UI state. React Hook Form and Zod keep forms validated and consistent, and route guards enforce role-based access before navigation is allowed.
3022856 (service-management-platform)
