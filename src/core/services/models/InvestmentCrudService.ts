import { Investment } from "@/core/entities/Investment.entity";
import { AppResponse } from "@/core/types/makeRequest.types";
import makeRequest from "@/core/utils/makeRequest";
import { HttpMethodType } from "@/presentation/enums/HttpMethodType";
import { ServiceParams } from "@/presentation/hooks/useService/types";

const BASE_API_URL = "/api/models/investment";

export default abstract class InvestmentCrudService {
  /**
   * @param id
   */
  public static async get(
    params?: ServiceParams
  ): Promise<AppResponse<Investment>> {
    const { id } = params!;

    return await makeRequest<Investment>(
      [BASE_API_URL, id].join("/"),
      HttpMethodType.GET
    );
  }

  /**
   * @param params { projectId, userId, amount }
   */
  public static async create(
    params?: ServiceParams
  ): Promise<AppResponse<Investment>> {
    const { projectId, userId, amount } = params!;

    return await makeRequest<Investment>(BASE_API_URL, HttpMethodType.POST, {
      projectId,
      userId,
      amount
    });
  }
}
