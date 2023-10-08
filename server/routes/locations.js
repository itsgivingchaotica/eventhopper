import express from "express";
import LocationsController from "../controllers/locations.js";

export const locationsRouter = express.Router();

locationsRouter.get("/", LocationsController.getLocations);

locationsRouter.get("/:locationId", LocationsController.getLocationsById);
