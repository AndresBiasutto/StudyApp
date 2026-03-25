# Frontend Documentation - Campus Virtual Client

## 1. Overview

The Frontend is a **React 19** application built with **Vite**, following **Clean Architecture** and **Atomic Design** principles. It uses **Redux Toolkit** for state management and **Tailwind CSS 4** for styling.

### Technology Stack
- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4
- Redux Toolkit + Redux Persist
- React Router DOM 7
- Axios (HTTP Client)
- Framer Motion (Animations)

---

## 2. Project Structure

```
client-campus/
├── src/
│   ├── BR/                    # Clean Architecture
│   │   ├── application/       # Use Cases, Mappers, ViewModels
│   │   │   ├── useCases/    # Business logic (User/, Subject/, etc.)
│   │   │   ├── mappers/     # Data transformers
│   │   │   └── viewModels/  # View-specific models
│   │   ├── domain/           # Entities & Repository Interfaces
│   │   │   ├── entities/    # User, Subject, Role, Grade, etc.
│   │   │   └── services/    # Repository contracts
│   │   └── infrastructure/  # Implementations
│   │       ├── repositories/ # API implementations
│   │       ├── services/    # httpClient (Axios)
│   │       └── errors/      # Error types
│   │
│   ├── UI/                    # Presentation Layer
│   │   ├── components/      # Atomic Design
│   │   │   ├── atoms/       # Button, Input, Icon, Label, etc.
│   │   │   ├── molecules/   # Sidebar, Cards, Forms, Navigation
│   │   │   ├── organisms/  # Complex components
│   │   │   └── templates/  # Layout templates
│   │   ├── views/           # Pages (Admin, Teacher, Student)
│   │   └── interfaces/     # Props interfaces
│   │
│   ├── store/                # Redux Toolkit
│   │   ├── slices/          # Auth, User, Subject, Role, Grade, UI
│   │   └── store.ts        # Store configuration
│   │
│   ├── routes/              # Routing (protected routes)
│   ├── hooks/               # Custom hooks (useStore, useForm)
│   └── assets/              # Images, SVGs
│
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 3. Clean Architecture (BR/)

### Flow of Data
```
UI Component → Use Case → Repository (Interface) → API Repository → HTTP Client → Backend API
       ↓
   Redux Store
```

### Layers

| Layer | Purpose |
|-------|---------|
| **Domain** | Entities (interfaces) and repository contracts |
| **Application** | Use cases with business logic, mappers, view models |
| **Infrastructure** | Repository implementations, HTTP client |

---

## 4. Commands

### Setup
```bash
cd client-campus
npm install
```

### Development
```bash
npm run dev    # Start Vite dev server
```

### Build
```bash
npm run build  # Production build
```

### Preview
```bash
npm run preview  # Preview production build
```

### Lint
```bash
npm run lint    # Run ESLint
```

### Type Check
```bash
npx tsc --noEmit
```

---

## 5. Environment Variables

Create a `.env` file in `client-campus/` root:

```plaintext
VITE_API_URL=http://localhost:3000/api/
```

---

## 6. State Management (Redux)

### Store Structure
```
store/
├── slices/
│   ├── authSlice/      # Authentication (token, user)
│   ├── userSlice/      # Users CRUD
│   ├── subjectSlice/   # Subjects CRUD
│   ├── roleSlice/      # Roles
│   ├── gradeSlice/     # Grades
│   └── uiSlice/       # UI state (modals, theme)
└── store.ts           # Configure store + persist
```

### Auth Persistence
- Uses `redux-persist` with `localStorage`
- Only persists `auth.token`
- Auto-logout on 401 response

---

## 7. HTTP Client

### Location
`src/BR/infrastructure/services/httpClient.ts`

### Features
- **Automatic token injection**: Adds `Authorization: Bearer <token>` to requests
- **401 handling**: Dispatches logout on unauthorized responses
- **Base URL**: From `VITE_API_URL` environment variable

### Usage
```typescript
import { httpClient } from '../infrastructure/services/httpClient';

// GET request
const users = await httpClient.get('/users');

// POST request
const newUser = await httpClient.post('/users', userData);
```

---

## 8. Atomic Design

### Atoms
Basic building blocks (no dependencies):
- `Button`, `Input`, `Label`, `Icon`, `Image`
- `H1`, `H2`, `H3`, `P`, `Span`
- `Link`, `NavItem`

### Molecules
Simple groups of atoms:
- `SearchBar`, `Sidebar`, `Navigation`
- `FormInput`, `FormSelect`
- `Card`, `Spinner`, `Modal`

### Organisms
Complex UI components:
- `AdminTools`, `TeacherTools`
- `CreateSubjectForm`, `RegisterForm`
- `DashboardHeader`, `DashboardFooter`

### Templates
Layout structures:
- `Dashboard` template

---

## 9. Components Usage

### Atoms
```tsx
import Button from '../components/atoms/button.atom';
import Input from '../components/atoms/input.atom';

<Button btnName="Submit" onClick={handleSubmit} />
<Input type="text" name="email" value={email} onChange={handleChange} />
```

### Molecules
```tsx
import SearchBar from '../components/molecules/searchBar.molecule';
import Spinner from '../components/molecules/spinner.molecule';

<SearchBar onSearch={handleSearch} />
{loading && <Spinner />}
```

### Organisms
```tsx
import CreateSubjectForm from '../components/organisms/forms/createSubjectForm.organism';
import DashboardHeader from '../components/organisms/dashboard/dashboardHeader.organism';

<CreateSubjectForm onSubmit={handleCreate} />
<DashboardHeader user={user} />
```

---

## 10. Views (Pages)

| View | Description |
|------|-------------|
| `landing.view.tsx` | Landing page |
| `register.view.tsx` | Registration page |
| `adminHome.view.tsx` | Admin dashboard |
| `adminUsers.view.tsx` | Admin user management |
| `adminSubjects.view.tsx` | Admin subject management |
| `adminUserDetail.view.tsx` | Admin user details |
| `teacherHome.view.tsx` | Teacher dashboard |
| `studentDashboard.view.tsx` | Student dashboard |
| `missing.view.tsx` | 404 page |

---

## 11. Routing

### Protected Routes
Location: `src/routes/protectedRoutes.tsx`

### Usage
```tsx
import ProtectedRoutes from '../routes/protectedRoutes';

<Route 
  path="/admin" 
  element={
    <ProtectedRoutes role="admin">
      <AdminHome />
    </ProtectedRoutes>
  } 
/>
```

---

## 12. Custom Hooks

### useStore
Access Redux store with types:
```tsx
import { useAppDispatch, useAppSelector } from '../hooks/UseStore.hook';

const dispatch = useAppDispatch();
const { users, loading } = useAppSelector(state => state.users);
```

### useForm
Form handling with validation:
```tsx
import { useForm } from '../hooks/UseForm.hook';

const { values, errors, handleChange, handleSubmit } = useForm(initialState, validate);
```

---

## 13. Code Conventions

### Naming
- Files: kebab-case (`button.atom.tsx`, `user-api-repository.ts`)
- Components: PascalCase (`Button`, `UserApiRepository`)
- Props Interfaces: Prefix with `I` (`IButtonProps`)
- Hooks: `use` prefix (`useForm`, `useStore`)

### Imports
```typescript
// External
import { useState } from 'react';
import axios from 'axios';

// Internal (absolute paths)
import { httpClient } from '@/BR/infrastructure/services/httpClient';
import type { User } from '@/BR/domain/entities/user.interface';
```

---

## 14. Styling

### Tailwind CSS 4
- Uses `@import "tailwindcss"` syntax
- Custom theme variables in `src/UI/index.css`
- Dark mode support with `.dark` class

### Component Styles
```tsx
<button className="px-4 py-2 bg-lightPrimary dark:bg-darkPrimary text-lightText dark:text-darkText rounded">
  Click Me
</button>
```

---

## 15. Forms

### Creating a Form
1. Define form data interface in `src/UI/interfaces/`
2. Create validator in `src/BR/domain/services/validators/`
3. Use `useForm` hook with validation
4. Dispatch thunk action on submit

### Example
```tsx
const { values, errors, handleChange, handleSubmit } = useForm(formData, validate);

const onSubmit = (data) => {
  dispatch(createSubject(data));
};

<form onSubmit={handleSubmit(onSubmit)}>
  <FormInput label="Name" name="name" value={values.name} onChange={handleChange} error={errors.name} />
</form>
```
