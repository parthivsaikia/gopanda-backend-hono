import {
  User,
  Session,
  UserRole,
} from "../../prisma/generated/prisma/index.js";
import { type } from "arktype";
declare module "hono" {
  interface ContextVariableMap {
    user: Omit<User, "password">;
    session: Session;
  }
}

//UserDTOs

//password validation:
const Password = type("string").narrow((password, ctx) => {
  if (password.length < 8) {
    return ctx.reject("Length of password must be greater than 8");
  }
  if (!/[A-Z]/.test(password)) {
    return ctx.reject("Password must contain an uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    return ctx.reject("Password must contain a lowercase letter.");
  }
  if (!/\d/.test(password)) {
    return ctx.reject("Password must contain a digit.");
  }
  return true;
});

export const UserInputUserDTO = type({
  name: "string > 3",
  username: "string > 5",
  password: Password,
  email: "string.email",
  state: "string",
  country: "string",
  mobileNumber: "string.numeric",
  role: type.valueOf(UserRole),
});
