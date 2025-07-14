import { BaseEntity } from "@/core/entities/common/BaseEntity";

type ModelClass = typeof BaseEntity;

/**
 * For when a record is not found in the database.
 *
 * Intended to cause 4xx response.
 */
export class RecordNotFoundError extends Error {
  public readonly model: ModelClass;
  public readonly queryArgs: unknown;

  constructor({ model, queryArgs }: { model: ModelClass; queryArgs: unknown }) {
    super(
      `'${model.MODEL_NAME}' not found with params: ${JSON.stringify(
        queryArgs
      )}`
    );
    this.name = "RecordNotFoundError";
    this.model = model;
    this.queryArgs = queryArgs;
  }
}

/**
 * Overall error response wrapper for backend API NextJS routes.
 */
export class BackendApiError extends Error {
  public readonly parentError?: Error;

  constructor({
    message,
    parentError
  }: {
    message: string;
    parentError?: Error;
  }) {
    super(message);
    this.name = "BackendApiError";

    this.parentError = parentError;
  }

  public toJSON(): {
    name: string;
    message: string;
    parentError?: { name: string; message: string };
  } {
    return {
      name:        this.name,
      message:     this.message,
      parentError: this.parentError
        ? {
          name:    this.parentError.name,
          message: this.parentError.message
        }
        : undefined
    };
  }
}

/**
 * For when a request is unauthorized (e.g., invalid token).
 *
 * Intended to cause 4xx response.
 */
export class NotAuthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotAuthorizedError";
  }
}
