// # VolleyDevByMaubry [3/5] Los módulos se alzan como pilares de una mente en evolución.
/**
 * Interface for a KaizenCLI command.
 */
export interface KaizenCommand {
  module: string;
  command: string;
  handler: (...args: string[]) => Promise<void>;
  description?: string;
}

/**
 * Interface for a Task.
 */
export interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
  status: 'pending' | 'completed';
  isHabit: boolean;
}

/**
 * Interface for a Mood.
 */
export interface Mood {
  id: string;
  mood: string;
  timestamp: string;
}
