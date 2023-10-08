import express from "express";
import path from "path";
import cors from "cors";
import favicon from "serve-favicon";
import { eventsRouter } from "./routes/events.js";
import { locationsRouter } from "./routes/locations.js"; // Import default export
import { pool } from "./config/database.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/locations", locationsRouter);
app.use("/events", eventsRouter);

if (process.env.NODE_ENV === "production") {
  app.get("/*", (_, res) => res.sendFile(path.resolve("public", "index.html")));
}

console.log(PORT, "PORT");
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
