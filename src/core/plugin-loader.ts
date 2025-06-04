// src/core/plugin-loader.ts
import fs from 'fs';
import path from 'path';
import { context } from './context.js';
import chalk from 'chalk';

interface PluginMetadata {
  name: string;
  prefix: string;
  commands: Array<{ name: string; description: string }>;
}

export async function loadPluginsFromRegistry() {
  try {
    const registryPath = path.resolve('plugins.json');
    if (!fs.existsSync(registryPath)) {
      throw new Error('Archivo plugins.json no encontrado');
    }
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

    if (!Array.isArray(registry.plugins)) {
      throw new Error('plugins.json debe contener un arreglo "plugins"');
    }

    for (const pluginName of registry.plugins) {
      const pluginDir = path.resolve(`src/plugins/${pluginName}`);
      const pluginPath = path.join(pluginDir, 'index.ts');
      const metadataPath = path.join(pluginDir, 'plugin.json');

      try {
        // Cargar metadatos de plugin.json (si existe)
        let metadata: PluginMetadata | null = null;
        if (fs.existsSync(metadataPath)) {
          metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
          console.log(chalk.gray(`📦 Metadatos cargados para ${pluginName}`));
        }

        // Cargar el plugin dinámicamente
        if (!fs.existsSync(pluginPath)) {
          throw new Error(`Archivo index.ts no encontrado en ${pluginDir}`);
        }
        const plugin = await import(pluginPath);
        if (typeof plugin.register !== 'function') {
          throw new Error(`El plugin ${pluginName} no exporta una función 'register'`);
        }

        // Registrar el plugin
        plugin.register(context);
        console.log(chalk.green(`✅ Plugin ${pluginName} cargado`));
      } catch (err) {
        console.error(chalk.red(`⚠️ Error al cargar el plugin ${pluginName}:`), err.message);
      }
    }
  } catch (err) {
    console.error(chalk.red('❌ Error al cargar plugins:'), err.message);
    throw err; // Propagar el error para que main.ts lo maneje
  }
}

