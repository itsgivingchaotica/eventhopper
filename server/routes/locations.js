import express from "express";
import LocationsController from "../controllers/locations.js";

export const locationsRouter = express.Router();

locationsRouter.get("/locations", LocationsController.getLocations);

locationsRouter.get(
  "/locations/:locationId",
  LocationsController.getLocationsById
);
