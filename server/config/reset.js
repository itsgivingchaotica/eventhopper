import { pool } from "./database.js";
import "./dotenv.js";
import eventData from "../data/events.js";
import locationData from "../data/locations.js";

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        venue VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
    )
`;

  try {
    await pool.query(createTableQuery);
    console.log("Created events table");
  } catch (error) {
    console.log("⚠️ error creating events table", error);
  }
};

const createLocationsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        zip VARCHAR(255) NOT NULL,
        website VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
    )
`;

  try {
    await pool.query(createTableQuery);
    console.log("Created locations table");
  } catch (error) {
    console.log("⚠️ error creating locations table", error);
  }
};

const seedEventsTable = async () => {
  await createEventsTable();

  eventData.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO events (name, date, time, venue, description, category, image) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    };

    const values = [
      event.name,
      event.date,
      event.time,
      event.venue,
      event.description,
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

const seedLocationsTable = async () => {
  await createLocationsTable();

  locationData.forEach((location) => {
    const insertQuery = {
      text: "INSERT INTO locations (name, address, city, state, zip, website, image) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    };

    const values = [
      location.name,
      location.address,
      location.city,
      location.state,
      location.zip,
      location.website,
      location.image,
    ];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting event", err);
        return;
      }

      console.log(`✅ ${location.name} added successfully`);
    });
  });
};

seedEventsTable();
seedLocationsTable();
