import { ProjectUseCase } from "@/core/useCases/models/Project.useCase";
import { EntityResponseBuilder } from "@/core/utils/EntityResponseBuilder";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_request: NextRequest): Promise<Response> => {
  const projects = await ProjectUseCase.findAll();

  return NextResponse.json(
    projects.map((project) => EntityResponseBuilder.extractData(project)),
    { status: 200 }
  );
};
