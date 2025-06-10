// # VolleyDevByMaubry [3/∞] La emoción se traduce en pulsaciones de teclas.
import enquirer from 'enquirer';
import chalk from 'chalk';
import { context } from '../core/context.js';
import { validateMood } from '../domain/mood.js';

export async function addMoodCmd(_: string[]): Promise<void> {
  const { Input } = enquirer as any;

  const mood = await new Input({ name: 'mood', message: '¿Cómo te sientes hoy?' }).run();
  const timestamp = await new Input({
    name: 'timestamp',
    message: 'Fecha (ISO)',
    initial: new Date().toISOString(),
  }).run();

  validateMood({ mood, timestamp });
  const id = await context.moods.add({ mood, timestamp });
  console.log(chalk.green(`✅ Estado registrado (ID: ${id})`));
}

