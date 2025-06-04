# Arquitectura de KaizenCLI

   KaizenCLI sigue los principios de **Clean Architecture** para garantizar modularidad, extensibilidad y mantenibilidad.

   ## Estructura de Directorios

   - `src/cli/`: Interfaz de línea de comandos (`main.ts`).
   - `src/core/`: Lógica de negocio (`context.ts`, `plugin-loader.ts`).
   - `src/plugins/`: Extensiones (`kaizen-moodtracker`, etc.).
   - `docs/`: Documentación avanzada.

   ## Capas

   1. **Interfaz (CLI)**:
      - `main.ts`: Punto de entrada que procesa los argumentos y delega al núcleo.
   2. **Núcleo (Core)**:
      - `context.ts`: Gestiona comandos, persistencia y configuración.
      - `plugin-loader.ts`: Carga plugins dinámicamente.
   3. **Plugins**:
      - Módulos independientes que extienden la funcionalidad.
   4. **Persistencia**:
      - Actualmente usa `lowdb` con `db.json`.

   ## Flujo de Ejecución

   1. `main.ts` inicializa el contexto y carga plugins.
   2. Los plugins registran sus comandos en `context.ts`.
   3. `context.execute` ejecuta el comando solicitado.

   ## Mejoras Futuras

   - Implementar `StorageInterface` para soportar múltiples bases de datos.
   - Definir una API interna (`KaizenAPI`) para plugins.
