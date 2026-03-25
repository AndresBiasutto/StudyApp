# AGENTS.md: Guidelines for Agent Contributions

## Introduction
This file is a guide for agents (or automated intelligence) working in this repository. It contains essential commands, code style guidelines, and best practices for maintaining both projects of the Campus Virtual:
- `/api` - Backend (Node.js/Express)
- `/client-campus` - Frontend (React/Vite)

---

## 1. Project Structure

### Backend (`/api`)
```
api/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── middlewares/
│   └── index.ts
├── package.json
└── .env
```

### Frontend (`/client-campus`)
```
client-campus/
├── src/
│   ├── BR/                    # Clean Architecture
│   │   ├── application/       # Use Cases, Mappers, ViewModels
│   │   ├── domain/            # Entities, Repository Interfaces
│   │   └── infrastructure/   # API Repositories, httpClient
│   ├── UI/                    # Presentation Layer
│   │   ├── components/       # Atomic Design (atoms, molecules, organisms)
│   │   ├── views/             # Pages
│   │   └── interfaces/        # Props interfaces
│   ├── store/                 # Redux Toolkit
│   │   └── slices/
│   ├── routes/                # Routing
│   └── hooks/                 # Custom hooks
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 2. Commands

### 2.1 Backend Commands

#### Setup
```bash
cd api
npm install
```

#### Build
```bash
npm run build
```

#### Run Development Server
```bash
npm run dev
```

#### Testing
```bash
npm test
npm run test:watch
npx jest path/to/example.test.ts
npm run test:coverage
```

#### Lint
```bash
ts-node ./node_modules/.bin/eslint .
```

#### Type Check
```bash
npx tsc --noEmit
```

---

### 2.2 Frontend Commands

#### Setup
```bash
cd client-campus
npm install
```

#### Build
```bash
npm run build
```

#### Run Development Server
```bash
npm run dev
```

#### Lint
```bash
npm run lint
```

#### Preview Production Build
```bash
npm run preview
```

#### Type Check
```bash
npx tsc --noEmit
```

---

## 3. Code Style Guidelines

### 3.1 Backend Conventions

#### Imports
Group imports in this order:
1. Node.js core modules (e.g., `fs`, `path`)
2. External dependencies (e.g., `express`, `dotenv`)
3. Internal modules (e.g., `./routes`, `../services`)

#### Formatting
- Indentation: **2 spaces**
- Line length: **120 characters** max
- Single quotes for strings
- Trailing commas for multiline objects/arrays

#### TypeScript
- Avoid `any`, use `unknown` for untrusted inputs
- Prefer `interface` over `type`
- Define function return types explicitly

#### Naming
- Files: kebab-case (`user-repository.ts`)
- Variables: camelCase (`userProfile`)
- Classes: PascalCase (`UserService`)
- Constants: UPPER_SNAKE_CASE (`API_SECRET`)
- Interfaces: Prefix with `I` (`IUser`, `IService`)

#### Error Handling
- Use `try...catch` for async operations
- Throw custom errors for predictable issues

---

### 3.2 Frontend Conventions

#### Technology Stack
- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4
- Redux Toolkit
- React Router DOM 7

#### Atomic Design Structure
```
UI/components/
├── atoms/         # Button, Input, Icon, Label, etc.
├── molecules/     # Sidebar, Cards, Forms, Navigation
├── organisms/     # Complex components (Admin, Teacher, Forms)
└── templates/    # Layout templates (Dashboard)
```

#### Clean Architecture (BR/)
```
BR/
├── application/
│   ├── useCases/     # GetUsersUseCase, CreateUserUseCase, etc.
│   ├── mappers/      # Data transformers
│   └── viewModels/  # View-specific models
├── domain/
│   ├── entities/    # User, Subject, Role, Grade (interfaces)
│   └── services/    # Repository contracts (interfaces)
└── infrastructure/
    ├── repositories/ # API implementations (UserApiRepository, etc.)
    ├── services/    # httpClient (Axios with interceptors)
    └── errors/      # Error types
```

#### Naming Conventions
- Files: kebab-case (`button.atom.tsx`, `user-api-repository.ts`)
- Components: PascalCase (`Button`, `UserApiRepository`)
- Props Interfaces: Prefix with `I` (`IButtonProps`)
- Hooks: camelCase with `use` prefix (`useForm`, `useStore`)

#### Redux Patterns
- Slices in `src/store/slices/`
- Thunks alongside slices
- Use `createAsyncThunk` for async operations
- Typed `RootState` and `AppDispatch`

#### HttpClient
- Located in `src/BR/infrastructure/services/httpClient.ts`
- Uses Axios with interceptors for:
  - Auto token injection from Redux store
  - 401 error handling (auto logout)
- Base URL from environment variable `VITE_API_URL`

---

## 4. Environment Variables

### Backend
```plaintext
DB_NAME=campus
DB_USER=postgres
DB_PASS=1234
PORT=3000
GOOGLE_CLIENT_ID=your-client-id
```

### Frontend
```plaintext
VITE_API_URL=http://localhost:3000/api/
```

---

## 5. Development Guidelines

### Backend Changes
1. Add routes in `src/routes/`
2. Implement logic in `src/controllers/` or `src/services/`
3. Add database queries in `src/repositories/`
4. Write tests in `src/tests/`

### Frontend Changes
1. **Domain Layer**: Add entities/interfaces in `src/BR/domain/entities/`
2. **Repository Interface**: Define contract in `src/BR/domain/services/`
3. **Repository Implementation**: Implement in `src/BR/infrastructure/repositories/`
4. **Use Case**: Add business logic in `src/BR/application/useCases/`
5. **Thunk**: Add async action in `src/store/slices/*/`
6. **Slice**: Add state management in `src/store/slices/*/`
7. **Component**: Add UI in `src/UI/components/` (follow Atomic Design)
8. **View**: Add page in `src/UI/views/`
9. **Route**: Add route in `src/UI/App.tsx`

### Additional Notes
- Adhere to the modular structure of both projects
- Maintain high test coverage
- Document new configuration or features
- Always use strict typing

---

## 6. Commit Message Guidelines

Follow this format:
```
[Type] Summary of changes (Max 50 characters)

Detailed explanation (if needed, wrap at 72 characters).

ISSUE: #123 (if applicable)
```

Common types: `feat`, `fix`, `test`, `refactor`, `docs`, `chore`

Example:
```
[fix] Correct error handling in UserService

Fixed a bug where invalid emails were not properly caught.
ISSUE: #45
```

---

## 7. General Reminders
- Always keep dependencies up-to-date
- Run type checking before submitting changes
- Keep the project clean and maintainable for agents and humans alike

---

With this guide, agents should be able to contribute effectively and maintain high-quality standards for both the `/api` backend and `/client-campus` frontend of the Campus Virtual project.
