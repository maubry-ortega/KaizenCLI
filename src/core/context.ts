type CommandHandler = (...args: string[]) => void

interface KaizenCommand {
  module: string
  command: string
  handler: CommandHandler
  description?: string
}

export class KaizenContext {
  private commands: KaizenCommand[] = []
  public config = { locale: 'es', theme: 'dark' }

  registerCommand(cmd: KaizenCommand) {
    this.commands.push(cmd)
  }

  execute(module: string, command: string, args: string[]) {
    const found = this.commands.find(c => c.module === module && c.command === command)
    if (found) found.handler(...args)
    else console.log(`❌ Comando no encontrado: ${module} ${command}`)
  }

  getHelpFor(module: string) {
    return this.commands.filter(c => c.module === module)
  }
}

export const context = new KaizenContext()

