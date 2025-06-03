export function register(context) {
  context.registerCommand({
    module: 'm',
    command: 'add',
    description: 'Registrar estado de ánimo',
    handler: () => console.log("🙂 ¿Cómo te sientes hoy?")
  })

  context.registerCommand({
    module: 'm',
    command: 'list',
    description: 'Historial emocional',
    handler: () => console.log("📅 Mostrando historial del estado de ánimo")
  })
}

