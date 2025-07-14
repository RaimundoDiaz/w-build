import { AuthenticationRepository } from "@/infrastructure/repositories/authentication/Authentication.repository";

export abstract class AuthenticationUseCase {
  public static async register({
    email,
    plainPassword
  }: {
    email: string;
    plainPassword: string;
  }): Promise<void> {
    await AuthenticationRepository.register({ email, plainPassword });
  }
}
