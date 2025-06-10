// # VolleyDevByMaubry [1/∞] El código nace como un susurro en la quietud del propósito.
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { context } from '../core/context.js';
import { runScriptCmd } from '../commands/runScript.js';
import { registerMoodCommands } from './moodRoutes.js';

console.log(
  boxen(
    gradient.pastel.multiline(
      figlet.textSync('KaizenCLI', { horizontalLayout: 'full' })
    ),
    {
      padding: 1,
      borderStyle: 'double',
      dimBorder: true,
    }
  )
);

async function main() {
  await context.init();

  const cli = yargs(hideBin(process.argv))
    .scriptName('kz')
    .usage('Uso: kz <comando>')
    .command('run <path>', 'Ejecuta script', (y) =>
      y.positional('path', { type: 'string' }),
      async (argv) => {
        await runScriptCmd([argv.path as string]);
      }
    )
    .help('h')
    .alias('h', 'help')
    .strict()
    .demandCommand(1, 'Especifica un comando válido');

  registerMoodCommands(cli);
  cli.parse();
}

main().catch((e) => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});

