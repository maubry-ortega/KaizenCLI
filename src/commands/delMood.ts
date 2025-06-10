// # VolleyDevByMaubry [5/∞] El desapego también se codifica.
import { context } from '../core/context.js';
import chalk from 'chalk';

export async function delMoodCmd(args: string[]): Promise<void> {
  const [id] = args;
  if (!id) throw new Error('ID requerido');
  await context.moods.delete(id);
  console.log(chalk.green(`✅ Estado ${id} eliminado`));
}

