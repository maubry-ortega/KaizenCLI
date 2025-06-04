# Guía para Contribuir a KaizenCLI

   ¡Gracias por tu interés en contribuir a KaizenCLI! Aquí tienes los pasos para colaborar:

   ## 🛠️ Configuración del Entorno

   1. Clona el repositorio y configura el entorno como se describe en [README.md](README.md).
   2. Instala las herramientas de desarrollo:
      ```bash
      npm install --save-dev eslint prettier
      ```
   3. Configura el linter y formateador:
      - Usa `.eslintrc.json` y `.prettierrc` proporcionados en el repositorio.

   ## 📝 Estándares de Código

   - Usa TypeScript para todo el código.
   - Sigue las convenciones de Clean Architecture (ver [ARCHITECTURE.md](docs/ARCHITECTURE.md)).
   - Nombres de funciones y variables en camelCase.
   - Documenta las funciones públicas con JSDoc.

   ## 🔌 Crear un Plugin

   Consulta la [Guía de Plugins](docs/PLUGINS.md) para crear tu propio plugin.

   ## 🐛 Reportar Bugs

   - Abre un issue en GitHub con:
     - Descripción del problema.
     - Pasos para reproducirlo.
     - Versión de KaizenCLI y entorno.

   ## 🚀 Proponer Nuevas Funcionalidades

   - Abre un issue con la etiqueta `enhancement`.
   - Describe la funcionalidad y su valor.

   ## 📚 Documentación

   - Actualiza los archivos en `docs/` si añades funcionalidades.
   - Mantén el [CHANGELOG.md](CHANGELOG.md) actualizado.
