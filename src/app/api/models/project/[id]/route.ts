import { ProjectUseCase } from "@/core/useCases/authentication/models/Project.useCase";
import { EntityResponseBuilder } from "@/core/utils/EntityResponseBuilder";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _request: NextRequest,
  { params: pathParams }: { params: Promise<{ id: string }> }
): Promise<Response> => {
  const params = await pathParams;
  const project = await ProjectUseCase.findById(params.id);

  return NextResponse.json(EntityResponseBuilder.extractData(project), {
    status: 200,
  });
};
