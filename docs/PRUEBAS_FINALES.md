# Pruebas finales de lanzamiento

Ejecuta este protocolo desde una copia limpia descargada de GitHub, con `.env.local` configurado y las migraciones de Supabase aplicadas. Marca cada punto solo si el resultado es correcto.

## 1. Instalación y compilación

- [ ] `npm install` termina sin errores.
- [ ] `npm run check` termina sin errores.
- [ ] `npm run dev` abre la aplicación en `http://localhost:3000`.
- [ ] La página inicial funciona a 320 px de ancho, en móvil y en escritorio.

## 2. Idioma y navegación

- [ ] El selector muestra Español y English con contraste legible.
- [ ] Al cambiar de idioma, encabezados, botones, diagnósticos, comunidad y estados vacíos cambian sin recargar.
- [ ] Los botones Volver llevan a una pantalla útil en cada apartado.
- [ ] El menú funciona en móvil y en escritorio.

## 3. Vehículo y diagnóstico

- [ ] Selecciona cada vehículo disponible y confirma que se conserva al volver a "Mi vehículo".
- [ ] Ejecuta al menos un recorrido completo en cada uno de los nueve síntomas.
- [ ] Al finalizar, se muestra resultado, precaución de seguridad y siguiente acción.
- [ ] El resultado aparece en Historial local.
- [ ] Un síntoma sin flujo guiado ofrece referencias técnicas y solicitud contextualizada, no un botón inactivo.

## 4. Cuenta e historial

- [ ] Crea una cuenta de prueba o inicia sesión con una existente.
- [ ] Confirma el correo desde el mismo equipo cuando sea posible.
- [ ] Sincroniza un diagnóstico y verifica que permanece después de recargar.
- [ ] Cierra sesión y confirma que Administración desaparece inmediatamente del menú.
- [ ] Tras 30 minutos sin actividad, verifica el cierre de sesión automático en un entorno de prueba.

## 5. Información técnica

- [ ] Fusibles muestra solo datos verificados o una guía/referencia claramente marcada.
- [ ] Nunca se presenta una posición, número o amperaje no verificado como dato definitivo.
- [ ] Relevadores, OBD, Mantenimiento e Información técnica muestran fuente compatible o botón para solicitarla.
- [ ] Las referencias externas abren en una pestaña nueva y advierten sobre mercado/configuración.
- [ ] Los diagramas interactivos, cuando existan, coinciden con la fuente verificada para esa configuración.

## 6. Comunidad y moderación

- [ ] Un visitante sin sesión no puede publicar, responder ni reportar contenido.
- [ ] Una cuenta puede enviar una pregunta o solución; queda pendiente de moderación.
- [ ] Una cuenta administradora puede publicar, ocultar o retirar contenido desde `/admin/comunidad`.
- [ ] Un reporte aparece en `/admin/reportes` y puede cambiar de estado.
- [ ] Una sugerencia contextualizada muestra vehículo y apartado dentro del mensaje en `/admin/sugerencias`.

## 7. Seguridad de datos

- [ ] Las políticas RLS están activas en Supabase para tablas de usuario, comunidad y sugerencias.
- [ ] `.env.local` no aparece en `git status` ni fue enviado a GitHub.
- [ ] No hay Service Role Key en el código del navegador ni en el repositorio.
- [ ] Las pruebas se realizaron con cuentas de prueba, no con información personal de usuarios reales.

## Criterio para declarar versión lista

La versión está lista para lanzamiento cuando todos los puntos aplicables pasan, las rutas principales se prueban en móvil y escritorio, y todo diagrama técnico visible está verificado para la configuración que se muestra. Los datos pendientes pueden seguir ampliándose sin bloquear el lanzamiento si se presentan únicamente como referencias o solicitudes, nunca como asignaciones exactas.
