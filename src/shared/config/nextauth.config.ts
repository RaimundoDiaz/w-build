import { User } from "@/core/entities/User.entity";
import { AuthenticationRepository } from "@/infrastructure/repositories/authentication/Authentication.repository";
import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const SESSION_MAX_AGE_DAYS: number = 30;

export default {
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt",
    maxAge:   SESSION_MAX_AGE_DAYS * 24 * 60 * 60
  },
  providers: [
    CredentialsProvider({
      id:          "email-and-password",
      credentials: {
        email:    { type: "email" },
        password: { type: "password" }
      },
      async authorize(credentials, _request) {
        const email: string = credentials!.email;
        const password: string = credentials!.password;

        try {
          const user: User = await AuthenticationRepository.authenticate({
            email,
            password
          });

          return {
            id:    user.id,
            email: user.email
          } as Session["user"];
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.stack);
          }
          throw error;
        }
      }
    })
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    jwt: ({ token, user }) => {

      if (user) {
        return { ...token, ...user };
      }

      return token;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    session: ({ session, token }) => {

      return {
        ...session,
        user: {
          ...session.user,
          id:    token.id,
          email: token.email
        } as Session["user"]
      };
    }
  }
} satisfies NextAuthOptions;
