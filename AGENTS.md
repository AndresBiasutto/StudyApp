# AGENTS.md: Guidelines for Agent Contributions

## Introduction
This file is a guide for agents (or automated intelligence) working in this repository. It contains essential commands, code style guidelines, and best practices for maintaining the `/api` backend of the Campus Virtual Project.

---

## 1. Build, Lint, and Test Commands

### Setup
Before starting: Ensure all dependencies are installed via npm:
```bash
npm install
```

### Build the Project
Compile the TypeScript code into JavaScript (output to `dist/`):
```bash
npm run build
```

### Run the Development Server
Start the development server with hot reload:
```bash
npm run dev
```

### Testing
Run all Jest tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run a single test file (replace `example.test.ts` with the file name):
```bash
npx jest path/to/example.test.ts
```

Check test coverage:
```bash
npm run test:coverage
```

### Code Lint
Lint the TypeScript code:
```bash
ts-node ./node_modules/.bin/eslint .
```

### Type Checking
Run the TypeScript compiler to ensure type safety without building:
```bash
npx tsc --noEmit
```

---

## 2. Code Style Guidelines

### 2.1 Imports
- Group imports in the following order:
  1. Node.js core modules (e.g., `fs`, `path`).
  2. External dependencies (e.g., `express`, `dotenv`).
  3. Internal modules (e.g., `./routes`, `../services`).
- Use absolute paths for imports where possible, utilizing `tsconfig.json` `paths` mapping.

### 2.2 Formatting
- Indentation: Use **2 spaces** per level.
- Line length: **120 characters** max.
- Always use **single quotes** for strings (`'single'`).
- End files with a single newline.
- Use trailing commas for multiline objects/arrays.

### 2.3 TypeScript Conventions
- Always use strict typing: Avoid using `any`.
- Prefer `interface` over `type` unless unions or advanced typing are required.
- Use `unknown` for untrusted inputs; validate and narrow types before use.
- Define function return types explicitly.
- Example of strict typing:
  ```typescript
  interface User {
      id: number;
      name: string;
  }
  const greet = (user: User): string => `Hello, ${user.name}`;
  ```

### 2.4 Naming Conventions
- **Files**: Use kebab-case for files (e.g., `user-repository.ts`).
- **Variables**: Use camelCase for variables (e.g., `userProfile`).
- **Classes**: Use PascalCase for classes (e.g., `UserService`).
- **Constants**: Use UPPER_SNAKE_CASE for constants (e.g., `API_SECRET`).
- **Interfaces**: Prefix with `I` (e.g., `IUser`, `IService`).

### 2.5 Error Handling
- Use `try...catch` for all asynchronous operations.
- Throw custom errors for predictable issues (e.g., validation).
  ```typescript
  throw new ValidationError('Email is invalid');
  ```
- Define an error-handling middleware for global error logging and client response.

---

## 3. Testing Practices
- Place tests alongside implementation in `src/tests/`.
- Use descriptive test names (e.g., `should_create_user_with_valid_data`).
- Use mocks for external services (e.g., database queries, email services).
- Avoid testing implementation details; focus on behavior and outcomes.

Example test structure:
```typescript
describe('User Service', () => {
    it('should create user with valid data', async () => {
        // Arrange
        const data = { name: 'John' };

        // Act
        const result = await UserService.create(data);

        // Assert
        expect(result).toHaveProperty('id');
    });
});
```

---

## 4. Development Best Practices

### Environment Variables
- Store sensitive data (like credentials) in `.env`.
- Example:
  ```plaintext
  DB_NAME=campus
  DB_USER=postgres
  DB_PASS=1234
  PORT=3000
  GOOGLE_CLIENT_ID=your-client-id
  ```

### Backend Changes
1. Add routes in `src/routes/`.
2. Implement logic in `src/controllers/` or `src/services/`.
3. Add database queries in `src/repositories/`.
4. Write tests in `src/tests/`.

### Additional Notes
- Adhere to the modular structure of the project.
- Maintain high test coverage.
- Document new configuration or features.

---

## 5. Commit Message Guidelines
- Follow this format for commit messages:
  ```
  [Type] Summary of changes (Max 50 characters)

  Detailed explanation (if needed, wrap at 72 characters).
  
  ISSUE: #123 (if applicable)
  ```
- Common types: `feat`, `fix`, `test`, `refactor`, `docs`.
- Example:
  ```
  [fix] Correct error handling in UserService

  Fixed a bug where invalid emails were not properly caught.
  ISSUE: #45
  ```

---

## 6. General Reminders
- Always keep dependencies up-to-date.
- Use `npm run test` before submitting changes.
- Keep the project clean and maintainable for agents and humans alike.

---

With this guide, agents should be able to contribute effectively and maintain high-quality standards for the `/api` backend of the Campus Virtual project.