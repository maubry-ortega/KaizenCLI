// src/core/context.ts
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import chalk from 'chalk';

type Task = {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
  status: 'pending' | 'completed';
  isHabit: boolean;
};

type Mood = {
  id: string;
  mood: string;
  timestamp: string; // ISO date
};

type CommandHandler = (...args: string[]) => void;

interface KaizenCommand {
  module: string;
  command: string;
  handler: CommandHandler;
  description?: string;
}

export class KaizenContext {
  private commands: KaizenCommand[] = [];
  private db: Low<{ tasks: Task[]; moods: Mood[] }>;
  private dbInitialized = false;
  public config = { locale: 'es', theme: 'dark' };

  constructor() {
    const file = join(process.cwd(), 'db.json');
    const adapter = new JSONFile<{ tasks: Task[]; moods: Mood[] }>(file);
    this.db = new Low<{ tasks: Task[]; moods: Mood[] }>(adapter, { tasks: [], moods: [] });
  }

  async initDB() {
    if (this.dbInitialized) return;
    await this.db.read();
    this.db.data ||= { tasks: [], moods: [] };
    await this.db.write();
    this.dbInitialized = true;
  }

  getAllModules() {
    return [...new Set(this.commands.map(cmd => cmd.module))];
  }

  getAllCommands() {
    return this.commands;
  }

  registerCommand(cmd: KaizenCommand) {
    const exists = this.commands.some(c => c.module === cmd.module && c.command === cmd.command);
    if (exists) {
      console.warn(chalk.yellow(`⚠️ Comando duplicado: ${cmd.module} ${cmd.command}`));
      return;
    }
    this.commands.push(cmd);
  }

async execute(module: string, command: string, args: string[]) {
  const found = this.commands.find(c => c.module === module && c.command === command);
  if (found) {
    try {
      await found.handler(...args);
    } catch (err) {
      console.error(chalk.red(`❌ Error al ejecutar ${module} ${command}:`), err.message);
    }
  } else {
    console.log(chalk.red(`❌ Comando no encontrado: ${module} ${command}`));
    console.log(chalk.gray(`Usa "kz ${module} help" para ver los comandos disponibles.`));
  }
}

  getHelpFor(module: string) {
    const commands = this.commands.filter(c => c.module === module);
    if (commands.length === 0) {
      console.log(chalk.yellow(`⚠️ Módulo no encontrado: ${module}`));
      return [];
    }
    console.log(chalk.blue(`📘 Comandos disponibles del módulo [${module}]:`));
    commands.forEach(cmd => {
      console.log(`  ${chalk.bold(cmd.command.padEnd(10))} → ${cmd.description || 'Sin descripción'}`);
    });
    return commands;
  }

  async addTask(task: Omit<Task, 'id'>) {
    if (!task.name?.trim()) throw new Error('El nombre de la tarea es obligatorio');
    await this.db.read();
    const id = Math.random().toString(36).slice(2, 10);
    this.db.data.tasks.push({ id, ...task });
    await this.db.write();
  }

  async getTasks(filter?: Partial<Task>) {
    await this.db.read();
    if (!filter) return this.db.data.tasks;
    return this.db.data.tasks.filter(task =>
      Object.entries(filter).every(([key, value]) => task[key] === value)
    );
  }

  async updateTask(id: string, updates: Partial<Task>) {
    await this.db.read();
    const task = this.db.data.tasks.find(t => t.id === id);
    if (!task) throw new Error(`Tarea con ID ${id} no encontrada`);
    Object.assign(task, updates);
    await this.db.write();
  }

  async deleteTask(id: string) {
    await this.db.read();
    const taskIndex = this.db.data.tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) throw new Error(`Tarea con ID ${id} no encontrada`);
    this.db.data.tasks.splice(taskIndex, 1);
    await this.db.write();
  }

  async exportToCSV() {
    await this.db.read();
    const headers = ['id', 'name', 'description', 'priority', 'date', 'status', 'isHabit'];
    const rows = this.db.data.tasks.map(task =>
      headers.map(h => `"${task[h] ?? ''}"`).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  }

  async addMood(mood: Omit<Mood, 'id'>) {
  if (!mood || !mood.mood) throw new Error('El estado de ánimo es obligatorio');
  await this.db.read();
  if (!this.db.data.moods) this.db.data.moods = []; // Inicializar si no existe
  const id = Math.random().toString(36).slice(2, 10);
  this.db.data.moods.push({ id, ...mood });
  await this.db.write();
}

  async getMoods(filter?: Partial<Mood>) {
    await this.db.read();
    if (!filter) return this.db.data.moods;
    return this.db.data.moods.filter(mood =>
      Object.entries(filter).every(([key, value]) => mood[key] === value)
    );
  }
}

export const context = new KaizenContext();
