import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "./utils/types/honoContextType";
import authRouter from "./routes/authRoutes";
const app = new Hono();

app.get("/", (c) => {
  return c.json({
    hi: "mom",
  });
});

app.route("/auth", authRouter);

serve({
  fetch: app.fetch,
  port: 3000,
});
