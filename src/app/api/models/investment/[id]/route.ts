import { InvestmentUseCase } from "@/core/useCases/models/Investment.useCase";
import { EntityResponseBuilder } from "@/core/utils/EntityResponseBuilder";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _request: NextRequest,
  { params: pathParams }: { params: Promise<{ id: string }> }
): Promise<Response> => {
  const params = await pathParams;
  const investment = await InvestmentUseCase.findById(params.id);

  return NextResponse.json(EntityResponseBuilder.extractData(investment), {
    status: 200,
  });
};
