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
        const locationData = await LocationsAPI.getLocationById(index);
        setLocation(locationData);
        const locationEventsData = await EventsAPI.getAllEvents();
        const events = locationEventsData.filter((event) => {
          return event.venue === locationData.name;
        });
        console.log(events);

        setEvents(events);
      } catch (error) {
        console.error(error); 
      }
    })();
  }, []);

  return location ? (
    <div className="location-events">
      <header>
        <div className="location-image">
          <img src={location.image} />
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
