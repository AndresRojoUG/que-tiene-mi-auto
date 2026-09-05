# ¿Qué tiene mi auto?

Aplicación web bilingüe (español/inglés) para orientar diagnósticos automotrices, consultar información técnica segura y colaborar en comunidad por vehículo.

## Alcance actual

- Diagnóstico guiado para nueve síntomas frecuentes, con motor de reglas validado.
- Catálogo escalable de vehículos, diagnósticos y datos técnicos.
- Consulta de fusibles, relevadores, códigos OBD, mantenimiento e información técnica.
- Diagramas interactivos propios solo cuando las posiciones y asignaciones estén verificadas.
- Guías de aprendizaje y referencias externas cuando todavía no existe una asignación exacta.
- Cuenta con correo/contraseña, cierre por inactividad, historial sincronizable y comunidad moderada.
- Sugerencias contextualizadas con vehículo y apartado de origen.
- Panel de Administración protegido por rol para sugerencias, comunidad y reportes.

## Requisitos

- Node.js 20 o superior.
- Un proyecto de Supabase para autenticación y base de datos.

## Configuración local

1. Instala dependencias:

   ```powershell
   npm install
   ```

2. Copia `.env.example` como `.env.local` y completa únicamente las variables públicas de Supabase necesarias para el navegador. No subas `.env.local` a Git.

3. En el editor SQL de Supabase, ejecuta las migraciones de `supabase/migrations` **en orden por nombre**. Las migraciones aplican tablas, RLS, historial, sugerencias, comunidad y políticas de administración.

4. Inicia la aplicación:

   ```powershell
   npm run dev
   ```

   Abre `http://localhost:3000`.

## Validación antes de subir cambios

```powershell
npm run check
```

Ese comando ejecuta lint, TypeScript, validadores de diagnóstico/datos técnicos/vehículos, pruebas del motor de diagnóstico y compilación de producción.

## Datos técnicos y seguridad

Las asignaciones de fusibles, relevadores y posiciones físicas no se publican como definitivas hasta que una fuente confiable coincide con el vehículo, mercado, motor y equipamiento. Un diagrama genérico, una foto incompleta o un dato de otro vehículo no son suficientes.

Las referencias externas son para consulta y no sustituyen el manual ni una revisión profesional. No se debe reemplazar un fusible por otro de mayor amperaje ni trabajar con sistemas eléctricos sin seguir las precauciones del fabricante.

## Administración

La interfaz `/admin` no concede permisos por sí sola. La cuenta debe tener el rol correspondiente en `public.app_roles`, conforme a las políticas RLS incluidas en las migraciones. Nunca uses ni expongas una clave `SUPABASE_SERVICE_ROLE_KEY` en el navegador.

## Pruebas de lanzamiento

Sigue [docs/PRUEBAS_FINALES.md](docs/PRUEBAS_FINALES.md) antes de declarar una versión lista para usuarios.

## Flujo Git

```powershell
git status
npm run check
git add .
git commit -m "tipo: descripción breve"
git push origin v1-development
```

No incluyas `.env.local`, credenciales, capturas con datos personales ni claves en los commits.
