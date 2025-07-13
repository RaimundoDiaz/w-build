import { z } from "zod";

/**
 * Core attributes that are shared across all entities.
 */
export const baseModelZodAttributes = {
  id:        z.string().uuid(),
  createdAt: z.string().datetime()
};
