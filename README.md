# Campus Virtual

Monorepo con dos aplicaciones:

- [API](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/README.md)
- [Client](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/README.md)

## Estructura

```text
campus/
├── api/
├── client-campus/
└── .github/workflows/
```

## Quick Start

### 1. Instalar dependencias

```bash
cd api
npm install

cd ../client-campus
npm install
```

### 2. Configurar entorno

- Copiar [api/.env.example](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/api/.env.example) a `api/.env`
- Copiar [client-campus/.env.example](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/client-campus/.env.example) a `client-campus/.env`

### 3. Levantar aplicaciones

```bash
cd api
npm run dev
```

```bash
cd client-campus
npm run dev
```

## Rutina recomendada antes de merge

Backend:

```bash
cd api
npm run validate
```

Frontend:

```bash
cd client-campus
npm run validate
```

## CI

La pipeline vive en [ci.yml](/C:/Users/aquia/OneDrive/Escritorio/algoritmos/campus/.github/workflows/ci.yml) y ejecuta:

- `api`: `npm run validate`
- `client-campus`: `npm run validate`

Se dispara en `push` y `pull_request` sobre `main` y `master`.

## Estado actual

Puntos ya saneados en el proyecto:

- contratos backend/frontend alineados
- manejo de errores centralizado y tipado
- configuracion de entorno centralizada en backend
- flags de carga por operacion en slices criticos
- separacion de responsabilidades entre `auth` y `users`
- rutina local de validacion en ambos proyectos
- suite backend ejecutable

## Pendientes estructurales

- migraciones explicitas para reemplazar `DB_SYNC_MODE=alter`
- tests de frontend
- tipado mas estricto del estado UI para modales
