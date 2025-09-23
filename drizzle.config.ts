import { config } from "dotenv";
config({ path: ".env" });
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./auth-schema.ts",
  dialect: "turso",
  dbCredentials: {
    authToken: process.env.TURSO_AUTH_TOKEN!,
    url: process.env.TURSO_URL!,
  },
});
