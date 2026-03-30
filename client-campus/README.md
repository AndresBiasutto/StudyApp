# Frontend Documentation - Campus Virtual Client

## 1. Overview

The frontend is a React 19 application built with Vite and TypeScript.
It implements the Campus Virtual experience for three main roles:

- admin
- teacher
- student

The codebase combines:

- presentation with Atomic Design under `src/UI`
- application/domain/infrastructure separation under `src/BR`
- global orchestration with Redux Toolkit

The effective runtime flow is:

```text
View/Component -> Redux thunk -> Use case -> Repository -> httpClient -> Backend API
```

Recent stabilization work focused on:

- aligning frontend entities with backend DTOs
- reducing contract drift between API and UI
- fixing request loops in the admin user detail flow

---

## 2. Technology Stack

- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4
- Redux Toolkit
- Redux Persist
- React Router DOM 7
- Axios
- Framer Motion
- Google OAuth

---

## 3. Project Structure

```text
client-campus/
├── src/
│   ├── UI/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── views/
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   └── templates/
│   │   └── interfaces/
│   ├── BR/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   └── services/
│   │   ├── application/
│   │   │   ├── useCases/
│   │   │   ├── mappers/
│   │   │   └── viewModels/
│   │   └── infrastructure/
│   │       ├── repositories/
│   │       ├── services/
│   │       ├── factories/
│   │       └── errors/
│   ├── store/
│   │   ├── slices/
│   │   └── store.ts
│   ├── routes/
│   ├── hooks/
│   └── assets/
├── package.json
└── vite.config.ts
```

---

## 4. Architecture

### Layers

| Layer | Responsibility |
|-------|----------------|
| `UI/` | Screens, layout, components, user interaction |
| `store/` | Async orchestration, cache, auth state, UI state |
| `BR/domain` | Contracts and domain interfaces |
| `BR/application` | Use cases and mapping logic |
| `BR/infrastructure` | API repositories and HTTP client |

### Real execution flow

Most user actions follow this pattern:

```text
Component
  -> dispatch(thunk)
  -> use case
  -> repository interface
  -> API repository
  -> Axios httpClient
  -> backend endpoint
  -> Redux slice updates state
  -> component re-renders
```

Redux is the main coordination point.

---

## 4.1 Architecture Flow Diagram (ASCII)

The following ASCII flow represents the frontend architecture used by the project:

```text
                    CAMPUS VIRTUAL - FRONTEND FLOW

  Browser
    |
    v
  +----------------------+
  | React Views / UI     |
  |----------------------|
  | views                |
  | organisms            |
  | molecules            |
  | atoms                |
  +----------------------+
    |
    v
  +----------------------+
  | Redux Store          |
  |----------------------|
  | slices               |
  | async thunks         |
  | persisted auth token |
  +----------------------+
    |
    v
  +----------------------+
  | BR/application       |
  |----------------------|
  | useCases             |
  | mappers              |
  | viewModels           |
  +----------------------+
    |
    v
  +----------------------+
  | BR/infrastructure    |
  |----------------------|
  | API repositories     |
  | repositoryFactory    |
  | httpClient (Axios)   |
  +----------------------+
    |
    v
  +----------------------+
  | Backend API (/api)   |
  +----------------------+


  Supporting frontend layers:

  +----------------------+     +----------------------+
  | BR/domain            |     | routes/              |
  |----------------------|     |----------------------|
  | entities             |     | ProtectedRoutes      |
  | repository contracts |     | RedirectOnAuth       |
  +----------------------+     +----------------------+
                \                        /
                 \                      /
                  \                    /
                   +------------------+
                   | hooks/           |
                   |------------------|
                   | UseStore.hook    |
                   | UseForm.hook     |
                   +------------------+
```

---

## 5. Bootstrap and Routing

### App bootstrap

[main.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/main.tsx) initializes:

- `GoogleOAuthProvider`
- Redux `Provider`
- `PersistGate`
- `BrowserRouter`

### Main routes

[App.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/App.tsx) defines:

- landing routes
- protected dashboard routes
- admin, teacher, and student views

### Route protection

- [protectedRoutes.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/routes/protectedRoutes.tsx)
- [redirectOnAuth.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/routes/redirectOnAuth.tsx)

The route logic depends on:

- `auth.isAuthenticated`
- `auth.selected.Role.name`

---

## 6. State Management

The Redux store is configured in [store.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/store/store.ts).

### Active slices

- `ui`
- `auth`
- `users`
- `subjects`
- `units`
- `chapters`
- `roles`
- `grades`

### Persistence

Only `auth.token` is persisted with Redux Persist.

That creates this session restoration flow:

1. Token survives page reload.
2. `App.tsx` detects token presence.
3. `authenticateMe()` is dispatched.
4. Backend returns the full current user.
5. Protected routes and role redirects become active.

Important note:

- `users.loading` is currently shared across list/detail/mutation operations.
- This is functional now, but it is still a structural limitation and should eventually be split into more granular loading states.

---

## 7. HTTP Client

The HTTP client lives in [httpClient.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/infrastructure/services/httpClient.ts).

### Responsibilities

- set `baseURL` from `VITE_API_URL`
- inject `Authorization: Bearer <token>`
- convert backend `{ error: string }` responses into thrown `Error`
- log out automatically on HTTP `401`

This file is the single entry point for authenticated API communication.

---

## 8. Repository and Use Case Layer

### Repository factory

[repositoryFactory.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/infrastructure/factories/repositoryFactory.ts) exposes singleton repositories for:

- users
- subjects
- roles
- grades
- units
- chapters

### Use cases

Use cases are grouped by feature, for example:

- [useCases/User/index.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/application/useCases/User/index.ts)
- [useCases/Subject/index.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/application/useCases/Subject/index.ts)
- [useCases/Unit/index.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/application/useCases/Unit/index.ts)
- [useCases/Chapter/index.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/application/useCases/Chapter/index.ts)

This layer gives the UI a stable API if repository details evolve.

---

## 9. Main Data Flows

### Authentication flow

#### Google login

1. The client obtains a Google token.
2. A thunk dispatches `authenticateUser`.
3. The user use case calls `UserApiRepository.authUser`.
4. The backend returns a Campus user plus JWT.
5. The auth slice stores `token`, `selected`, and `isAuthenticated`.

Relevant files:

- [auth.thunk.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/store/slices/authSlice/auth.thunk.ts)
- [auth.slice.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/store/slices/authSlice/auth.slice.ts)
- [userApiRepository.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/infrastructure/repositories/userApiRepository.ts)

#### Session restoration

1. Persisted token is loaded from storage.
2. `App.tsx` dispatches `authenticateMe`.
3. `/users/me` returns the full user with role and assigned subjects.
4. The UI redirects to the correct dashboard.

### Admin flow

Admins manage users and subjects.

Example list flow:

1. [adminUsers.view.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/views/admin/adminUsers.view.tsx) dispatches `fetchListedUsers`.
2. The thunk calls the user use case.
3. The repository calls `/users/liData`.
4. The `users` slice stores the lightweight user list.
5. UI maps each item to a presentational card model.

Example detail flow:

1. [adminUserDetail.view.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/views/admin/adminUserDetail.view.tsx) dispatches `fetchSelectedUser(id_user)`.
2. The thunk calls the user use case.
3. The repository calls `/users/liData/:id_user`.
4. The selected user is stored in `users.selected`.
5. The detail page renders the aside and the subject list for that user.

The request loop previously present in this screen was removed by stabilizing these files:

- [adminUserDetail.view.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/views/admin/adminUserDetail.view.tsx)
- [adminUserDetailAside.organism.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/components/organisms/admin/adminUserDetailAside.organism.tsx)

### Teacher flow

Teachers mainly operate on subjects they created.

1. The authenticated user profile already includes `subjects`.
2. [teacherAssignedSubjects.organism.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/components/organisms/teacher/teacherAssignedSubjects.organism.tsx) renders those subjects from `auth.selected`.
3. Entering a subject detail page dispatches `fetchSubjectById`.
4. The selected subject includes nested units and chapters.
5. The teacher can create or modify units and chapters through modal-driven forms.

### Student flow

Students consume subjects assigned to them.

1. The authenticated user profile includes `enrolledSubjects`.
2. [studentSubjects.organism.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/components/organisms/student/studentSubjects.organism.tsx) renders that list.
3. [studentDetailSubject.view.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/views/student/studentDetailSubject.view.tsx) loads a subject by ID.
4. The screen traverses `subject -> createdUnits -> createdChapters`.

---

## 10. Role-Based UI

The frontend is organized by user role:

- `admin/*`
- `teacher/*`
- `student/*`
- `landing/*`

Examples:

- [adminHome.view.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/views/admin/adminHome.view.tsx)
- [teacherHome.view.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/views/teacher/teacherHome.view.tsx)
- [studentHome.view.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/views/student/studentHome.view.tsx)

---

## 11. Atomic Design

The component tree is structured as:

- `atoms`: basic UI primitives
- `molecules`: small compositions
- `organisms`: feature-level components
- `templates`: page layout containers

The dashboard shell is defined in:

- [dashboard.template.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/components/templates/dashboard.template.tsx)

---

## 12. Domain Interfaces

The domain contracts used across the app are defined under `src/BR/domain/entities`.

Important interfaces:

- [user.interface.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/domain/entities/user.interface.ts)
- [subject.interface.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/domain/entities/subject.interface.ts)
- [unit.interface.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/domain/entities/unit.interface.ts)
- [chapter.interface.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/domain/entities/chapter.interface.ts)
- [role.interface.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/domain/entities/role.interface.ts)
- [grade.interface.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/domain/entities/grade.interface.ts)

These interfaces are now closer to the backend DTOs than before.

---

## 13. Commands

### Setup

```bash
cd client-campus
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Preview

```bash
npm run preview
```

### Type check

```bash
cmd /c npx tsc --noEmit
```

---

## 14. Environment Variables

Create a `.env` file inside `client-campus/`.

```env
VITE_API_URL=http://localhost:3000/api/
VITE_GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
```

`VITE_GOOGLE_OAUTH_CLIENT_ID` is required because [main.tsx](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/main.tsx) initializes `GoogleOAuthProvider` with that value.

---

## 15. Implementation Notes

- Redux is the main execution coordinator.
- The app uses typed hooks from [UseStore.hook.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/hooks/UseStore.hook.ts).
- API repositories are thin wrappers over Axios and mostly map endpoint calls 1:1.
- Several screens rely on backend-enriched payloads instead of assembling nested relationships on the client.
- The frontend contracts are now more aligned with backend DTOs than before.
- The admin user detail request loop was fixed, but the `users` slice still uses a shared loading flag across operations and should be split later.
