import { createMiddleware } from "hono/factory";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { COOKIE_NAME, DOMAIN } from "~/config/cookie-config";
import { validateSession } from "~/auth/session-api";
import { Env, env } from "~/config/env-config";

export const authMiddleware = createMiddleware(async (c, next) => {
  const token = getCookie(c, COOKIE_NAME);
  if (!token) {
    return c.json({ error: "Unauthorized" }, 403);
  }
  const { user, session } = await validateSession(token);
  if (!user || !session) {
    deleteCookie(c, COOKIE_NAME, {
      path: "/",
      secure: env === Env.PROD,
      domain: DOMAIN,
    });
    return c.json({ error: "Unauthorized" }, 403);
  }
  if (Date.now() > session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    setCookie(c, COOKIE_NAME, token, {
      path: "/",
      httpOnly: true,
      secure: env === Env.PROD,
      sameSite: "Lax",
      expires: session.expiresAt,
    });
  }
  c.set("user", user);
  c.set("session", session);
  await next();
});
