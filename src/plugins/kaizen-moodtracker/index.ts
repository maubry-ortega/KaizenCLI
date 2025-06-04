// src/plugins/kaizen-moodtracker/index.ts
import { KaizenContext } from '../../core/context';
import inquirer from 'inquirer';
import chalk from 'chalk';
import dayjs from 'dayjs';

export function register(context: KaizenContext) {
  context.registerCommand({
    module: 'm',
    command: 'add',
    description: 'Registrar estado de ánimo',
    handler: async () => {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'mood',
          message: '🙂 ¿Cómo te sientes hoy?',
          choices: ['Feliz', 'Triste', 'Enojado', 'Cansado', 'Motivado'],
        },
      ]);

      await context.addMood({
        mood: answers.mood,
        timestamp: dayjs().toISOString(),
      });
      console.log(chalk.green('✅ Estado de ánimo registrado'));
    },
  });

  context.registerCommand({
    module: 'm',
    command: 'list',
    description: 'Ver historial emocional',
    handler: async () => {
      const moods = await context.getMoods();
      if (moods.length === 0) {
        console.log(chalk.yellow('📭 No hay estados de ánimo registrados'));
        return;
      }
      console.log(chalk.blue('📋 Historial emocional:'));
      moods.forEach(mood => {
        const date = dayjs(mood.timestamp).format('YYYY-MM-DD HH:mm:ss');
        console.log(`  ${chalk.bold(date)} → ${mood.mood}`);
      });
    },
  });
}
