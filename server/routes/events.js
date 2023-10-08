import express from "express";
import EventsController from "../controllers/events.js";

export const eventsRouter = express.Router();

eventsRouter.get("/", EventsController.getEvents);

eventsRouter.get("/:eventId", EventsController.getEventsById);

eventsRouter.get("/:venueName", EventsController.getEventsByVenueName);
