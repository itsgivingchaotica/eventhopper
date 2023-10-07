import { pool } from "../config/database.js";

const getLocations = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM locations ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getLocationsById = async (req, res) => {
  const locationId = req.params.locationId;
  try {
    const selectQuery =
      "SELECT name, address, city, state, website, image WHERE id = $1";
    const results = await pool.query(selectQuery, [locationId]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getLocations,
  getLocationsById,
};
