import { Project } from "@/core/entities/Project.entity";
import { AppResponse } from "@/core/types/makeRequest.types";
import makeRequest from "@/core/utils/makeRequest";
import { HttpMethodType } from "@/presentation/enums/HttpMethodType";
import { ServiceParams } from "@/presentation/hooks/useService/types";

const BASE_API_URL = "/api/models/project";

export default abstract class ProjectCrudService {
  /**
   * @param params { }. Will fetch all projects.
   */
  public static async list(): Promise<AppResponse<Project[]>> {
    return await makeRequest<Project[]>(BASE_API_URL, HttpMethodType.GET);
  }

  public static async get(
    params?: ServiceParams
  ): Promise<AppResponse<Project>> {
    const { id } = params!;

    return await makeRequest<Project>(
      [BASE_API_URL, id].join("/"),
      HttpMethodType.GET
    );
  }
}
