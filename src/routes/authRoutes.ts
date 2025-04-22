import { Hono } from "hono";
import {
  login,
  logout,
  logoutAll,
  signup,
} from "~/controllers/authControllers";
import { authMiddleware } from "~/utils/middlewares";

const authRouter = new Hono();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", authMiddleware, logout);
authRouter.post("/logout-all", authMiddleware, logoutAll);

export default authRouter;
