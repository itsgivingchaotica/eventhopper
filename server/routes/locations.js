import express from "express";
import LocationsController from "../controllers/locations.js";

const router = express.Router();

router.get("/", LocationsController.getGifts);

router.get("/:locationId", LocationsController.getGiftsById);

export default router;
