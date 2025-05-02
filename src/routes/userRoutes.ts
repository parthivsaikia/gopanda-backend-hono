import { currentUserController } from "~/controllers/userControllers";
import { Hono } from "hono";
import { authMiddleware } from "~/utils/middlewares";

const userRouter = new Hono();

userRouter.get("/current-user", authMiddleware, currentUserController);

export default userRouter;
