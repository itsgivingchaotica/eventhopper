import { pool } from "./database.js";
import "./dotenv.js";
import eventData from "../data/events.js";

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        venue VARCHAR(255) NOT NULL,
        description TEXT,
        city VARCHAR(255) NOT NULL,
        state CHAR(2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
    )
`;

  try {
    await pool.query(createTableQuery);
    console.log("Created gifts table");
  } catch (error) {
    console.log("⚠️ error creating gifts table", error);
  }
};

const seedEventsTable = async () => {
  await createEventsTable();

  eventData.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO events (name, date, venue, description, city, state, category, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    };

    const values = [
      event.name,
      event.date,
      event.venue,
      event.description,
      event.city,
      event.state,
      event.category,
      event.image,
    ];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting event", err);
        return;
      }

      console.log(`✅ ${event.name} added successfully`);
    });
  });
};

seedEventsTable();
