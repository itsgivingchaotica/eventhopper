import { pool } from "../config/database.js";

const getLocations = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM locations ORDER BY id ASC");
    console.log(results, "RESULTS");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getLocationsById = async (req, res) => {
  console.log("hello");
  const locationId = req.params.locationId;
  console.log(locationId, "getting by id");
  try {
    const selectQuery =
      "SELECT name, address, city, state, zip, website, image FROM locations WHERE id = $1";
    const results = await pool.query(selectQuery, [locationId]);
    console.log(results, "HELLEOEOFEJFIOEJFOIEJF");
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getLocations,
  getLocationsById,
};
