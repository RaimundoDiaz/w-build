import { z } from "zod";

import { BaseEntity } from "./common/BaseEntity";
import { baseModelZodAttributes } from "./common/baseModelZodAttributes";

const zodSchema = z.object({
  ...baseModelZodAttributes,
  name:        z.string().min(1),
  description: z.string().nullable().default(null),
  imageUrl:    z.string().nullable().default(null)
});

export class Project extends BaseEntity {
  public static readonly MODEL_NAME = "Project";

  constructor(protected readonly _data: z.infer<typeof zodSchema>) {
    super(_data);
    this._data = zodSchema.parse(_data);
  }

  get name(): string {
    return this._data.name;
  }
  get description(): string | null {
    return this._data.description;
  }
  get imageUrl(): string | null {
    return this._data.imageUrl;
  }
}
