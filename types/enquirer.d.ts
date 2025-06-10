declare module 'enquirer' {
  export class Input {
    constructor(opts: { name: string; message: string; initial?: string });
    run(): Promise<string>;
  }
}

