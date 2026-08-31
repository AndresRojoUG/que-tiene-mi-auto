# ¿Qué tiene mi auto? — Arquitectura V1

## Objetivo
V1 publicable sin IA: frontend, backend, persistencia, autenticación, diagnósticos guiados, información técnica, historial, responsive y base para monetización.

## Principios
- Separar presentación, lógica de diagnóstico y datos.
- Los diagnósticos deben ser configurables y reutilizables.
- Los datos técnicos pertenecen al vehículo/variante, no a componentes de UI.
- No almacenar secretos en el repositorio.
- Diseñar para agregar marcas, modelos, años, motores y transmisiones sin duplicar código.
- La información automotriz debe poder identificarse por fuente/estado de verificación cuando sea necesario.

## Capas propuestas
- UI: Next.js App Router, componentes reutilizables y responsive.
- Dominio: tipos y reglas de vehículos, problemas, preguntas, respuestas y resultados.
- Backend: Route Handlers/Server Actions según el caso.
- Persistencia: PostgreSQL mediante un ORM tipado.
- Auth: solución de sesiones segura, integrada con usuarios e historial.
- Datos técnicos: vehículos, fusibles, relevadores, OBD, mantenimiento y problemas frecuentes.

## Modelo conceptual
Marca -> Modelo -> Generación -> Variante/vehículo -> Sistemas técnicos

Problema -> Diagnóstico -> Pregunta -> Opción -> Regla de transición -> Resultado -> Comprobaciones -> Recursos técnicos

Usuario -> Vehículos guardados -> Sesiones de diagnóstico -> Respuestas -> Resultado

## Orden de construcción
1. Arquitectura/base de datos y dependencias.
2. Backend y autenticación.
3. Migración del catálogo actual de vehículos y diagnóstico No enciende.
4. UI y navegación.
5. Resto de diagnósticos.
6. Información técnica.
7. Historial y perfil.
8. SEO, rendimiento, seguridad y monetización preparada.
9. Pruebas y build de producción.
