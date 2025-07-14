import { InvestmentUseCase } from "@/core/useCases/models/Investment.useCase";
import { EntityResponseBuilder } from "@/core/utils/EntityResponseBuilder";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (request: NextRequest): Promise<Response> => {
  const permittedParameters = z.object({
    projectId: z.string().trim().nonempty(),
    userId: z.string().trim().nonempty(),
    amount: z.number().min(1),
  });

  const params = permittedParameters.parse(await request.json());

  const investment = await InvestmentUseCase.create(
    params.projectId,
    params.userId,
    params.amount
  );

  return NextResponse.json(EntityResponseBuilder.extractData(investment), {
    status: 201,
  });
};
