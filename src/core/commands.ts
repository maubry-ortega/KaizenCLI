// # VolleyDevByMaubry [4/5] La ejecución desvela el arte cifrado de la mejora continua.
import chalk from 'chalk';
import { KaizenCommand, KaizenContext } from './context';

/**
 * Gets all registered modules.
 * @param this - KaizenContext instance.
 */
export function getAllModules(this: KaizenContext) {
  return [...new Set(this['commands'].map((c) => c.module))];
}

/**
 * Gets all registered commands.
 * @param this - KaizenContext instance.
 */
export function getAllCommands(this: KaizenContext) {
  return this['commands'];
}

/**
 * Registers a new command.
 * @param this - KaizenContext instance.
 * @param cmd - Command to register.
 */
export function registerCommand(this: KaizenContext, cmd: KaizenCommand) {
  if (this['commands'].some((c) => c.module === cmd.module && c.command === cmd.command)) {
    console.warn(chalk.yellow(`⚠️ Cmd duplicado: ${cmd.module} ${cmd.command}`));
    return;
  }
  this['commands'].push(cmd);
}

/**
 * Executes a command.
 * @param this - KaizenContext instance.
 * @param mod - Module name.
 * @param cmd - Command name.
 * @param args - Command arguments.
 * @param debug - Debug mode flag.
 */
export async function execute(this: KaizenContext, mod: string, cmd: string, args: string[], debug = false) {
  const found = this['commands'].find((c) => c.module === mod && c.command === cmd);
  if (!found) {
    console.log(chalk.red(`❌ Cmd no encontrado: ${mod} ${cmd}`));
    console.log(chalk.gray(`Usa "kz ${mod} hlp"`));
    return;
  }
  if (debug) console.log(`[DEBUG] Ejecutando: ${mod} ${cmd} con args: ${args.join(' ')}`);
  console.log(`[DEBUG] Before handler call - Args: ${JSON.stringify(args)}`);
  await found.handler(...args);
}

/**
 * Displays help for a module.
 * @param this - KaizenContext instance.
 * @param mod - Module name.
 */
export function getHelpFor(this: KaizenContext, mod: string) {
  const cmds = this['commands'].filter((c) => c.module === mod);
  if (cmds.length === 0) {
    console.log(chalk.yellow(`⚠️ Mod no encontrado: ${mod}`));
    return [];
  }
  console.log(chalk.blue(`📘 Cmds de [${mod}]:`));
  cmds.forEach((c) => console.log(`  ${chalk.bold(c.command.padEnd(6))} → ${c.description || 'Sin desc'}`));
  return cmds;
}
