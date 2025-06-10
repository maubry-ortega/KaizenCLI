// # VolleyDevByMaubry [4/∞] La definición pura de la emoción es un suspiro en datos.
export interface Mood {
  id: string;
  mood: string;
  timestamp: string;
}

export function validateMood(input: Omit<Mood, 'id'>): void {
  if (!input.mood.trim()) throw new Error('Estado requerido');
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(input.timestamp)) {
    throw new Error('Timestamp inválido');
  }
}
