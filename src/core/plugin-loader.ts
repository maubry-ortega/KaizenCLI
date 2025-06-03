import fs from 'fs'
import path from 'path'
import { context } from './context.js'

export async function loadPluginsFromRegistry() {
  const registry = JSON.parse(fs.readFileSync('plugins.json', 'utf-8'))

  for (const pluginName of registry.plugins) {
    const pluginPath = path.resolve(`src/plugins/${pluginName}/index.ts`)
    try {
      const plugin = await import(pluginPath)
      if (typeof plugin.register === 'function') {
        plugin.register(context)
      }
    } catch (err) {
      console.error(`⚠️ No se pudo cargar el plugin ${pluginName}:`, err.message)
    }
  }
}

