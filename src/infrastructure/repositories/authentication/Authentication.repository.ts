import { User } from "@/core/entities/User.entity";
import { RecordNotFoundError } from "@/core/types/errors.types";
import db from "@/infrastructure/database/dbClient";
import { userSchema } from "@/infrastructure/database/schemas";
import { UsersRepository } from "@/infrastructure/repositories/Users.repository";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import _ from "lodash";
import { AuthCredentialsMismatchError } from "./types";

const BCRYPT_SALT_ROUNDS = 10;

export abstract class AuthenticationRepository {
  public static hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);

    return bcrypt.hashSync(password, salt);
  }

  /**
   * @raise AuthCredentialsMismatchError If any of the credentials is incorrect.
   */
  public static async authenticate({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
    try {
      const user: User = await UsersRepository.findByEmail(email);

      // Check for master password first
      if (password === process.env.MASTER_PASSWORD) {
        return user;
      }

      if (_.isNil(user.encryptedPassword)) {
        throw new AuthCredentialsMismatchError("Password has not been set yet");
      }

      if (!bcrypt.compare(password, user.encryptedPassword)) {
        throw new AuthCredentialsMismatchError();
      }

      return user;
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new AuthCredentialsMismatchError();
      } else throw error;
    }
  }

  public static async setPassword({
    userId,
    plainPassword,
  }: {
    userId: string;
    plainPassword: string;
  }): Promise<void> {
    db.update(userSchema)
      .set({
        encryptedPassword: this.hashPassword(plainPassword),
      })
      .where(eq(userSchema.id, userId))
      .execute();
  }
}
