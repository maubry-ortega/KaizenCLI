import { loadPluginsFromRegistry } from '../core/plugin-loader'
import { context } from '../core/context'

async function main() {
  await loadPluginsFromRegistry()

  const [, , ...args] = process.argv
  if (args.length < 2) {
    console.log("❗ Usa: kz <modulo> <comando>")
    return
  }

  const [module, command, ...rest] = args
  context.execute(module, command, rest)
}

main()

