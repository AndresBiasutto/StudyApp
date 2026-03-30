# AGENTS.md: Guidelines for Agent Contributions

## Introduction

This file guides agents working in this repository.
The workspace contains two main projects:

- `/api` - Backend (Node.js/Express/TypeScript/Sequelize)
- `/client-campus` - Frontend (React/Vite/TypeScript)

Agents should prefer changes that improve consistency, safety, and maintainability over quick local fixes that increase coupling.

---

## 1. Project Structure

### Backend (`/api`)

```text
api/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   ├── contracts/       # Stable response DTOs and response mappers
│   ├── controllers/
│   ├── middlewares/     # auth, roles, validation, ownership, error handling
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   └── tests/
├── package.json
└── tsconfig.json
```

### Frontend (`/client-campus`)

```text
client-campus/
├── src/
│   ├── BR/                    # Domain/Application/Infrastructure
│   │   ├── application/
│   │   ├── domain/
│   │   └── infrastructure/
│   ├── UI/                    # Presentation layer
│   │   ├── components/
│   │   ├── views/
│   │   └── interfaces/
│   ├── hooks/
│   ├── routes/
│   ├── store/
│   │   └── slices/
│   └── assets/
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 2. Commands

### 2.1 Backend

#### Setup

```bash
cd api
npm install
```

#### Run development server

```bash
npm run dev
```

#### Build

```bash
npm run build
```

#### Type check

```bash
cmd /c npx tsc --noEmit
```

#### Testing

```bash
npm test
npm run test:watch
cmd /c npx jest path/to/example.test.ts
npm run test:coverage
```

### 2.2 Frontend

#### Setup

```bash
cd client-campus
npm install
```

#### Run development server

```bash
npm run dev
```

#### Build

```bash
npm run build
```

#### Lint

```bash
npm run lint
```

#### Type check

```bash
cmd /c npx tsc --noEmit
```

---

## 3. Architecture Rules

### 3.1 Backend

The effective backend flow is:

```text
Route -> Middleware -> Controller -> Service -> Repository -> Sequelize
```

Agents must preserve these rules:

- Controllers should stay thin.
- Services should own business orchestration.
- Repositories should focus on persistence and retrieval.
- HTTP response shapes should be defined through `src/contracts/`, not ad-hoc inside repositories.
- Request validation should happen before controllers whenever practical.
- Errors should go through centralized error handling.

#### Contracts

When changing API responses:

- Update `src/contracts/` first.
- Update the response mappers.
- Avoid returning raw Sequelize shapes directly to the frontend.

#### Validation

For new or modified routes:

- Prefer adding schema validation in `src/validators/`.
- Wire validation through `validation.middleware.ts`.
- Avoid manual field checks inside controllers unless there is a strong reason.

#### Errors

Use typed errors from `src/utils/errors.ts`:

- `ValidationError`
- `UnauthorizedError`
- `ForbiddenError`
- `NotFoundError`
- `ConflictError`

Do not scatter custom `res.status(...).json(...)` error branches across controllers unless unavoidable.

#### Authorization

Role checks alone are not enough for teacher write operations.
When a teacher mutates `subjects`, `units`, or `chapters`, verify resource ownership when applicable.

Ownership logic currently matters especially for:

- unit creation and updates
- chapter creation and updates

#### Database

- Associations are defined in `src/config/database.ts`.
- `sequelize.sync({ alter: true })` is still present, but agents should prefer changes that move the codebase toward explicit migrations in the future.

### 3.2 Frontend

The effective frontend flow is:

```text
View -> Thunk -> Use Case -> Repository -> httpClient -> Backend API
```

Agents should preserve these rules:

- UI components should not call Axios directly.
- Repositories should remain thin wrappers over the API.
- Domain interfaces should stay aligned with backend DTOs.
- Avoid introducing new hidden response-shape assumptions in components.

#### Redux

Current slices include:

- `auth`
- `users`
- `subjects`
- `units`
- `chapters`
- `roles`
- `grades`
- `ui`

Use `createAsyncThunk` for async flows.

Important caution:

- Some slices still use shared `loading` flags for multiple operations.
- Be careful not to trigger list requests from detail screens if the screen also depends on the same slice loading flag.
- When possible, prefer stable dependencies in `useEffect`, such as IDs or `.length`, rather than whole objects or arrays.

#### Admin User Detail

The admin user detail flow had a request loop bug caused by repeated fetches plus shared loading state.

When editing this area:

- Keep `adminUserDetail.view.tsx` limited to fetching the selected user by `id_user`.
- Do not trigger `fetchListedUsers()` from `adminUserDetailAside.organism.tsx`.
- Be careful with `useEffect` dependencies tied to `selected` objects from the store.

---

## 4. Code Style Guidelines

### Backend conventions

#### Imports

Group imports in this order:

1. Node.js core modules
2. External dependencies
3. Internal modules

#### Formatting

- Indentation: 2 spaces
- Line length: 120 characters max
- Single quotes for strings when editing existing files if style is already established
- Trailing commas for multiline objects and arrays

#### TypeScript

- Avoid `any` when practical
- Prefer explicit return types in service and utility layers
- Prefer `interface` for DTO-like structures where appropriate

#### Naming

- Files: kebab-case when creating new files
- Classes: PascalCase
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE

### Frontend conventions

#### Technology stack

- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4
- Redux Toolkit
- React Router DOM 7

#### Atomic Design

```text
UI/components/
├── atoms/
├── molecules/
├── organisms/
└── templates/
```

#### Clean Architecture (`BR/`)

```text
BR/
├── application/
├── domain/
└── infrastructure/
```

#### Naming

- Files: kebab-case where established
- Components: PascalCase
- Hooks: `use...`

---

## 5. Environment Variables

### Backend

```text
DB_NAME=campus
DB_USER=postgres
DB_PASS=1234
DB_HOST=localhost
PORT=3000
SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your-client-id
```

### Frontend

```text
VITE_API_URL=http://localhost:3000/api/
VITE_GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
```

---

## 6. Development Guidelines

### Backend changes

1. Define or update request validation if the endpoint shape changes.
2. Update `contracts/` if the response shape changes.
3. Keep controllers thin and move logic to services.
4. Keep repositories focused on persistence.
5. Preserve centralized error handling.
6. Add or update tests when behavior changes.

### Frontend changes

1. Update domain interfaces if backend DTOs change.
2. Keep API access in infrastructure repositories.
3. Keep orchestration in thunks and slices.
4. Avoid request loops caused by shared loading state.
5. Prefer stable `useEffect` dependencies.
6. Add or update view logic only after confirming the data contract.

### Additional notes

- Maintain strict typing.
- Document architectural changes in the relevant README files.
- Prefer consistency over clever local shortcuts.

---

## 7. Commit Message Guidelines

Follow this format:

```text
[Type] Summary of changes (Max 50 characters)

Detailed explanation (if needed, wrap at 72 characters).

ISSUE: #123 (if applicable)
```

Common types:

- `feat`
- `fix`
- `test`
- `refactor`
- `docs`
- `chore`

---

## 8. General Reminders

- Run type checking before finishing substantive changes.
- Keep backend/frontend contracts synchronized.
- Favor explicit contracts, validation, and safe defaults.
- Do not reintroduce response-shape logic inside repositories when a contract mapper should own it.
- Do not rely only on role checks when ownership matters.

---

With this guide, agents should be able to contribute safely and keep the Campus Virtual codebase more stable over time.
