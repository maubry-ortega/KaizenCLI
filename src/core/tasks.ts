// # VolleyDevByMaubry [5/5] El flujo se completa, un eco de transformación en el código.
import chalk from 'chalk';
import { readFile } from 'fs/promises';
import { KaizenContext, Task } from './context';

/**
 * Adds a new task to the database.
 * @param this - KaizenContext instance.
 * @param task - Task to add.
 */
export async function addTask(this: KaizenContext, task: Omit<Task, 'id'>) {
  if (!task.name?.trim()) throw new Error('Nombre requerido');
  if (!['low', 'medium', 'high'].includes(task.priority)) throw new Error('Prioridad inválida');
  if (!['pending', 'completed'].includes(task.status)) throw new Error('Estado inválido');
  await this.getDB().read();
  const id = Math.random().toString(36).slice(2, 10);
  this.getDB().data.tasks.push({ id, ...task, isHabit: task.isHabit || false });
  await this.getDB().write();
}

/**
 * Gets tasks from the database.
 * @param this - KaizenContext instance.
 * @param filter - Optional filter.
 */
export async function getTasks(this: KaizenContext, filter?: Partial<Task>) {
  await this.getDB().read();
  return filter ? this.getDB().data.tasks.filter((t) => Object.entries(filter).every(([k, v]) => t[k] === v)) : this.getDB().data.tasks;
}

/**
 * Updates a task in the database.
 * @param this - KaizenContext instance.
 * @param id - Task ID.
 * @param updates - Updates to apply.
 */
export async function updateTask(this: KaizenContext, id: string, updates: Partial<Task>) {
  await this.getDB().read();
  const task = this.getDB().data.tasks.find((t) => t.id === id);
  if (!task) throw new Error(`Tarea ${id} no encontrada`);
  Object.assign(task, updates);
  await this.getDB().write();
}

/**
 * Deletes a task from the database.
 * @param this - KaizenContext instance.
 * @param id - Task ID.
 */
export async function deleteTask(this: KaizenContext, id: string) {
  await this.getDB().read();
  const idx = this.getDB().data.tasks.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error(`Tarea ${id} no encontrada`);
  this.getDB().data.tasks.splice(idx, 1);
  await this.getDB().write();
}

/**
 * Runs a script to add tasks.
 * @param this - KaizenContext instance.
 * @param scriptPath - Path to the script.
 * @param debug - Debug mode flag.
 */
export async function runScript(this: KaizenContext, scriptPath: string, debug = false) {
  if (!scriptPath) throw new Error('Ruta del script requerida');
  if (debug) console.log(`[DEBUG] Cargando script: ${scriptPath}`);
  const content = await readFile(scriptPath, 'utf-8');
  const script = JSON.parse(content);
  if (!script.tasks) throw new Error('Script debe contener "tasks"');
  for (const task of script.tasks) await addTask.call(this, task);
  console.log(chalk.green(`Script ${scriptPath} ejecutado`));
}
