import express from "express";
import EventsController from "../controllers/events.js";

export const eventsRouter = express.Router();

eventsRouter.get("/events", EventsController.getEvents);

eventsRouter.get("/events/:eventId", EventsController.getEventsById);

eventsRouter.get("/venue/:venueName", EventsController.getEventsByVenueName);
