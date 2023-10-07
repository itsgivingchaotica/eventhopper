const API_BASE_URL = 'http://localhost:3000'

// Function to get all events
export const getAllEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Function to get an event by its ID
export const getEventById = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch event with ID ${eventId}: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching event with ID ${eventId}:`, error);
    throw error;
  }
};

