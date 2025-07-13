import { z } from "zod";

import { baseModelZodAttributes } from "./baseModelZodAttributes";

const zodSchema = z.object(baseModelZodAttributes);

/**
 * Base entity class that holds all common model attributes (`id`, `createdAt`, etc.).
 */
export abstract class BaseEntity {
  public static MODEL_NAME: string = "BaseEntity"; // must be overridden in child classes

  constructor(protected readonly _data: z.infer<typeof zodSchema>) {
    this._data = _data;
  }

  get id(): string {
    return this._data.id;
  }
  get createdAt(): Date {
    return new Date(this._data.createdAt);
  }
}
