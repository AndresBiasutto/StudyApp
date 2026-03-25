# Backend Documentation - Campus Virtual API

## 1. Overview

The Backend is built with **Node.js** and **Express**, providing a REST API for the Campus Virtual application. It uses **Sequelize** as ORM for database operations and **JWT** for authentication.

### Technology Stack
- Node.js + Express
- TypeScript
- Sequelize (ORM)
- PostgreSQL
- JWT (Authentication)
- bcrypt (Password hashing)
- Nodemailer (Emails)

---

## 2. Project Structure

```
api/
├── src/
│   ├── config/           # Database, app configuration
│   ├── controllers/      # Request handlers (thin layer)
│   ├── handlers/        # Business logic (validation, transformation)
│   ├── middlewares/     # Express middlewares (auth)
│   ├── models/         # Sequelize models
│   ├── repositories/   # Data access layer
│   │   ├── entities/   # TypeORM entities (if used)
│   │   └── mappers/    # Data mappers
│   ├── routes/         # Express routes
│   ├── services/       # Business services
│   ├── tests/         # Integration tests
│   ├── utils/         # Utilities (JWT, password, email)
│   ├── app.ts        # Express app
│   └── server.ts     # Entry point
├── package.json
└── .env
```

---

## 3. Architecture Pattern

### Flow of Request
```
Route → Controller → Handler → Service → Repository → Database
         ↓
      Middleware (auth)
```

### Layers
| Layer | Responsibility |
|-------|---------------|
| **Routes** | Define endpoints and HTTP methods |
| **Controllers** | Thin layer, extract params, call handlers |
| **Handlers** | Validate input, transform data, call services |
| **Services** | Business logic, orchestrate repositories |
| **Repositories** | Data access, database queries |
| **Models** | Database schema definitions |

---

## 4. Commands

### Setup
```bash
cd api
npm install
```

### Development
```bash
npm run dev    # Start with nodemon (auto-reload)
```

### Build
```bash
npm run build  # Compile TypeScript to dist/
```

### Production
```bash
npm start      # Run compiled JS from dist/
```

### Testing
```bash
npm test       # Run Jest tests
```

---

## 5. Environment Variables

Create a `.env` file in the `api/` root:

```plaintext
DB_NAME=campus
DB_USER=postgres
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=5432
PORT=3000
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

---

## 6. API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| PUT | `/api/users/updateRole/:id` | Update user role |
| POST | `/api/users/authUser` | Authenticate with Google |
| GET | `/api/users/me` | Get current user |

### Subjects
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/subjects` | Create subject |
| GET | `/api/subjects` | Get all subjects |
| GET | `/api/subjects/:id` | Get subject by ID |
| PUT | `/api/subjects/:id` | Update subject |
| DELETE | `/api/subjects/:id` | Delete subject |

### Grades
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/grades` | Get all grades |

### Roles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/roles` | Get all roles |

### Chapters
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/chapters/:id` | Get chapter by ID |
| POST | `/api/chapters` | Create chapter |
| PUT | `/api/chapters/:id` | Update chapter |
| DELETE | `/api/chapters/:id` | Delete chapter |

### Units
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/units/:id` | Get unit by ID |
| POST | `/api/units` | Create unit |
| PUT | `/api/units/:id` | Update unit |
| DELETE | `/api/units/:id` | Delete unit |

---

## 7. Authentication

### JWT Token
- Tokens are generated using `jsonwebtoken`
- Token is included in request headers: `Authorization: Bearer <token>`
- Middleware `auth.middleware.ts` validates token on protected routes

### Google OAuth
- Uses `google-auth-library` for Google Sign-In
- Endpoint: `POST /api/users/authUser`

---

## 8. Code Conventions

### Naming
- Files: kebab-case (`user.repository.ts`)
- Classes: PascalCase (`UserRepository`)
- Variables: camelCase (`userData`)
- Interfaces: Prefix with `I` (`IUser`)

### Imports Order
1. Node.js core modules
2. External dependencies
3. Internal modules

### Error Handling
- Use `try...catch` in handlers/services
- Return proper HTTP status codes
- Throw custom errors for validation

---

## 9. Database

### Models
- User
- Subject
- Grade
- Role
- Chapter
- Unit

### Relationships
- User has many Subjects (enrolled)
- Subject belongs to Grade
- Subject belongs to Role (teacher)
- Subject has many Units
- Unit has many Chapters

---

## 10. Testing

### Unit Tests
Located in same directory as implementation with `.test.ts` suffix:
- `user.controller.test.ts`
- `user.service.test.ts`
- `auth.middleware.test.ts`

### Integration Tests
Located in `src/tests/integration/`

### Run Tests
```bash
npm test
```
