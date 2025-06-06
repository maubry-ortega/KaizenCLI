// # VolleyDevByMaubry [2/5] Cada línea teje un hilo en la tela del crecimiento personal.
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import { KaizenCommand } from './types';
import { getAllModules, getAllCommands, registerCommand, execute, getHelpFor } from './commands';
import { runScript } from './tasks';

/**
 * Core context for KaizenCLI, managing database and commands.
 */
export class KaizenContext {
  private commands: KaizenCommand[] = [];
  private db: Low<{ tasks: any[]; moods: any[] }>;
  private dbInitialized = false;
  public config = { locale: 'es', theme: 'dark' };

  constructor() {
    const file = join(process.cwd(), 'db.json');
    this.db = new Low<{ tasks: any[]; moods: any[] }>(new JSONFile(file), { tasks: [], moods: [] });
  }

  /**
   * Initializes the database.
   */
  async initDB() {
    if (this.dbInitialized) return;
    await this.db.read().catch(() => {
      this.db.data = { tasks: [], moods: [] };
      this.db.write();
    });
    this.dbInitialized = true;
  }

  getDB() {
    return this.db;
  }

  getAllModules = getAllModules.bind(this);
  getAllCommands = getAllCommands.bind(this);
  registerCommand = registerCommand.bind(this);
  execute = (mod: string, cmd: string, args: string[], debug = false) => {
    console.log(`[DEBUG] Inside context.execute - Args: ${JSON.stringify(args)}`);
    return execute.call(this, mod, cmd, args, debug);
  };
  getHelpFor = getHelpFor.bind(this);
  runScript = runScript.bind(this);
}

export const context = new KaizenContext();
