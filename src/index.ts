import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "./utils/types/honoContextType";
const app = new Hono();

app.get("/", (c) => {
  return c.json({
    hi: "mom",
  });
});

serve({
  fetch: app.fetch,
  port: 3000,
});
