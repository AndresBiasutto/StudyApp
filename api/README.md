# Backend Documentation - Campus Virtual API

## 1. Overview

The backend is a REST API built with Node.js, Express, TypeScript, Sequelize, and PostgreSQL.
Its main responsibility is to manage:

- authentication and session restoration
- users and roles
- subjects and student enrollment
- academic content hierarchy: subject -> unit -> chapter -> media

The current backend follows a layered architecture:

```text
Route -> Controller -> Service -> Repository -> Sequelize Model -> PostgreSQL
```

Cross-cutting concerns such as authentication and authorization are handled through Express middlewares.

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
│   ├── app.ts                  # Express app and global middleware
│   ├── server.ts               # Startup script
│   ├── config/
│   │   ├── database.ts         # Sequelize connection and model associations
│   │   ├── initDb.ts           # DB connection and sync
│   │   └── health.controller.ts
│   ├── routes/                 # API routes
│   ├── controllers/            # HTTP layer
│   ├── services/               # Business orchestration
│   ├── repositories/           # Data access with Sequelize
│   │   ├── entities/
│   │   └── mappers/
│   ├── middlewares/            # Auth and role authorization
│   ├── models/                 # Sequelize model definitions
│   ├── utils/                  # JWT, hashing, email, helpers
│   └── tests/                  # Integration setup
├── package.json
└── tsconfig.json
```

Notes:

- There is no `handlers/` layer in the current implementation.
- Business logic is concentrated in `services/`.
- Repositories shape many of the response DTOs returned to the frontend.

---

## 4. Runtime Flow

### Request flow

```text
Client
  -> Express route
  -> auth middleware (optional)
  -> role middleware (optional)
  -> controller
  -> service
  -> repository
  -> Sequelize
  -> PostgreSQL
```

### Startup flow

1. `server.ts` loads environment variables.
2. `initDb()` authenticates Sequelize and runs `sequelize.sync({ alter: true })`.
3. `app.ts` mounts middleware and exposes all routes under `/api`.

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

This relationship graph is defined centrally in [database.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/config/database.ts).

---

## 6. Data Flows

### Authentication flow

#### Email/password

1. Client sends credentials to `POST /api/users/login`.
2. `user.controller.ts` looks up the user by email.
3. Password is compared with bcrypt.
4. `user.service.ts` signs a JWT containing `id_user`.
5. The response includes user profile data plus `token`.

#### Google Sign-In

1. Client sends Google ID token to `POST /api/users/authUser`.
2. `user.service.ts` verifies the token with Google.
3. The repository finds or creates a local user.
4. The backend signs its own JWT for API access.

#### Session restoration

1. Client sends `Authorization: Bearer <token>` to `GET /api/users/me`.
2. `authenticateJWT` validates the token and extracts `id_user`.
3. The repository returns the full user profile, role, created subjects, and enrolled subjects.

### Authorization flow

1. `authenticateJWT` validates the token.
2. `authorizeRoles(...)` loads the role name from the database.
3. Access is granted only if the user's role matches the route requirements.

### Academic content flow

The main academic read path is:

```text
Subject
  -> createdUnits
     -> createdChapters
```

`GET /api/subjects/:id` returns a subject enriched with:

- grade
- units
- chapters
- students

This endpoint is the main source for the teacher and student subject detail screens.

---

## 7. API Surface

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
| GET | `/subjects/:id` | No | - | Get subject with units/chapters |
| PUT | `/subjects/:id` | Yes | `admin` | Update subject and student assignments |
| DELETE | `/subjects/:id` | Yes | `admin` | Delete subject |

### Units

| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| POST | `/units` | Yes | `teacher` | Create unit |
| GET | `/units` | No | - | List units |
| GET | `/units/:id` | No | - | Get unit |
| PUT | `/units/:id` | Yes | `teacher` | Update unit |
| DELETE | `/units/:id` | Yes | `teacher` | Delete unit |

### Chapters

| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| POST | `/chapters` | Yes | `teacher` | Create chapter |
| GET | `/chapters` | No | - | List chapters |
| GET | `/chapters/:id` | No | - | Get chapter |
| PUT | `/chapters/:id` | Yes | `teacher` | Update chapter |
| DELETE | `/chapters/:id` | Yes | `teacher` | Delete chapter |

### Roles

| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| GET | `/roles` | No | - | List available roles |

### Grades

| Method | Endpoint | Auth | Roles | Description |
|--------|----------|------|-------|-------------|
| GET | `/grades` | No | - | List available grades |

### Media

The project includes media routes and repositories, intended for chapter-related image/video resources.

---

## 8. Important Files by Responsibility

### HTTP and middleware

- [app.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/app.ts)
- [auth.middleware.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/auth.middleware.ts)
- [role.middleware.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/role.middleware.ts)

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
- [unit.repository.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/repositories/unit.repository.ts)
- [chapter.repository.ts](C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/repositories/chapter.repository.ts)

---

## 9. Commands

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
npx tsc --noEmit
```

---

## 10. Environment Variables

Create a `.env` file inside `api/`.

```env
DB_NAME=campus
DB_USER=postgres
DB_PASS=1234
DB_HOST=localhost
PORT=3000
SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

Notes:

- The runtime code currently expects `SECRET`, not `JWT_SECRET`.
- `database.ts` contains a custom `dotenv.config({ path: "/custom/path/.env" })` call, but the server startup also calls `dotenv.config()`. The effective environment loading should be reviewed if deployment issues appear.

---

## 11. Implementation Notes

- Sequelize models are loaded dynamically from `src/models`.
- The database is synchronized with `sequelize.sync({ alter: true })` at startup.
- Repositories often return already-shaped payloads for frontend consumption instead of returning raw models.
- Some endpoints are public for reads (`subjects`, `units`, `chapters`, `roles`, `grades`), while mutations are role-protected.

---

## 12. Testing

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
