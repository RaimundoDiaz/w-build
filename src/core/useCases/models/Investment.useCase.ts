import { Investment } from "@/core/entities/Investment.entity";
import { InvestmentsRepository } from "@/infrastructure/repositories/Investment.repository";

export abstract class InvestmentUseCase {
  public static async findById(id: string): Promise<Investment> {
    return await InvestmentsRepository.findById(id);
  }

  public static async create(
    projectId: string,
    userId: string,
    amount: number
  ): Promise<Investment> {
    return await InvestmentsRepository.create(projectId, userId, amount);
  }
}
