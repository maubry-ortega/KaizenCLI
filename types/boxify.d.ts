// src/types/boxify.d.ts
declare module 'boxify' {
  interface BoxifyOptions {
    padding?: number;
    margin?: number;
    border?: 'single' | 'double' | 'round' | 'classic';
    dimBorder?: boolean;
  }
  /**
   * Envuelve el texto en una caja.
   * @param text Texto a encuadrar.
   * @param options Opciones de estilo.
   */
  function boxify(text: string, options?: BoxifyOptions): string;
  export = boxify;
}

