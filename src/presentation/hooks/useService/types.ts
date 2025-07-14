import { BackendApiError } from "@/app/api/errors.types";

export type ServiceParams = Record<string, unknown>

export type UseServiceObjectResponse<T> = {
  isLoading: boolean;
  responseError: BackendApiError | null,
  data: T | null;
  success: boolean | null;
  refetch: (args?: ServiceParams) => Promise<T | null>;
};

export type UseServiceArrayResponse<T> = [
  UseServiceObjectResponse<T>,
  callService: (args?: ServiceParams) => Promise<T | null>
]

export type UseServiceReturn<T> = UseServiceArrayResponse<T>;
