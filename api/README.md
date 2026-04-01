# Backend Documentation - Campus Virtual API

## 1. Overview

The backend is a REST API built with Node.js, Express, TypeScript, Sequelize, and PostgreSQL.
Its main responsibilities are:

- authentication and session restoration
- user and role management
- subject and enrollment management
- academic content hierarchy: `subject -> unit -> chapter -> media`

The current backend follows a layered architecture:

```text
Route -> Middleware -> Controller -> Service -> Repository -> Sequelize -> PostgreSQL
```

Cross-cutting concerns are now handled explicitly through middleware:

- JWT authentication
- role authorization
- request validation
- ownership authorization
- centralized error handling

---

## 2. Technology Stack

- Node.js
- Express 5
- TypeScript
- Sequelize
- PostgreSQL
- JSON Web Token (`jsonwebtoken`)
- Google Sign-In verification (`google-auth-library`)
- bcrypt
- Nodemailer

---

## 3. Project Structure

```text
api/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   ├── contracts/              # Stable response DTOs and response mappers
│   ├── controllers/            # HTTP layer
│   ├── middlewares/            # Auth, role auth, validation, ownership, errors
│   ├── models/                 # Sequelize model definitions
│   ├── repositories/           # Data access layer
│   ├── routes/
│   ├── services/              # Business orchestration
│   ├── utils/
│   ├── validators/            # Request validation schemas
│   └── tests/
├── package.json
└── tsconfig.json
```

Important notes:

- There is no `handlers/` layer in the current implementation.
- Business logic lives mainly in `services/`.
- Response contracts are centralized in `src/contracts/`.
- Request validation is centralized in `src/validators/` and `src/middlewares/validation.middleware.ts`.

---

## 4. Runtime Flow

### Request flow

```text
Client
  -> Express route
  -> auth middleware (optional)
  -> role middleware (optional)
  -> validation middleware (optional)
  -> ownership middleware (optional)
  -> controller
  -> service
  -> repository
  -> Sequelize
  -> PostgreSQL
  -> error handler
```

### Startup flow

1. `src/config/env.ts` loads and validates environment variables.
2. `initDb()` authenticates Sequelize.
3. Schema synchronization only runs if `DB_SYNC_MODE=alter` is set explicitly.
4. `app.ts` mounts middleware, routes, 404 handling, and the global error handler.

Relevant files:

- [app.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/app.ts)
- [server.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/server.ts)
- [database.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/config/database.ts)
- [initDb.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/config/initDb.ts)

---

## 5. Domain Model

The backend models an academic campus with these main relationships:

- `User belongsTo Role`
- `User hasMany Subject` as `createdSubjects`
- `User belongsToMany Subject` as `enrolledSubjects`
- `Subject belongsTo User` as `creator`
- `Subject belongsToMany User` as `students`
- `Subject belongsTo Grade`
- `Subject hasMany Unit` as `createdUnits`
- `Unit belongsTo Subject`
- `Unit hasMany Chapter` as `createdChapters`
- `Chapter belongsTo Unit`
- `Chapter hasMany Video`
- `Chapter hasMany Image`

This graph is defined centrally in [database.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/config/database.ts).

---

## 5.1 Architecture Flow Diagram (ASCII)

The following ASCII flow describes the backend architecture and how requests move through the project:

```text
                        CAMPUS VIRTUAL - BACKEND FLOW

  Client / Frontend
         |
         v
  +------------------+
  |  Express Routes  |
  +------------------+
         |
         v
  +------------------------------+
  | Middlewares                  |
  |------------------------------|
  | - authenticateJWT            |
  | - authorizeRoles             |
  | - validate(...)              |
  | - ownership checks           |
  | - asyncHandler               |
  +------------------------------+
         |
         v
  +------------------+
  |   Controllers    |
  +------------------+
         |
         v
  +------------------+
  |    Services      |
  |------------------|
  | business rules   |
  | response mapping |
  +------------------+
         |
         v
  +------------------+
  |  Repositories    |
  |------------------|
  | Sequelize access |
  +------------------+
         |
         v
  +------------------+
  | Sequelize Models |
  +------------------+
         |
         v
  +------------------+
  |   PostgreSQL     |
  +------------------+


  Cross-cutting backend support:

  +--------------------------+     +---------------------------+
  | validators/              |     | contracts/                |
  |--------------------------|     |---------------------------|
  | request schemas          |     | response DTOs             |
  | field rules              |     | response mappers          |
  +--------------------------+     +---------------------------+
                 \                           /
                  \                         /
                   \                       /
                    +---------------------+
                    | error-handler       |
                    | typed AppError tree |
                    +---------------------+
```

---

## 5.2 Database Diagram (ASCII)

The following ASCII diagram represents the current database structure as defined by Sequelize models and associations:

```text
+-------------------+         +-------------------+
|       Role        |         |       Grade       |
|-------------------|         |-------------------|
| PK id_role        |         | PK id_grade       |
| name              |         | name              |
+---------+---------+         +---------+---------+
          |                             |
          | 1                           | 1
          |                             |
          | N                           | N
          v                             v
+-------------------+         +-------------------+
|       User        |         |      Subject      |
|-------------------|         |-------------------|
| PK id_user        |<------->| PK id_subject     |
| name              |   M:N   | name              |
| last_name         | Subject | description       |
| description       |Students | imageUrl          |
| e_mail (unique)   |         | FK id_user        |
| contact_number    |         | FK id_grade       |
| image             |         +---------+---------+
| FK id_role        |                   |
+---------+---------+                   | 1
          |                             |
          | 1                           | N
          |                             v
          |                   +-------------------+
          |                   |       Unit        |
          |                   |-------------------|
          |                   | PK id_unit        |
          |                   | name              |
          |                   | description       |
          |                   | order             |
          |                   | imageUrl          |
          |                   | FK id_subject     |
          |                   +---------+---------+
          |                             |
          |                             | 1
          |                             |
          |                             | N
          |                             v
          |                   +-------------------+
          |                   |      Chapter      |
          |                   |-------------------|
          |                   | PK id_chapter     |
          |                   | name              |
          |                   | description       |
          |                   | order             |
          |                   | FK id_unit        |
          |                   +----+---------+----+
          |                        |         |
          |                    1   |         |   1
          |                        |         |
          |                    N   v         v   N
          |                 +-----------+ +-----------+
          |                 |   Video   | |   Image   |
          |                 |-----------| |-----------|
          |                 | PK id_video| | PK id_image|
          |                 | url       | | url       |
          |                 | FK id_chapter| FK id_chapter|
          |                 +-----------+ +-----------+
          |
          | Created subjects:
          +-------------------------------------------->
                       Subject.FK id_user -> User.id_user


+---------------------------+
|      SubjectStudents      |
|---------------------------|
| FK id_subject             |
| FK id_user                |
+---------------------------+
```

Notes:

- `SubjectStudents` is the join table for enrolled students.
- A `User` can create many `Subject` records through `Subject.id_user`.
- A `User` can also be enrolled in many subjects through `SubjectStudents`.

---

## 6. Contracts, Validation, and Errors

### Response contracts

HTTP responses are normalized through DTOs and mappers:

- [common.contract.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/contracts/common.contract.ts)
- [user.contract.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/contracts/user.contract.ts)
- [subject.contract.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/contracts/subject.contract.ts)
- [response.mapper.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/contracts/mappers/response.mapper.ts)

This prevents the frontend from depending directly on ad-hoc Sequelize response shapes.

### Validation

Requests are validated before entering controllers.

Current modules using explicit validation:

- users
- subjects
- units
- chapters

Relevant files:

- [validation.middleware.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/validation.middleware.ts)
- [user.validator.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/validators/user.validator.ts)
- [subject.validator.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/validators/subject.validator.ts)
- [unit.validator.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/validators/unit.validator.ts)
- [chapter.validator.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/validators/chapter.validator.ts)

### Error handling

The backend now uses typed errors and a centralized error handler:

- [errors.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/utils/errors.ts)
- [error-handler.middleware.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/error-handler.middleware.ts)
- [async-handler.middleware.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/async-handler.middleware.ts)

---

## 7. Authentication, Authorization, and Ownership

### Authentication flow

#### Email/password

1. Client sends credentials to `POST /api/users/login`.
2. The backend looks up the user by email.
3. Password is compared with bcrypt.
4. A JWT is signed with `id_user`.
5. The response includes normalized user data plus `token`.

#### Google Sign-In

1. Client sends Google ID token to `POST /api/users/authUser`.
2. The backend verifies the token with Google.
3. The repository finds or creates a local user.
4. The backend signs its own JWT for API access.

#### Session restoration

1. Client sends `Authorization: Bearer <token>` to `GET /api/users/me`.
2. `authenticateJWT` validates the token and extracts `id_user`.
3. The backend returns the normalized current user with role, created subjects, and enrolled subjects.

### Role authorization

1. `authenticateJWT` validates the token.
2. `authorizeRoles(...)` loads the role name from the database.
3. Access is granted only if the role matches the route requirements.

### Ownership authorization

Teacher write operations on units and chapters now validate ownership, not only role.

Examples:

- create unit: teacher must own the target `id_subject`
- create chapter: teacher must own the target `id_unit`
- update/delete unit: teacher must own the unit's parent subject
- update/delete chapter: teacher must own the chapter's parent unit and subject

Relevant file:

- [ownership.middleware.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/ownership.middleware.ts)

---

## 8. API Surface

All routes are mounted under `/api`.

### Users

| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| POST | `/users` | Yes | `admin` | Create user |
| POST | `/users/authUser` | No | - | Authenticate with Google |
| POST | `/users/register` | No | - | Register a local user |
| POST | `/users/login` | No | - | Login with email/password |
| GET | `/users/me` | Yes | any authenticated user | Restore current user |
| GET | `/users/verify?token=...` | No | - | Verify email token |
| GET | `/users/allteachers` | Yes | `admin` | List teachers |
| GET | `/users/allStudents` | Yes | `admin` | List students |
| GET | `/users/liData` | Yes | `admin` | Lightweight list of users |
| GET | `/users/liData/:id_user` | Yes | `admin` | Detailed user view |
| GET | `/users` | Yes | `admin` | List all users |
| PUT | `/users/updateRole/:id_user` | Yes | `admin` | Update role |
| DELETE | `/users/:id_user` | Yes | `admin` | Delete user |

### Subjects

| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| POST | `/subjects` | Yes | `admin` | Create subject |
| GET | `/subjects` | No | - | List subjects |
| GET | `/subjects/:id` | No | - | Get subject with units and chapters |
| PUT | `/subjects/:id` | Yes | `admin` | Update subject and student assignments |
| DELETE | `/subjects/:id` | Yes | `admin` | Delete subject |

### Units

| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| POST | `/units` | Yes | `teacher` + ownership | Create unit |
| GET | `/units` | No | - | List units |
| GET | `/units/:id` | No | - | Get unit |
| PUT | `/units/:id` | Yes | `teacher` + ownership | Update unit |
| DELETE | `/units/:id` | Yes | `teacher` + ownership | Delete unit |

### Chapters

| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| POST | `/chapters` | Yes | `teacher` + ownership | Create chapter |
| GET | `/chapters` | No | - | List chapters |
| GET | `/chapters/:id` | No | - | Get chapter |
| PUT | `/chapters/:id` | Yes | `teacher` + ownership | Update chapter |
| DELETE | `/chapters/:id` | Yes | `teacher` + ownership | Delete chapter |

### Roles

| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| GET | `/roles` | No | - | List available roles |

### Grades

| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| GET | `/grades` | No | - | List available grades |

---

## 9. Important Files by Responsibility

### HTTP and middleware

- [app.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/app.ts)
- [auth.middleware.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/auth.middleware.ts)
- [role.middleware.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/role.middleware.ts)
- [validation.middleware.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/validation.middleware.ts)
- [ownership.middleware.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/ownership.middleware.ts)
- [error-handler.middleware.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/error-handler.middleware.ts)

### User flow

- [user.route.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/routes/user.route.ts)
- [user.controller.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/controllers/user.controller.ts)
- [user.service.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/services/user.service.ts)
- [user.repository.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/repositories/user.repository.ts)

### Academic content flow

- [subject.route.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/routes/subject.route.ts)
- [subject.controller.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/controllers/subject.controller.ts)
- [subject.service.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/services/subject.service.ts)
- [subject.repository.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/repositories/subject.repository.ts)
- [unit.route.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/routes/unit.route.ts)
- [chapter.route.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/routes/chapter.route.ts)

---

## 10. Commands

### Setup

```bash
cd api
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

### Production

```bash
npm start
```

### Type check

```bash
cmd /c npx tsc --noEmit
```

---

## 11. Environment Variables

Create a `.env` file inside `api/`.

```env
DB_NAME=campus
DB_USER=postgres
DB_PASS=1234
DB_HOST=localhost
DB_PORT=5432
PORT=3000
APP_URL=http://localhost:3000
SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
DB_SYNC_MODE=none
```

Notes:

- `SECRET` is the canonical JWT secret. `JWT_SECRET` is only accepted as a temporary compatibility alias.
- `DB_SYNC_MODE=alter` is an explicit development-only escape hatch. The default is `none`.
- If `DB_SYNC_MODE=none`, the app authenticates against PostgreSQL but does not alter schema automatically.
- `APP_URL` is used to build verification links in emails.

---

## 12. Implementation Notes

- Sequelize models are loaded dynamically from `src/models`.
- The database no longer alters schema automatically at startup unless `DB_SYNC_MODE=alter` is set.
- The next step should be replacing that opt-in sync mode with explicit migrations.
- HTTP responses now go through explicit DTO mappers instead of ad-hoc shaping inside repositories.
- `users`, `subjects`, `units`, and `chapters` already use centralized validation and error handling.
- Teacher mutations on units and chapters are protected by ownership checks.
- Public read endpoints still exist for `subjects`, `units`, `chapters`, `roles`, and `grades`.

---

## 13. Testing

The repository contains unit and integration-oriented test files, especially around:

- auth middleware
- role middleware
- user controller
- user service
- crypto helpers

Examples:

- [auth.middleware.test.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/auth.middleware.test.ts)
- [role.middleware.test.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/role.middleware.test.ts)
- [user.controller.test.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/controllers/user.controller.test.ts)
- [user.service.test.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/services/user.service.test.ts)
- [user.test.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/tests/integration/user.test.ts)

Run tests according to the scripts available in the project setup.
