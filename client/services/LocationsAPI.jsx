const API_BASE_URL = "http://localhost:3000";

// Function to get all locations
export const getAllLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

// Function to get a location by its ID
export const getLocationById = async (locationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${locationId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch location with ID ${locationId}: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching location with ID ${locationId}:`, error);
    throw error;
  }
};

// Function to get events by venue name
export const getEventsByVenueName = async (venueName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/venue/${venueName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch events by venue name ${venueName}: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching events by venue name ${venueName}:`, error);
    throw error;
  }
};