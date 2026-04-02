# Campus Virtual API

Backend REST para usuarios, materias, unidades, capitulos y autenticacion del campus virtual.

## Stack

- Node.js
- Express 5
- TypeScript
- Sequelize
- PostgreSQL
- JWT
- Jest

## Arquitectura

```text
Route -> Middleware -> Controller -> Service -> Repository -> Sequelize
```

Reglas actuales:

- Los controladores se mantienen delgados.
- La logica de negocio vive en `src/services/`.
- Las respuestas HTTP se normalizan en `src/contracts/`.
- La validacion de entrada vive en `src/validators/`.
- Los errores pasan por `asyncHandler` y `errorHandler`.

## Estructura

```text
api/
├── src/
│   ├── config/
│   ├── contracts/
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── utils/
│   └── validators/
├── package.json
└── tsconfig.json
```

## Variables de entorno

Usa [`.env.example`](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/.env.example) como base.

Variables principales:

- `DB_NAME`
- `DB_USER`
- `DB_PASS`
- `DB_HOST`
- `DB_PORT`
- `PORT`
- `APP_URL`
- `SECRET`
- `GOOGLE_CLIENT_ID`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `DB_SYNC_MODE`

Notas:

- `SECRET` es la variable canonica para JWT. `JWT_SECRET` queda solo como alias temporal de compatibilidad.
- `DB_SYNC_MODE=none` es el valor recomendado.
- `DB_SYNC_MODE=alter` existe solo como escape hatch de desarrollo mientras no haya migraciones.

## Scripts

```bash
cd api
npm install
npm run dev
npm run build
npm run typecheck
npm test
npm run test:watch
npm run test:coverage
npm run validate
```

`npm run validate` ejecuta:

```text
typecheck -> build -> test
```

## Contratos y errores

Las respuestas se mapean desde:

- [response.mapper.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/contracts/mappers/response.mapper.ts)
- [user.contract.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/contracts/user.contract.ts)
- [subject.contract.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/contracts/subject.contract.ts)

El contrato de error expuesto al frontend es:

```json
{
  "message": "string",
  "error": "string",
  "details": {}
}
```

`message` es el campo principal. `error` se mantiene por compatibilidad durante la transicion.

Errores tipados disponibles en [errors.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/utils/errors.ts):

- `ValidationError`
- `UnauthorizedError`
- `ForbiddenError`
- `NotFoundError`
- `ConflictError`

## Seguridad

- `authenticateJWT` valida el token y adjunta `req.user`.
- `authorizeRoles(...)` consulta el rol real del usuario.
- El middleware de ownership protege escrituras de docentes sobre units y chapters.

Archivos clave:

- [auth.middleware.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/auth.middleware.ts)
- [role.middleware.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/role.middleware.ts)
- [ownership.middleware.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/ownership.middleware.ts)

## Base de datos

La configuracion se centraliza en [env.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/config/env.ts) y [database.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/config/database.ts).

Flujo de arranque:

1. Se cargan y validan variables de entorno.
2. Sequelize autentica la conexion.
3. El esquema solo se sincroniza si `DB_SYNC_MODE=alter`.
4. Express monta rutas y middlewares globales.

## Testing

La suite actual cubre:

- middlewares de auth y roles
- controller y service de usuarios
- rutas principales de usuarios
- utilidades JWT

Archivos representativos:

- [auth.middleware.test.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/auth.middleware.test.ts)
- [role.middleware.test.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/middlewares/role.middleware.test.ts)
- [user.controller.test.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/controllers/user.controller.test.ts)
- [user.service.test.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/services/user.service.test.ts)
- [user.test.ts](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/src/tests/integration/user.test.ts)

## Siguiente mejora estructural

El pendiente principal del backend ya no es tipado ni errores: es reemplazar `DB_SYNC_MODE=alter` por migraciones explicitas.
