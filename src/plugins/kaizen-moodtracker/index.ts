// # VolleyDevByMaubry [4/5] La ejecución desvela el arte cifrado de la mejora continua.
import { KaizenContext } from '../../core/context';
import { addMood, getMoods, deleteMood } from '../../core/moods';
import inquirer from 'inquirer';
import chalk from 'chalk';
import dayjs from 'dayjs';

export function register(context: KaizenContext) {
  context.registerCommand({
    module: 'm',
    command: 'add',
    description: 'Registra estado',
    handler: async () => {
      const { mood } = await inquirer.prompt([
        { type: 'list', name: 'mood', message: '🙂 ¿Cómo te sientes?', choices: ['Feliz', 'Triste', 'Enojado', 'Cansado', 'Motivado'] },
      ]);
      await addMood.call(context, { mood, timestamp: dayjs().toISOString() });
      console.log(chalk.green('✅ Estado registrado'));
    },
  });

  context.registerCommand({
    module: 'm',
    command: 'list',
    description: 'Muestra historial',
    handler: async () => {
      const moods = await getMoods.call(context);
      if (moods.length === 0) {
        console.log(chalk.yellow('📭 Sin registros'));
        return;
      }
      console.log(chalk.blue('📋 Historial:'));
      moods.forEach((m) => console.log(`  ${chalk.bold(dayjs(m.timestamp).format('YYYY-MM-DD HH:mm'))} → ${m.mood} (ID: ${m.id})`));
    },
  });

  context.registerCommand({
    module: 'm',
    command: 'del',
    description: 'Elimina estado',
    handler: async (...args: string[]) => {
      console.log(`[DEBUG] Inside del handler - Args: ${JSON.stringify(args)}`);
      if (!args[0]) throw new Error('ID requerido');
      console.log(`[DEBUG] ID to delete: ${args[0]}`);
      await deleteMood.call(context, args[0]);
      console.log(chalk.green(`✅ Estado ${args[0]} eliminado`));
    },
  });
}
