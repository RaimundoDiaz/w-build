import { AuthenticationUseCase } from "@/core/useCases/auth/Authentication.useCase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (request: NextRequest): Promise<Response> => {
  const permittedParameters = z.object({
    email:         z.string().trim().nonempty().email(),
    plainPassword: z.string().trim().nonempty()
  });

  const params = permittedParameters.parse(await request.json());
  await AuthenticationUseCase.register({
    email:         params.email,
    plainPassword: params.plainPassword
  });

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 }
  );
};
