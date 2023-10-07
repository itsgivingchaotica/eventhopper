const API_BASE_URL = "http://localhost:3000";

// Function to get all events
const getAllEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Function to get an event by its ID
const getEventById = async (eventId) => {
  console.log(eventId, "helo");
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
    console.log(response, "gooybe");
    if (!response.ok) {
      throw new Error(
        `Failed to fetch event with ID ${eventId}: ${response.status}`
      );
    }
    console.log(response.data);
    return response.json();
  } catch (error) {
    console.error(`Error fetching event with ID ${eventId}:`, error);
    throw error;
  }
};

export default {
  getAllEvents,
  getEventById,
};
