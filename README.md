# W-Build

## Descripción

Este proyecto es una prueba de concepto que busca demostrar cómo estructurar una aplicación con un backend escalable y mantenible usando Next.js, Drizzle ORM y NextAuth para autenticación.

La estructura de carpetas puede parecer intimidante al principio al haber tantas, pero cada una cumple un rol específico para separar responsabilidades y facilitar el crecimiento del proyecto a futuro. El foco principal está en mostrar buenas prácticas de arquitectura backend, inspiradas en Clean Architecture, con entidades, repositorios, casos de uso y una capa de infraestructura bien definida.

El frontend es simple, con formularios básicos de registro y login, para priorizar la claridad y robustez del backend. Así, puedes ver cómo organizar un proyecto realista y escalable, sin sobrecargar la interfaz de usuario.

---

## Características principales

- **Backend escalable:** Arquitectura modular, separación de entidades, repositorios y casos de uso.
- **Autenticación:** Manejo de sesiones con NextAuth, login y registro con email y contraseña.
- **ORM moderno:** Uso de Drizzle ORM para migraciones y acceso a base de datos PostgreSQL.
- **Frontend minimalista:** Formularios simples de registro y login, navegación protegida por sesión.

---

## Cosas que se omitieron por optar a solo desarrollar el _happy path_

- El manejo de sesiones es defectuoso, no se guardan sesiones en cookies o localstorage
  - **Si se refresca o se cambia de ventana la sesion se pierde y hay que iniciar iniciar sesion nuevamente**
  - Es recomendable utilizar localStorage para manjear sesiones y poder recuperarla en caso de refrescar la pagina, pero para priorizar el _happy path_ se omitio.
- El frontend esta muy simple porque le dio prioridad a un backend escalable y mas robusto, ya que esta era la mayor falencia de Wbuild, decidi enfocarme en mostrar las posibildades de un backend mas escalable y mantenible.
- No se implementaron flujos de recuperación de contraseña, validación de email, ni manejo avanzado de errores en el frontend.
- No hay tests automatizados ni validaciones exhaustivas en los formularios.
- El backend está inspirado en la arquitectura Clean, para favorecer la separación de responsabilidades, la escalabilidad y la mantenibilidad del código. Sin embargo, no se implementó la arquitectura Clean de forma estricta en todos los módulos ni se desacoplaron completamente las dependencias externas (como la base de datos o Next.js), ya que el objetivo principal era mostrar un enfoque más ordenado y flexible, priorizando la claridad y la demostración de buenas prácticas sobre la implementación exhaustiva de todos los patrones.

---

## Notas técnicas

- **Stack:** Next.js 15, Drizzle ORM, NextAuth, PostgreSQL, TypeScript.
- **Estructura:**
  - `src/core`: entidades, tipos y casos de uso.
  - `src/infrastructure`: base de datos y repositorios.
  - `src/app`: rutas y páginas Next.js.
  - `src/presentation`: hooks y componentes de UI.
- **Linting y formateo:** ESLint (Flat Config), Prettier, Stylelint.

---

## Mejoras recomendadas

- Persistir la sesión en localStorage/cookies para evitar perderla al refrescar.
- Mejorar la UI y UX del frontend.
- Agregar validaciones y feedback más detallado en formularios.
- Implementar recuperación de contraseña y validación de email.
- Agregar tests automatizados.
