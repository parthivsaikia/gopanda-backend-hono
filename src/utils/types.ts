import type { User, Session } from "../../prisma/generated/prisma/index.js";

declare module "hono" {
  interface ContextVariableMap {
    user: Omit<User, "password">;
    session: Session;
  }
}
