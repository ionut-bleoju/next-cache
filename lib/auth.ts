import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../src/db";
import { user, session, account, verification } from "../auth-schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    encryptPassword: false,
  },
});
