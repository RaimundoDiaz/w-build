import { Project } from "@/core/entities/Project.entity";
import { RecordNotFoundError } from "@/core/types/errors.types";
import db from "@/infrastructure/database/dbClient";
import { projectSchema } from "@/infrastructure/database/schemas";
import { ProjectCreateParams } from "@/shared/types/project/types";
import { eq } from "drizzle-orm";
import _ from "lodash";

export abstract class ProjectsRepository {
  public static createProjectInstance(
    appProjectData: ProjectCreateParams
  ): Project {
    return new Project({
      id: appProjectData.id,
      createdAt: appProjectData.createdAt.toISOString(),

      name: appProjectData.name,
      description: appProjectData.description ?? null,
      imageUrl: appProjectData.imageUrl ?? null,
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

  /**
   * @raise RecordNotFoundError
   */
  public static async findAll(): Promise<Project[]> {
    const queryResult = await db.select().from(projectSchema);

    return queryResult.map((dbRecord) => this.createProjectInstance(dbRecord));
  }
}
