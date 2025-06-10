// # VolleyDevByMaubry [7/∞] Cada mensaje merece un pedestal de atención.
import boxify from 'boxify';

export function printBox(message: string): void {
  console.log(
    boxify(message, { padding: 1, border: 'round', dimBorder: true })
  );
}
