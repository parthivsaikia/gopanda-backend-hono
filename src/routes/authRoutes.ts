import { Hono } from "hono";
import { login, signup } from "~/controllers/authControllers";

const authRouter = new Hono();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
