// # VolleyDevByMaubry [5/∞] La persistencia se forja en la sencillez del JSON.
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

export function createDB<T>(filePath: string): Low<T> {
  const adapter = new JSONFile<T>(filePath);
  // PASA defaultData vacío del tipo T:
  const defaultData = {} as T;
  return new Low<T>(adapter, defaultData);
}

