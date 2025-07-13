export class AuthCredentialsMismatchError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AuthCredentialsMismatchError";
  }
}
