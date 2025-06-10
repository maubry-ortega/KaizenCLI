declare module 'cli-table3' {
  interface TableOptions {
    head?: string[];
    style?: Record<string, any>;
  }
  class Table {
    constructor(opts?: TableOptions);
    push(row: any[]): void;
    toString(): string;
  }
  export = Table;
}

