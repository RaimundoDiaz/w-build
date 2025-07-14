import { Investment } from "@/core/entities/Investment.entity";
import { RecordNotFoundError } from "@/core/types/errors.types";
import db from "@/infrastructure/database/dbClient";
import { investmentSchema } from "@/infrastructure/database/schemas";
import { InvestmentCreateParams } from "@/shared/types/investment/types";
import { eq } from "drizzle-orm";
import _ from "lodash";

export abstract class InvestmentsRepository {
  public static createInvestmentInstance(
    appInvestmentData: InvestmentCreateParams
  ): Investment {
    return new Investment({
      id: appInvestmentData.id,
      createdAt: appInvestmentData.createdAt.toISOString(),

      amount: appInvestmentData.amount,
      projectId: appInvestmentData.projectId,
      userId: appInvestmentData.userId,
    });
  }

  public static async exists(id: string): Promise<boolean> {
    return !_.isEmpty(
      await db
        .select()
        .from(investmentSchema)
        .where(eq(investmentSchema.id, id))
        .limit(1)
        .execute()
    );
  }

  /**
   * @raise RecordNotFoundError
   */
  public static async findById(id: string): Promise<Investment> {
    const queryResult = await db
      .select()
      .from(investmentSchema)
      .where(eq(investmentSchema.id, id));

    if (_.isEmpty(queryResult)) {
      throw new RecordNotFoundError({ model: Investment, queryArgs: { id } });
    }

    const dbRecord = _.first(queryResult)!;

    return this.createInvestmentInstance(dbRecord);
  }

  public static async create(
    projectId: string,
    userId: string,
    amount: number
  ): Promise<Investment> {
    const dbRecord = await db
      .insert(investmentSchema)
      .values({
        projectId,
        userId,
        amount,
      })
      .returning();

    return this.createInvestmentInstance(dbRecord[0]);
  }
}
