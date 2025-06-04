# KaizenCLI

   Una CLI modular para gestionar hábitos, tareas y estados de ánimo, inspirada en la filosofía Kaizen de mejora continua.

   ## 🚀 Instalación

   1. Asegúrate de tener Node.js 20.x instalado:
      ```bash
      nvm install 20
      nvm use 20
      ```
   2. Clona el repositorio:
      ```bash
      git clone https://github.com/tu-usuario/kaizencli.git
      cd kaizencli
      ```
   3. Instala las dependencias:
      ```bash
      npm install
      ```
   4. Configura NuShell (versión 0.89+ requerida):
      - Añade el comando `kz` a `~/.config/nushell/modules/functions.nu`:
        ```nushell
        def kz [...args: string] {
          cd ~/KaizenCLI
          npm run dev -- ...$args
        }
        ```
      - Recarga la configuración:
        ```nushell
        source ~/.config/nushell/config.nu
        ```

   ## 🖥️ Uso Básico

   - Registrar un estado de ánimo:
     ```nushell
     kz m add
     ```
   - Ver historial emocional:
     ```nushell
     kz m list
     ```
   - Ver ayuda:
     ```nushell
     kz help
     ```

   ## 📖 Documentación

   - [Arquitectura del Proyecto](docs/ARCHITECTURE.md)
   - [Roadmap de Versiones](docs/ROADMAP.md)
   - [Guía para Crear Plugins](docs/PLUGINS.md)
   - [Contribuir al Proyecto](CONTRIBUTING.md)
   - [Historial de Cambios](CHANGELOG.md)

   ## 🌟 Visión

   KaizenCLI aspira a ser un ecosistema universal para la productividad, expandiéndose a interfaces web y móviles, con una comunidad activa que comparte plugins, rutinas y métodos de mejora continua.
