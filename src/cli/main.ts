// # VolleyDevByMaubry [1/5] El código nace como un susurro en la quietud del propósito.
import { loadPluginsFromRegistry } from '../core/plugin-loader';
import { context } from '../core/context';
import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * Displays the help message for KaizenCLI.
 * @returns {Promise<void>}
 */
async function showHelp() {
  console.log(chalk.bold('📘 KaizenCLI - Ayuda'));
  console.log('Uso: kz <mod> <cmd> [args]');
  console.log('\nMódulos y comandos disponibles:');
  const mods = context.getAllModules();
  if (mods.length === 0) {
    console.log(chalk.yellow('⚠️ Sin módulos registrados.'));
    return;
  }
  mods.forEach((mod) => context.getHelpFor(mod));
  console.log('\nEjemplos:');
  console.log('  kz m add    # Registrar estado');
  console.log('  kz m hlp    # Ayuda de módulo');
  console.log('\nMás info: kz <mod> hlp');
}

/**
 * Main entry point for the CLI.
 * @returns {Promise<void>}
 */
async function main() {
  try {
    await context.initDB();
    await loadPluginsFromRegistry();

    let rawArgs = process.argv.slice(2); // Captura todos los argumentos originales
    console.log(`[DEBUG] Raw args from process.argv: ${JSON.stringify(rawArgs)}`);

    // Si rawArgs tiene un solo elemento, descomponemos manualmente
    if (rawArgs.length === 1) {
      const [command] = rawArgs;
      rawArgs = command.split(' ').filter(arg => arg); // Divide el string en argumentos
      console.log(`[DEBUG] Split args: ${JSON.stringify(rawArgs)}`);
    }

    const argv = yargs(rawArgs)
      .usage('Uso: kz <mod> <cmd> [args]')
      .command('$0 <mod> <cmd> [args..]', 'Ejecuta un comando de KaizenCLI', (yargs) => {
        yargs
          .positional('mod', { describe: 'Módulo (e.g., m)', type: 'string', demandOption: true })
          .positional('cmd', { describe: 'Comando (e.g., add)', type: 'string', demandOption: true })
          .positional('args', { describe: 'Argumentos adicionales', type: 'string', array: true })
          .option('debug', { alias: 'd', type: 'boolean', description: 'Habilita modo de depuración', default: false });
      })
      .help()
      .parseSync();

    const { mod, cmd, args = [], debug } = argv;

    if (mod === 'hlp' && !cmd) {
      await showHelp();
      return;
    }

    if (debug) {
      console.log(`[DEBUG] Parsed by yargs - Mod: ${mod}, Cmd: ${cmd}, Args: ${JSON.stringify(args)}`);
    }

    if (cmd === 'hlp') {
      context.getHelpFor(mod);
      return;
    }
    if (mod === 'run') {
      if (!cmd) throw new Error('Ruta del script requerida');
      await context.runScript(cmd, debug);
      return;
    }

    if (args.length > 0) {
      if (debug) console.log(`[DEBUG] Procesando args: ${args.join(' ')}`);
    } else {
      args.push(''); // Asegura que haya al menos un argumento vacío
    }
    await context.execute(mod, cmd, args, debug);
  } catch (err) {
    console.error(chalk.red('❌ Error:'), (err as Error).message);
    process.exit(1);
  }
}

main();
