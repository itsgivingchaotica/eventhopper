import React, { useEffect, useState } from "react";
import Event from "../components/Event";
import EventsAPI from "../services/EventsAPI";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const eventsData = await EventsAPI.getAllEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedVenue(e.target.value);
  };

  // Filter the requests based on the selected value
  const filteredEvents = events.filter((event) => {
    // If no filter is applied or the request contains the selected value, include it
    return selectedVenue === "" || event.venue === selectedVenue;
  });
  if (events) {
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return (
    <div className="location-events">
      <header>
        <div className="location-info">
          <h2>Upcoming Events</h2>
        </div>
        <div>
          <select
            id="fruit"
            onChange={handleSelectChange}
            value={selectedVenue}
            required
          >
            <option value="" selected>
              Filter by...
            </option>
            <option value="Javits Center">Javits Center</option>
            <option value="Brooklyn Steel">Brooklyn Steel</option>
            <option value="The Met">The Met </option>
            <option value="Madison Square Garden">Madison Square Garden</option>
          </select>
        </div>
      </header>

      <main>
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
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
  );
};

export default Events;
