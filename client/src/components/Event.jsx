import React, { useState, useEffect } from "react";
import EventsAPI from "../services/EventsAPI";
import "../css/Event.css";

const Event = (props) => {
  const [event, setEvent] = useState([]);
  const [time, setTime] = useState([]);
  const [date, setDate] = useState([]);
  const [remaining, setRemaining] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const eventData = await EventsAPI.getEventById(props.id);
        setEvent(eventData);
        const timeDate = new Date(eventData.time);

        // Format the time in 'h:mm a' format (e.g., '2:00 PM')
        const formattedTime = timeDate.toLocaleTimeString([], {
          timeStyle: "short",
        });

        setTime(formattedTime);
        const eventDate = eventData.date.slice(0, 10);
        setDate(eventDate);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const eventTime = new Date(event.date); // Assuming event.time is a valid date string
      const currentTime = new Date();
      const timeDifference = eventTime - currentTime;

      if (timeDifference <= 0) {
        // Event has already occurred
        setRemaining("Event has ended");
      } else {
        // Calculate hours, minutes, and seconds
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    // Calculate initial remaining time
    calculateRemainingTime();

    // Update remaining time every second
    const timerInterval = setInterval(calculateRemainingTime, 1000);

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(timerInterval);
    };
  }, [event]);

  return time && date ? (
    <article className="event-information">
      <img src={event.image} />

      <div className="event-information-overlay">
        <div className="text">
          <h3>{event.name}</h3>
          <p>
            <i className="fa-regular fa-calendar fa-bounce"></i> {date} <br />{" "}
            {time}
          </p>
          <p id={`remaining-${event.id}`}>{remaining}</p>
        </div>
      </div>
    </article>
  ) : (
    <></>
  );
};

export default Event;
