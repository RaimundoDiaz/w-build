import { Project } from "@/core/entities/Project.entity";
import { ProjectsRepository } from "@/infrastructure/repositories/Project.repository";

export abstract class ProjectUseCase {
  public static async findById(id: string): Promise<Project> {
    return await ProjectsRepository.findById(id);
  }

  public static async findAll(): Promise<Project[]> {
    return await ProjectsRepository.findAll();
  }
}
