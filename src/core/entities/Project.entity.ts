import { z } from "zod";

import { BaseEntity } from "./common/BaseEntity";
import { baseModelZodAttributes } from "./common/baseModelZodAttributes";

const zodSchema = z.object({
  ...baseModelZodAttributes,
  name:           z.string().min(1),
  description:    z.string().nullable().default(null),
  imageUrl:       z.string().nullable().default(null),
  location:       z.string().min(1),
  targetAmount:   z.number().min(1),
  currentAmount:  z.number().min(1),
  minInvestment:  z.number().min(1),
  expectedReturn: z.string().min(1),
  investors:      z.number().min(1),
  status:         z.string().min(1)
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
  get location(): string {
    return this._data.location;
  }
  get targetAmount(): number {
    return this._data.targetAmount;
  }
  get currentAmount(): number {
    return this._data.currentAmount;
  }
  get minInvestment(): number {
    return this._data.minInvestment;
  }
  get expectedReturn(): string {
    return this._data.expectedReturn;
  }
  get investors(): number {
    return this._data.investors;
  }
  get status(): string {
    return this._data.status;
  }
}
