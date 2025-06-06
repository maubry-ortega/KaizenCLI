// # VolleyDevByMaubry [5/5] El flujo se completa, un eco de transformación en el código.
import { KaizenContext, Mood } from './context';

/**
 * Adds a new mood to the database.
 * @param this - KaizenContext instance.
 * @param mood - Mood to add.
 */
export async function addMood(this: KaizenContext, mood: Omit<Mood, 'id'>) {
  if (!mood.mood) throw new Error('Estado requerido');
  if (!mood.timestamp.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/)) throw new Error('Timestamp inválido');
  await this.getDB().read();
  this.getDB().data.moods ||= [];
  const id = Math.random().toString(36).slice(2, 10);
  this.getDB().data.moods.push({ id, ...mood });
  await this.getDB().write();
}

/**
 * Gets moods from the database.
 * @param this - KaizenContext instance.
 * @param filter - Optional filter.
 */
export async function getMoods(this: KaizenContext, filter?: Partial<Mood>) {
  await this.getDB().read();
  return filter ? this.getDB().data.moods.filter((m) => Object.entries(filter).every(([k, v]) => m[k] === v)) : this.getDB().data.moods;
}

/**
 * Deletes a mood from the database.
 * @param this - KaizenContext instance.
 * @param id - Mood ID.
 */
export async function deleteMood(this: KaizenContext, id: string) {
  if (id.length !== 8) throw new Error(`ID inválido: ${id} (debe tener 8 caracteres)`);
  if (!/^[a-z0-9]+$/.test(id)) throw new Error(`ID inválido: ${id} (solo letras y números)`);
  await this.getDB().read();
  const idx = this.getDB().data.moods.findIndex((m) => m.id === id);
  if (idx === -1) throw new Error(`Estado ${id} no encontrado`);
  this.getDB().data.moods.splice(idx, 1);
  await this.getDB().write();
}
