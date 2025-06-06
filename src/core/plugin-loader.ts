// # VolleyDevByMaubry [3/5] Los módulos se alzan como pilares de una mente en evolución.
import fs from 'fs';
import path from 'path';
import { context } from './context';
import chalk from 'chalk';

interface PluginMetadata {
  name: string;
  prefix: string;
  commands: { name: string; description: string }[];
}

export async function loadPluginsFromRegistry() {
  const registryPath = path.resolve('plugins.json');
  if (!fs.existsSync(registryPath)) throw new Error('plugins.json no encontrado');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
  if (!Array.isArray(registry.plugins)) throw new Error('plugins debe ser un arreglo');

  for (const pluginName of registry.plugins) {
    const pluginDir = path.resolve(`src/plugins/${pluginName}`);
    const pluginPath = path.join(pluginDir, 'index.ts');
    const metadataPath = path.join(pluginDir, 'plugin.json');

    try {
      let metadata: PluginMetadata | null = null;
      if (fs.existsSync(metadataPath)) {
        metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
        console.log(chalk.gray(`📦 Metadatos de ${pluginName}`));
      }
      if (!fs.existsSync(pluginPath)) throw new Error(`index.ts no encontrado en ${pluginDir}`);
      const plugin = await import(pluginPath);
      if (typeof plugin.register !== 'function') throw new Error(`'register' no encontrado en ${pluginName}`);
      plugin.register(context);
      console.log(chalk.green(`✅ ${pluginName} cargado`));
    } catch (err) {
      console.error(chalk.red(`⚠️ Error en ${pluginName}:`), (err as Error).message);
    }
  }
}
