import { NotImplementedError } from "@/shared/types/errors.types";

export abstract class BaseMocker {
  public static async generate(_args?: unknown): Promise<unknown> {
    throw new NotImplementedError("TODO: implement in child class.");
  }
}
