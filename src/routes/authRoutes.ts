import { Hono } from "hono";
import {
  login,
  logout,
  logoutAll,
  signup,
  signupGet,
} from "~/controllers/authControllers";
import { authMiddleware, csrfMiddleware } from "~/utils/middlewares";

const authRouter = new Hono();
authRouter.get("/signup", signupGet);
authRouter.post("/signup", signup);

authRouter.post("/login", login);
authRouter.post("/logout", authMiddleware, csrfMiddleware, logout);
authRouter.post("/logout-all", authMiddleware, csrfMiddleware, logoutAll);

export default authRouter;
