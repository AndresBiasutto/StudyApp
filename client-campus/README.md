# Campus Virtual Client

Frontend del campus virtual para admin, teacher y student.

## Stack

- React 19
- Vite 7
- TypeScript
- Redux Toolkit
- React Router DOM 7
- Tailwind CSS 4
- Axios

## Arquitectura

```text
View -> Thunk -> Use Case -> Repository -> httpClient -> Backend API
```

Capas principales:

- `src/UI`: vistas y componentes
- `src/store`: slices, thunks y store global
- `src/BR/domain`: interfaces y contratos
- `src/BR/application`: use cases y mappers
- `src/BR/infrastructure`: repositorios HTTP y cliente Axios

## Estructura

```text
client-campus/
├── src/
│   ├── BR/
│   ├── UI/
│   ├── hooks/
│   ├── routes/
│   └── store/
├── package.json
└── vite.config.ts
```

## Variables de entorno

Usa [`.env.example`](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/.env.example) como base.

Variables requeridas:

- `VITE_API_URL`
- `VITE_GOOGLE_OAUTH_CLIENT_ID`

## Scripts

```bash
cd client-campus
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
npm run validate
```

`npm run validate` ejecuta:

```text
typecheck -> lint -> build
```

## Estado actual de arquitectura

Mejoras ya aplicadas:

- Las interfaces de dominio quedaron alineadas con los DTOs reales del backend.
- `auth` solo maneja sesion y restauracion de usuario.
- El CRUD de usuarios vive en el slice `users`.
- `users` y `subjects` usan flags de carga por operacion en lugar de un unico `loading`.
- `updateSubject` ya no fuerza un refetch global innecesario.
- El flujo de error consume `message` como contrato principal del backend.

## Estado global

Slices activos:

- `ui`
- `auth`
- `users`
- `subjects`
- `units`
- `chapters`
- `roles`
- `grades`

Persistencia:

- Solo se persiste el token de `auth`.
- Al recargar, `App.tsx` dispara `authenticateMe()` para reconstruir el usuario autenticado.

## Cliente HTTP

El cliente Axios vive en [httpClient.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/BR/infrastructure/services/httpClient.ts).

Responsabilidades:

- usar `VITE_API_URL`
- adjuntar `Authorization: Bearer <token>`
- convertir errores backend a `Error`
- cerrar sesion automaticamente ante `401`

Contrato esperado de error:

```json
{
  "message": "string",
  "error": "string",
  "details": {}
}
```

## Flujos principales

### Autenticacion

1. Login Google o restauracion por token.
2. El thunk llama al use case.
3. El repositorio consume `/users/authUser` o `/users/me`.
4. `auth.slice` guarda `selected`, `token` e `isAuthenticated`.

Archivos clave:

- [auth.thunk.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/store/slices/authSlice/auth.thunk.ts)
- [auth.slice.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/store/slices/authSlice/auth.slice.ts)

### Administracion

- Usuarios: [adminUsers.view.tsx](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/views/admin/adminUsers.view.tsx)
- Detalle de usuario: [adminUserDetail.view.tsx](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/views/admin/adminUserDetail.view.tsx)
- Materias: [adminSubjects.view.tsx](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/views/admin/adminSubjects.view.tsx)

### Teacher

- Materias asignadas desde `auth.selected.subjects`
- Gestion de unidades y capitulos por modales y detalle de materia

### Student

- Materias inscritas desde `auth.selected.enrolledSubjects`
- Navegacion `subject -> createdUnits -> createdChapters`

## Rutas protegidas

La proteccion de rutas vive en:

- [protectedRoutes.tsx](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/routes/protectedRoutes.tsx)
- [redirectOnAuth.tsx](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/routes/redirectOnAuth.tsx)

La decision se basa en:

- `auth.isAuthenticated`
- `auth.selected.Role?.name`

## Componentes y UI

La capa visual sigue Atomic Design:

- `atoms`
- `molecules`
- `organisms`
- `templates`

El contenedor principal del dashboard esta en [dashboard.template.tsx](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/src/UI/components/templates/dashboard.template.tsx).

## Pendientes razonables

- Sumar tests de frontend para rutas protegidas, restauracion de sesion y pantallas criticas.
- Tipar mejor `ui.modalContent` con un discriminated union cuando se quiera endurecer mas esa capa.
