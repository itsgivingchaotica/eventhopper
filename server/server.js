import express from "express";
import path from "path";
import cors from "cors";
import favicon from "serve-favicon";
import eventsRouter from "./routes/events.js";
import locationsRouter from "./routes/locations.js";
import { pool } from "./config/database.js";

// import the router from your routes file

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/events", eventsRouter);
app.use("/locations", locationsRouter);

if (process.env.NODE_ENV === "development") {
  app.use(favicon(path.resolve("../", "client", "public", "party.png")));
} else if (process.env.NODE_ENV === "production") {
  app.use(favicon(path.resolve("public", "party.png")));
  app.use(express.static("public"));
}

// specify the api path for the server to use

app.get("/", async (req, res) => {
  try {
    const resultsEvents = await pool.query("SELECT * FROM events");
    const resultsLocations = await pool.query("SELECT * FROM locations");
    const responseData = {
      html: '<h1 style="text-align: center; margin-top: 50px;">EventHopper API</h1>',
      data: resultsLocations.rows.concat(resultsEvents.rows),
    };
    res.status(200).send(responseData);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

if (process.env.NODE_ENV === "production") {
  app.get("/*", (_, res) => res.sendFile(path.resolve("public", "index.html")));
}

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
