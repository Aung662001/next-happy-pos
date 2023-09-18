import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";
import { config } from "../../../config/config";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: config.nextAuthSecret,
  pages: {
    signIn: "/auth/signin",
  },
};
export default NextAuth(authOptions);
