import { pool } from "../config/database.js";

const getEvents = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM events ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getEventsById = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const selectQuery =
      "SELECT name, date, venue, description, category, image WHERE id = $1";
    const results = await pool.query(selectQuery, [eventId]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getEvents,
  getEventsById,
};