import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { config } from "../../../config/config";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    }),
  ],
  secret: config.nextAuthSecret,
};
export default NextAuth(authOptions);
