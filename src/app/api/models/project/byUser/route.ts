import { ProjectUseCase } from "@/core/useCases/models/Project.useCase";
import { EntityResponseBuilder } from "@/core/utils/EntityResponseBuilder";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<Response> => {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const { projects, investments } = await ProjectUseCase.findAllByUserId(userId);

  return NextResponse.json(
    {
      projects:    projects.map((project) => EntityResponseBuilder.extractData(project)),
      investments: investments.map((investment) => EntityResponseBuilder.extractData(investment))
    },
    { status: 200 }
  );
};
