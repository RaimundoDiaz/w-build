import { z } from "zod";

import { BaseEntity } from "./common/BaseEntity";
import { baseModelZodAttributes } from "./common/baseModelZodAttributes";

const zodSchema = z.object({
  ...baseModelZodAttributes,
  email: z.string().email().toLowerCase(),
  encryptedPassword: z.string().nullable().default(null),
});

export class User extends BaseEntity {
  public static readonly MODEL_NAME = "User";

  constructor(protected readonly _data: z.infer<typeof zodSchema>) {
    super(_data);
    this._data = zodSchema.parse(_data);
  }

  get email(): string {
    return this._data.email;
  }
  get encryptedPassword(): string | null {
    return this._data.encryptedPassword;
  }
}
