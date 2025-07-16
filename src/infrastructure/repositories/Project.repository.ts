import { Investment } from "@/core/entities/Investment.entity";
import { Project } from "@/core/entities/Project.entity";
import { RecordNotFoundError } from "@/core/types/errors.types";
import db from "@/infrastructure/database/dbClient";
import { investmentSchema, projectSchema } from "@/infrastructure/database/schemas";
import { InvestmentsRepository } from "@/infrastructure/repositories/Investment.repository";
import { ProjectCreateParams } from "@/shared/types/project/types";
import { eq } from "drizzle-orm";
import _ from "lodash";

export abstract class ProjectsRepository {
  public static createProjectInstance(
    appProjectData: ProjectCreateParams
  ): Project {
    return new Project({
      id:        appProjectData.id,
      createdAt: appProjectData.createdAt.toISOString(),

      name:           appProjectData.name,
      description:    appProjectData.description ?? null,
      imageUrl:       appProjectData.imageUrl ?? null,
      location:       appProjectData.location,
      targetAmount:   appProjectData.targetAmount,
      currentAmount:  appProjectData.currentAmount,
      minInvestment:  appProjectData.minInvestment,
      expectedReturn: appProjectData.expectedReturn,
      investors:      appProjectData.investors,
      status:         appProjectData.status
    });
  }

  public static async exists(id: string): Promise<boolean> {
    return !_.isEmpty(
      await db
        .select()
        .from(projectSchema)
        .where(eq(projectSchema.id, id))
        .limit(1)
        .execute()
    );
  }

  /**
   * @raise RecordNotFoundError
   */
  public static async findById(id: string): Promise<Project> {
    const queryResult = await db
      .select()
      .from(projectSchema)
      .where(eq(projectSchema.id, id));

    if (_.isEmpty(queryResult)) {
      throw new RecordNotFoundError({ model: Project, queryArgs: { id } });
    }

    const dbRecord = _.first(queryResult)!;

    return this.createProjectInstance(dbRecord);
  }

  public static async findAllByUserId(userId: string): Promise<{ projects: Project[], investments: Investment[] }> {
    const queryResult = await db
      .select()
      .from(investmentSchema)
      .leftJoin(projectSchema, eq(investmentSchema.projectId, projectSchema.id))
      .where(eq(investmentSchema.userId, userId));

    return {
      projects: queryResult
        .map((dbRecord) => dbRecord.project)
        .filter((project): project is Project => project !== null)
        .map((project) => this.createProjectInstance(project)),
      investments: queryResult.map((dbRecord) => InvestmentsRepository.createInvestmentInstance(dbRecord.investment))
    };
  }

  /**
   * @raise RecordNotFoundError
   */
  public static async findAll(): Promise<Project[]> {
    const queryResult = await db.select().from(projectSchema);

    return queryResult.map((dbRecord) => this.createProjectInstance(dbRecord));
  }
}
