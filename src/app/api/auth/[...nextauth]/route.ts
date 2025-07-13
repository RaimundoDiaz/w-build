import { default as projectNextAuthConfig } from "@/shared/config/nextauth.config";
import NextAuth from "next-auth";

const handler = NextAuth(projectNextAuthConfig);

export { handler as GET, handler as POST };
