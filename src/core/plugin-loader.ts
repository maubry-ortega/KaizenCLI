// # VolleyDevByMaubry [3/∞] Los módulos se alzan como pilares de una mente en evolución.
import { resolve, join } from 'path';
import { readFileSync, existsSync } from 'fs';
import { context } from './context';
import chalk from 'chalk';
import ora from 'ora';

interface PluginMetadata {
  name: string;
  prefix: string;
  commands: { name: string; description: string }[];
}

export async function loadPluginsFromRegistry(): Promise<void> {
  const spinner = ora('🔌 Cargando plugins...').start();
  const registryPath = resolve(process.cwd(), 'plugins.json');
  if (!existsSync(registryPath)) {
    spinner.fail('plugins.json no encontrado');
    throw new Error('plugins.json no encontrado');
  }

  const { plugins } = JSON.parse(readFileSync(registryPath, 'utf-8')) as { plugins: string[] };
  if (!Array.isArray(plugins)) {
    spinner.fail('"plugins" debe ser un arreglo');
    throw new Error('plugins debe ser un arreglo');
  }

  for (const pluginName of plugins) {
    try {
      spinner.text = `🔍 Cargando ${pluginName}`;
      const pluginPath = join(process.cwd(), 'dist/plugins', pluginName);
      const metaPath = join(pluginPath, 'plugin.json');

      if (existsSync(metaPath)) {
        const meta = JSON.parse(readFileSync(metaPath, 'utf-8')) as PluginMetadata;
        spinner.info(`⚙️ ${meta.name} (${meta.prefix})`);
      }

      const plugin = await import(join(pluginPath, 'index.js'));
      if (typeof plugin.register !== 'function') throw new Error('register() no encontrado');
      plugin.register(context);
      spinner.succeed(`Plugin ${pluginName} cargado`);
    } catch (err) {
      spinner.fail(`Error en ${pluginName}: ${(err as Error).message}`);
    }
  }
}
