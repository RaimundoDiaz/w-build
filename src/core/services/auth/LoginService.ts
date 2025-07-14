import { SignInParams } from "@/shared/types/auth/login/types";
import _ from "lodash";
import { signIn, SignInResponse } from "next-auth/react";

export default abstract class LoginService {
  /**
   * @returns Whether the sign-in was successful.
   */
  public static async login(loginParams: SignInParams): Promise<boolean> {
    const nextAuthResult: SignInResponse = (await signIn(
      "email-and-password",
      loginParams
    ))!;

    if (!_.isNil(nextAuthResult.error)) {
      console.error(`Sign-in error: ${JSON.stringify(nextAuthResult.error)}`);
    }

    return nextAuthResult.ok;
  }
}
