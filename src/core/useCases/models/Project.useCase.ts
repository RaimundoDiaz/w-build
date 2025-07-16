import { Investment } from "@/core/entities/Investment.entity";
import { Project } from "@/core/entities/Project.entity";
import { ProjectsRepository } from "@/infrastructure/repositories/Project.repository";

export abstract class ProjectUseCase {
  public static async findById(id: string): Promise<Project> {
    return await ProjectsRepository.findById(id);
  }

  public static async findAllByUserId(userId: string): Promise<{ projects: Project[], investments: Investment[] }> {
    return await ProjectsRepository.findAllByUserId(userId);
  }

  public static async findAll(): Promise<Project[]> {
    return await ProjectsRepository.findAll();
  }
}
