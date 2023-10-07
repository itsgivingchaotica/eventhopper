import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import EventsAPI from "../services/EventsAPI";
import LocationsAPI from "../services/LocationsAPI";
import "../css/LocationEvents.css";

const LocationEvents = ({ index }) => {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const locationEventsData = await EventsAPI.getAllEvents();
        console.log(locationEventsData, "data");
        console.log(index, "INDEX");
        setEvents(locationEventsData);
        const locationData = await LocationsAPI.getLocationById(index);
        setLocation(locationData.data);
        console.log(location);
        location.filter((event) => event.venue !== location.name);
        setLocation(location);
        console.log(locationData, "locationdata");
      } catch (error) {
        console.error(error); // Log the error
        // Handle the error here or rethrow it if needed
      }
    })();
  }, []);

  useEffect(() => {
    if (events) {
    }
  }, [events]);

  return location ? (
    <div className="location-events">
      <header>
        <div className="location-image">
          <img src={`url/${location.image}`} />
        </div>

        <div className="location-info">
          <h2>{location.name}</h2>
          <p>
            {location.address}, {location.city}, {location.state} {location.zip}
          </p>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.name}
              date={event.date}
              time={event.time}
              image={event.image}
            />
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
            {"No events scheduled at this location yet!"}
          </h2>
        )}
      </main>
    </div>
  ) : (
    <></>
  );
};

export default LocationEvents;
