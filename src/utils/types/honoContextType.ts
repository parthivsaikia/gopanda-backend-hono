import { User, Session } from "prisma/generated/prisma";
declare module "hono" {
  interface ContextVariableMap {
    user: Omit<User, "password">;
    session: Session;
  }
}
