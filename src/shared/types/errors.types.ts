/**
 * For when a function is not yet implemented.
 */
export class NotImplementedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NotImplementedError";
  }
}
