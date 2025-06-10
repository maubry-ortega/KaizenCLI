// # VolleyDevByMaubry [2/∞] Cada línea teje un hilo en la tela del crecimiento personal.
import { createDB } from '../infrastructure/db.js';
import { MoodRepo } from '../infrastructure/mood-repo.js';

export class KaizenContext {
  public moods: MoodRepo;

  constructor() {
    const db = createDB<{ moods: import('../domain/mood.js').Mood[] }>('db.json');
    this.moods = new MoodRepo(db);
  }

  async init() {
    await this.moods.init();
  }
}

export const context = new KaizenContext();

