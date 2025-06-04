// src/cli/main.ts
import { loadPluginsFromRegistry } from '../core/plugin-loader';
import { context } from '../core/context';
import chalk from 'chalk';

async function showHelp() {
  console.log(chalk.bold('📘 KaizenCLI - Ayuda'));
  console.log('Uso: kz <modulo> <comando> [argumentos]');
  console.log('\nMódulos y comandos disponibles:');

  const modules = context.getAllModules();
  if (modules.length === 0) {
    console.log(chalk.yellow('⚠️ No hay módulos registrados.'));
    return;
  }

  for (const module of modules) {
    context.getHelpFor(module);
  }

  console.log('\nEjemplos:');
  console.log('  kz m add       # Registrar estado de ánimo (módulo moodtracker)');
  console.log('  kz m help      # Mostrar comandos del módulo moodtracker');
  console.log('\nPara más información sobre un módulo, usa: kz <modulo> help');
}

async function main() {
  try {
    await context.initDB();
    await loadPluginsFromRegistry();

    const [, , ...args] = process.argv;
    if (args.length === 0 || (args.length === 1 && args[0] === 'help')) {
      await showHelp();
      return;
    }
    if (args.length < 2) {
      console.log(chalk.red('❗ Error: Se requieren módulo y comando.'));
      await showHelp();
      return;
    }

    const [module, command, ...rest] = args;
    if (command === 'help') {
      context.getHelpFor(module);
      return;
    }

    await context.execute(module, command, rest);
  } catch (err) {
    console.error(chalk.red('❌ Error fatal:'), err.message);
    process.exit(1);
  }
}

main();
