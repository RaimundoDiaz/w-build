import { AppResponse } from "@/core/types/makeRequest.types";
import _ from "lodash";
import { useEffect, useState } from "react";

import { BackendApiError } from "@/core/types/errors.types";
import {
  ServiceParams,
  UseServiceArrayResponse,
  UseServiceObjectResponse,
} from "./types";

type ServiceFunction<T> = (params?: ServiceParams) => Promise<AppResponse<T>>;

/**
 * @param serviceMethod Service method that encapsulates the API call.
 * @param isLazy If false, the method will be called immediately. Otherwise this function will
 * return a `callService` function that can be used to call the service.
 * @param params Request BODY params.
 */
const useService = <T>(
  serviceMethod: ServiceFunction<T>,
  isLazy: boolean = false,
  params?: ServiceParams
): UseServiceArrayResponse<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(!isLazy);
  const [responseError, setResponseError] = useState<BackendApiError | null>(
    null
  );
  const [data, setData] = useState<T | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  /**
   * @param responseErrorObject Can be undefined since an error could have happened before the response
   * was received.
   */
  const handleError = (responseErrorObject?: BackendApiError): void => {
    setIsLoading(false);
    setResponseError(responseErrorObject ?? null);
    setData(null);
    setSuccess(null);
  };

  const handleLoading = (): void => {
    setIsLoading(true);
    setResponseError(null);
    setData(null);
    setSuccess(null);
  };

  const handleSuccess = (responseData: T): void => {
    setData(responseData);
    setIsLoading(false);
    setSuccess(true);
  };

  const readResponseBody = async (
    body: ReadableStream<Uint8Array> | null
  ): Promise<string> => {
    if (!body) {
      return "";
    }

    const reader = body.getReader();
    const decoder = new TextDecoder();
    let result = "";
    let done = false;

    try {
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          result += decoder.decode(value, { stream: !done });
        }
      }
    } catch (error) {
      console.error("Error reading response body:", error);
      throw error;
    } finally {
      reader.releaseLock();
    }

    return result;
  };

  const callService = async (args?: ServiceParams): Promise<T | null> => {
    try {
      handleLoading();
      const response = await serviceMethod(args);

      if (_.inRange(response.status, 200, 300)) {
        const responseData = await response.json();
        handleSuccess(responseData);

        return responseData;
      } else {
        const responseBody = await readResponseBody(response.body);
        const errorResponseJson = responseBody ? JSON.parse(responseBody) : {};
        const responseErrorObject: BackendApiError = new BackendApiError({
          message: errorResponseJson.message,
          parentError: errorResponseJson.parentError,
        });

        handleError(responseErrorObject);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `Fatal error in useService: [${error.constructor.name}] ${error}`
        );
        handleError();
      } else throw error;
    }

    return null;
  };

  const callServiceIfReactive = (): void => {
    if (!isLazy) {
      callService(params);
    }
  };

  useEffect(callServiceIfReactive, []);

  const responseObject: UseServiceObjectResponse<T> = {
    isLoading,
    responseError,
    data,
    success,
    refetch: callService,
  };

  const response: UseServiceArrayResponse<T> = [responseObject, callService];

  return response;
};

export default useService;
