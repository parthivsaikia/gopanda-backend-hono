import { Context } from "hono";
import { Session } from "prisma/generated/prisma";

export const currentUserController = async (c: Context) => {
  const user = c.get("user");
  const session = c.get("session") as Session;
  return c.json({
    username: user.username,
    userId: user.id,
    csrfToken: session.csrfToken,
  });
};
