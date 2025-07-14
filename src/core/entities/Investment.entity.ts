import { z } from "zod";

import { BaseEntity } from "./common/BaseEntity";
import { baseModelZodAttributes } from "./common/baseModelZodAttributes";

const zodSchema = z.object({
  ...baseModelZodAttributes,
  amount: z.number().min(1),
  projectId: z.string().min(1),
  userId: z.string().min(1),
});

export class Investment extends BaseEntity {
  public static readonly MODEL_NAME = "Investment";

  constructor(protected readonly _data: z.infer<typeof zodSchema>) {
    super(_data);
    this._data = zodSchema.parse(_data);
  }

  get amount(): number {
    return this._data.amount;
  }
  get projectId(): string {
    return this._data.projectId;
  }
  get userId(): string {
    return this._data.userId;
  }
}
