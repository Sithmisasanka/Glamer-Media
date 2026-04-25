# Multi-Step Onboarding Form Wizard

## Overview

A premium dark-themed 3-step onboarding wizard built with React, Vite, TypeScript, Tailwind CSS, and shadcn-style components. The wizard collects personal information, validates avatar upload, shows role-based skills, provides a review screen, and ends with a terminal success state.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn-style component structure (`/components/ui`)
- Framer Motion (step transitions + success animation)
- lucide-react (icons)
- Radix UI primitives (Select, Progress, Label, Separator)

## How to Run

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

## Features

- 3-step onboarding wizard with progress indicator
- Premium dark UI with glassmorphism and violet gradient
- Step 1: Full name, email, role, and department collection
- Step 2: Avatar upload with local preview + role-based skill chips
- Step 3: Review all entered data before submitting
- Terminal success screen (no back navigation)
- Inline validation messages (no browser alerts)
- Full name and email validation (format check)
- Avatar validation: JPG/JPEG/PNG only, max 3 MB
- Avatar preview using `URL.createObjectURL` (no server upload)
- Role-based skill selection with minimum 2 required
- Selected chips show ✓ checkmark icon
- Back navigation preserves all entered data
- Changing role clears selected skills only (avatar + personal info preserved)
- Accessible: aria-labels, aria-invalid, aria-describedby, role="alert", keyboard navigable
- Responsive design (mobile + desktop)
- Smooth Framer Motion transitions between steps

## Validation Rules

| Field      | Rule                    | Error Message                              |
| ---------- | ----------------------- | ------------------------------------------ |
| Full name  | Required                | Full name is required.                     |
| Email      | Required                | Email address is required.                 |
| Email      | Valid format             | Enter a valid email address.               |
| Role       | Required                | Select a role.                             |
| Department | Required                | Select a department.                       |
| Avatar     | Required                | Avatar is required.                        |
| Avatar     | JPG/JPEG/PNG only       | Only JPG, JPEG, and PNG files are allowed. |
| Avatar     | Max 3 MB                | Avatar must be 3 MB or smaller.            |
| Skills     | Minimum 2 selected      | Select at least 2 skills.                  |

## Architecture

- **Parent state in App.tsx**: All wizard state (`currentStep`, `isSubmitted`, `formData`, `errors`) lives in the parent App component. Each step receives data and callbacks as props.
- **Validation on Next**: Each "Next" click triggers step-specific validation. Only valid steps advance.
- **Role-change logic**: When the role changes, `skills` array is cleared because the skill list depends on the role. Avatar, name, email, and department are preserved.
- **Avatar preview**: File is validated (type + size) before `URL.createObjectURL` is called. Invalid files never show a preview.
- **Success is terminal**: Once submitted, the success screen replaces the wizard. There is no back navigation.

## Trade-offs

- Used local React state because the wizard is small and time-limited. For a larger branching wizard, `useReducer` or a state machine would be better.
- No backend upload because the requirement asks for local avatar preview only.
- Manual testing was prioritized over automated tests due to the live task time limit.
- Used a compact shadcn-style structure instead of a full design system setup for speed.

## What I Would Do Next

- Add React Testing Library tests for validation logic and step navigation
- Add Playwright E2E tests for the full wizard flow
- Improve focus management after each step transition (auto-focus first field)
- Add drag-and-drop avatar upload
- Add server-side avatar upload if this became a production feature
- Add persistent draft saving (localStorage)
- Add avatar cropping before preview

## AI Tools / Resources Used

- ChatGPT was used for planning and implementation guidance ([Chat Log](https://chatgpt.com/share/69ec726a-6c00-83a5-8bd4-9fa563c83de2))
- 21st.dev-inspired shadcn-style components for UI structure
- lucide-react for icons
- Framer Motion for step transitions
- Radix UI for accessible primitives (Select, Progress, Label, Separator)
