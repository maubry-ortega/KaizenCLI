// # VolleyDevByMaubry [11/∞] La automatización es un poema de tareas repetidas.
import chalk from 'chalk';
import { context } from '../core/context';
import { readFile } from 'fs/promises';

export async function runScriptCmd(args: string[]): Promise<void> {
  const [path] = args;
  if (!path) throw new Error('Ruta de script requerida');

  const content = JSON.parse(await readFile(path, 'utf-8')) as { tasks?: any[]; moods?: any[] };
  if (content.moods) {
    for (const m of content.moods) {
      await context.moods.add(m);
    }
  }
  console.log(chalk.green(`✅ Script ejecutado: ${path}`));
}
