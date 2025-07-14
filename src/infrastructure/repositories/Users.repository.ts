import { User } from "@/core/entities/User.entity";
import { RecordNotFoundError } from "@/core/types/errors.types";
import db from "@/infrastructure/database/dbClient";
import { userSchema } from "@/infrastructure/database/schemas";
import { UserCreateParams } from "@/shared/types/users/types";
import { eq } from "drizzle-orm";
import _ from "lodash";

export abstract class UsersRepository {
  public static createUserInstance(appUserData: UserCreateParams): User {
    return new User({
      id: appUserData.id,
      createdAt: appUserData.createdAt.toISOString(),

      email: appUserData.email,
      encryptedPassword: appUserData.encryptedPassword ?? null,
    });
  }

  public static async exists(id: string): Promise<boolean> {
    return !_.isEmpty(
      await db
        .select()
        .from(userSchema)
        .where(eq(userSchema.id, id))
        .limit(1)
        .execute()
    );
  }

  /**
   * @raise RecordNotFoundError
   */
  public static async findById(id: string): Promise<User> {
    const queryResult = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.id, id));

    if (_.isEmpty(queryResult)) {
      throw new RecordNotFoundError({ model: User, queryArgs: { id } });
    }

    const dbRecord = _.first(queryResult)!;

    return this.createUserInstance(dbRecord);
  }

  /**
   * @raise RecordNotFoundError
   */
  public static async findByEmail(email: string): Promise<User> {
    const queryResult = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, email));

    if (_.isEmpty(queryResult)) {
      throw new RecordNotFoundError({ model: User, queryArgs: { email } });
    }

    const dbRecord = _.first(queryResult)!;

    return this.createUserInstance(dbRecord);
  }

  public static async delete(id: string): Promise<void> {
    await this.findById(id); // validate ID

    await db.delete(userSchema).where(eq(userSchema.id, id));
  }
}
