// # VolleyDevByMaubry [4/∞] El reflejo de tu día, convertido en tabla.
import { context } from '../core/context.js';
import Table from 'cli-table3';
import chalk from 'chalk';

export async function listMoodCmd(): Promise<void> {
  const moods = await context.moods.getAll();
  if (!moods.length) {
    console.log(chalk.yellow('⚠️ No hay estados registrados.'));
    return;
  }

  const table = new Table({ head: ['ID', 'Fecha', 'Estado'] });
  for (const mood of moods) {
    const date = new Date(mood.timestamp).toLocaleString('es-ES');
    table.push([mood.id, date, mood.mood]);
  }

  console.log(chalk.blue('📋 Historial de estados:\n'));
  console.log(table.toString());
}

