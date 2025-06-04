# Roadmap de KaizenCLI

   ## v0.1.0 - Base Funcional (Actual)
   - Plugin `kaizen-moodtracker` con `add` y `list`.
   - Persistencia básica con `lowdb`.
   - Compatibilidad con NuShell.

   ## v1.0.0 - Núcleo Completo
   - Plugin `kaizen-task` con soporte para tareas y hábitos (RF001-RF006).
   - Mejoras de UX (salidas coloreadas, RNF004).
   - Documentación completa.

   ## v1.1.0 - Modularidad y Scripts
   - Almacenamiento abstracto (`StorageInterface`, RNF005).
   - Soporte para scripts (`kz run script.json`).
   - Salidas tabuladas con `table`.

   ## v1.2.0 - Depuración y Pruebas
   - Modo de depuración (`--debug`).
   - Pruebas unitarias con `jest`.
   - Documentación avanzada para desarrolladores.

   ## v2.0.0 - Expansión a Plataforma
   - API interna para plugins (`KaizenAPI`).
   - Backend con API REST para web/móvil.
   - Preparación para comunidad y marketplace de plugins.
