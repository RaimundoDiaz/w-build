import { AppResponse } from "@/core/types/makeRequest.types";
import makeRequest from "@/core/utils/makeRequest";
import { HttpMethodType } from "@/presentation/enums/HttpMethodType";
import { ServiceParams } from "@/presentation/hooks/useService/types";

const BASE_API_URL = "/api/auth/register";

export default abstract class RegisterService {
  /**
   * @param params { email :string, plainPassword :string }
   */
  public static async register(
    params?: ServiceParams
  ): Promise<AppResponse<void>> {
    return await makeRequest<void>(BASE_API_URL, HttpMethodType.POST, params);
  }
}
