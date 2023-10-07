import express from "express";
import EventsController from "../controllers/events.js";

const router = express.Router();

router.get("/", EventsController.getEvents);

router.get("/:eventId", EventsController.getEventsById);

export default router;
