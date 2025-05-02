import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { Hono } from "hono";
import "./utils/types/honoContextType";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import { logger } from "hono/logger";
const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type", "X-CSRF-Token"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  }),
);
app.use("*", logger());

app.get("/", (c) => {
  return c.json({
    hi: "mom",
  });
});

app.route("/auth", authRouter);
app.route("/user", userRouter);

serve({
  fetch: app.fetch,
  port: 3000,
});
