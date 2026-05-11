# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Campus Virtual - Plataforma educativa con autenticación, roles y exámenes generados por IA.

Monorepo con dos aplicaciones:
- `/api` - Backend (Node.js/Express/TypeScript/Sequelize/PostgreSQL)
- `/client-campus` - Frontend (React 19/Vite 7/TypeScript/Redux Toolkit/Tailwind CSS 4)

## Commands

### Backend (`/api`)

```bash
cd api
npm run dev           # Development server
npm run build         # Compile TypeScript
npm run typecheck     # Type check only
npm test              # Run Jest tests
npm run test:watch    # Watch mode
npm run test:coverage # Tests with coverage
npm run validate      # typecheck -> build -> test
```

Run single test:
```bash
npx jest path/to/example.test.ts
```

### Frontend (`/client-campus`)

```bash
cd client-campus
npm run dev           # Vite dev server
npm run build         # Production build
npm run typecheck     # TypeScript check
npm run lint          # ESLint
npm run validate      # typecheck -> lint -> build
```

## Architecture

### Backend Flow

```
Route -> Middleware -> Controller -> Service -> Repository -> Sequelize
```

- **Controllers**: Delgados, solo orquestan requests
- **Services**: Lógica de negocio y orquestación
- **Repositories**: Persistencia y retrieval
- **Contracts** (`src/contracts/`): DTOs de respuesta, no retornar shapes crudos de Sequelize
- **Validators** (`src/validators/`): Schemas de validación de entrada
- **Middlewares**: `auth`, `roles`, `validation`, `ownership`, `error-handler`

### Frontend Flow

```
View -> Thunk -> Use Case -> Repository -> httpClient -> Backend API
```

- **UI/**: Vistas y componentes (Atomic Design: atoms, molecules, organisms, templates)
- **store/**: Redux Toolkit slices y thunks
- **BR/domain/**: Interfaces y entidades de dominio
- **BR/application/**: Use cases y mappers
- **BR/infrastructure/**: Repositorios HTTP y cliente Axios

### Redux Slices

- `auth` - Sesión y autenticación (persistido: solo token)
- `users`, `subjects`, `units`, `chapters` - Entidades académicas
- `exam`, `studentExam` - Exámenes
- `grades`, `roles` - Administración
- `ui` - Modales y estado UI

## Key Architectural Rules

### Backend

1. **Contratos primero**: Si cambia la respuesta HTTP, actualizar `src/contracts/` y mappers
2. **Validación antes del controller**: Usar `validation.middleware.ts` con schemas en `src/validators/`
3. **Errores tipados**: Usar `ValidationError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `ConflictError` de `src/utils/errors.ts`
4. **Ownership en escrituras**: Para operaciones de docentes en `subjects`, `units`, `chapters`, verificar propiedad con middleware de ownership
5. **Autenticación dual**: Google y local/email deben retornar el mismo shape (`AuthResponseDto`)
6. **Cascadas explícitas**: `Subject -> Unit -> Chapter -> Exam` con `onDelete: CASCADE` en asociaciones

### Frontend

1. **Sin Axios directo en componentes**: Usar repositorios en `BR/infrastructure/repositories/`
2. **Flags de carga por operación**: Algunos slices usan `loading` compartido; evitar request loops en `useEffect` con dependencias inestables
3. **Auth unificado**: `auth.slice` es la única fuente de verdad para sesión
4. **Admin user detail bug conocido**: No llamar `fetchListedUsers()` desde `adminUserDetailAside.organism.tsx`; solo el detalle fetchea por `id_user`

## Environment Variables

### Backend (`.env`)

```bash
DATABASE_URL=           # O DB_NAME, DB_USER, DB_PASS, DB_HOST
SECRET=                 # JWT secret (requerido)
GOOGLE_CLIENT_ID=
OPENROUTER_API_KEY=     # Generación de exámenes IA
DB_SYNC_MODE=none       # 'none' (prod) o 'alter' (dev temporal)
DB_SSL_MODE=disable     # 'require' para Postgres administrado
PORT=3000
```

### Frontend (`.env`)

```bash
VITE_API_URL=http://localhost:3000/api/
VITE_GOOGLE_OAUTH_CLIENT_ID=
```

## API Endpoints Principales

### Auth
- `POST /api/users/authUser` - Login Google
- `POST /api/users/register` - Registro local + login
- `POST /api/users/login` - Login local
- `GET /api/users/me` - Restaurar sesión

### Exámenes
- `GET /api/ai/multiple-choice/:id_chapter` - Generar examen IA (docente)
- `GET /api/exams/chapter/:id_chapter` - Obtener preguntas (alumno)
- `POST /api/exam-results/chapter/:id_chapter` - Enviar respuestas (alumno)
- `GET /api/exam-results/chapter/:id_chapter/me` - Nota del alumno

## Error Contract

Backend retorna errores como:

```json
{
  "message": "string",    // Campo principal
  "error": "string",      // Compatibilidad
  "details": {}           // Opcional
}
```

El `httpClient.ts` del frontend convierte `message` a `Error` y hace logout automático en `401`.

## Pending Structural Items

1. **Migraciones explícitas**: Reemplazar `DB_SYNC_MODE=alter` por migraciones
2. **Tests frontend**: Agregar tests para rutas protegidas y pantallas críticas
3. **Tipado UI**: `ui.modalContent` con discriminated union

## CI/CD

GitHub Actions en `.github/workflows/ci.yml`:
- Trigger: `push`/`pull_request` en `main`/`master`
- Ejecuta `npm run validate` en ambos proyectos
