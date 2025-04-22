import { type } from "arktype";
import { Context, Next } from "hono";
import { setCookie } from "hono/cookie";
import { hashPassword } from "~/actions/bcryptActions";
import { createUser, getUser } from "~/actions/userActions";
import { createSession, generateSessionToken } from "~/auth/session-api";
import { COOKIE_NAME } from "~/config/cookie-config";
import { Env, env } from "~/config/env-config";
import { UserInputUserDTO } from "~/utils/types/userTypes";

export const signup = async (c: Context, next: Next) => {
  const {
    name,
    username,
    password,
    state,
    country,
    mobileNumber,
    email,
    role,
  } = await c.req.json();
  const data = UserInputUserDTO({
    name,
    username,
    password,
    email,
    mobileNumber,
    state,
    country,
    role,
  });
  try {
    const existingUser = await getUser(username);
    if (existingUser) {
      return c.json({ error: "User already exists" }, 409);
    }
    if (data instanceof type.errors) {
      return c.json({ error: data.summary }, 500);
    }
    const passwordHash = await hashPassword(password);
    const user = await createUser({
      username,
      password: passwordHash,
      name,
      state,
      country,
      email,
      role,
      mobileNumber,
    });
    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    setCookie(c, COOKIE_NAME, token, {
      httpOnly: true,
      secure: env === Env.PROD,
      sameSite: "Lax",
      path: "/",
      expires: session.expiresAt,
    });
    return c.json({ success: true }, 201);
  } catch (error) {
    await next();
  }
};
