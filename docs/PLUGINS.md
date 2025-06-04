# Guía para Crear Plugins en KaizenCLI

   Los plugins permiten extender KaizenCLI con nuevas funcionalidades.

   ## Estructura de un Plugin

   - **Carpeta**: `src/plugins/nombre-plugin/`.
   - **Archivos**:
     - `index.ts`: Lógica del plugin.
     - `plugin.json`: Metadatos (nombre, comandos).

   ## Ejemplo: Crear un Plugin

   1. Crea la carpeta:
      ```bash
      mkdir -p src/plugins/mi-plugin
      ```
   2. Crea `plugin.json`:
      ```json
      {
        "name": "mi-plugin",
        "prefix": "mp",
        "commands": [
          { "name": "hello", "description": "Saluda al usuario" }
        ]
      }
      ```
   3. Crea `index.ts`:
      ```typescript
      import { KaizenContext } from '../../core/context';

      export function register(context: KaizenContext) {
        context.registerCommand({
          module: 'mp',
          command: 'hello',
          description: 'Saluda al usuario',
          handler: () => {
            console.log('¡Hola, usuario!');
          },
        });
      }
      ```
   4. Registra el plugin en `plugins.json`:
      ```json
      {
        "plugins": ["kaizen-moodtracker", "mi-plugin"]
      }
      ```
   5. Prueba el plugin:
      ```nushell
      kz mp hello
      ```

   ## API Disponible

   - `context.registerCommand(cmd: KaizenCommand)`: Registra un nuevo comando.
   - `context.addMood(mood: Omit<Mood, 'id'>)`: Añade un estado de ánimo.
   - Más métodos serán añadidos en futuras versiones.
