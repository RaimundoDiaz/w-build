import { AppResponse } from "@/core/types/makeRequest.types";
import { HttpMethodType } from "@/presentation/enums/HttpMethodType";

const makeRequest = async <T>(
  url: string,
  method: HttpMethodType,
  data?: unknown
): Promise<AppResponse<T>> => {
  const fetchBodyParams =
    data !== undefined
      ? {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
      : {};

  const response = await fetch(url, { method, ...fetchBodyParams });

  return new AppResponse<T>(response);
};

export default makeRequest;
