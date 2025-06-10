// # VolleyDevByMaubry [6/∞] Persistencia con propósito.
import { nanoid } from 'nanoid';
import type { Low } from 'lowdb';
import type { Mood } from '../domain/mood.js';

export class MoodRepo {
  constructor(private db: Low<{ moods: Mood[] }>) {}

  async init() {
    await this.db.read();
    this.db.data ||= { moods: [] };
  }

  async add(mood: Omit<Mood, 'id'>): Promise<string> {
    const id = nanoid(8);
    this.db.data!.moods.push({ id, ...mood });
    await this.db.write();
    return id;
  }

  async getAll(): Promise<Mood[]> {
    await this.db.read();
    return this.db.data!.moods;
  }

  async delete(id: string): Promise<void> {
    await this.db.read();
    const index = this.db.data!.moods.findIndex((m) => m.id === id);
    if (index === -1) throw new Error(`Estado ${id} no encontrado`);
    this.db.data!.moods.splice(index, 1);
    await this.db.write();
  }
}

