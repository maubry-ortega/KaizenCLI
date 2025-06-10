// # VolleyDevByMaubry [2/∞] Los módulos se alzan como pilares de una mente en evolución.
import { Argv } from 'yargs';
import { addMoodCmd } from '../commands/addMood.js';
import { listMoodCmd } from '../commands/listMood.js';
import { delMoodCmd } from '../commands/delMood.js';

export function registerMoodCommands(yargs: Argv) {
  return yargs.command('m <cmd>', 'Comandos para estados de ánimo', (y) =>
    y
      .command('add', 'Registrar un estado', {}, async () => {
        await addMoodCmd([]);
      })
      .command('list', 'Listar estados', {}, async () => {
        await listMoodCmd();
      })
      .command(
        'del <id>',
        'Eliminar estado',
        (yargs) =>
          yargs.positional('id', {
            type: 'string',
            describe: 'ID del estado a eliminar',
            demandOption: true,
          }),
        async (argv) => {
          await delMoodCmd([argv.id as string]);
        }
      )
  );
}

