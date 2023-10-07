const API_BASE_URL = "http://localhost:3000";

// Function to get all locations
const getAllLocations = async () => {
  try {
    console.log("get all locations service");
    const response = await fetch(`${API_BASE_URL}/`);
    console.log("success get all locations service");
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

// Function to get a location by its ID
const getLocationById = async (locationId) => {
  console.log(locationId, "from api");
  try {
    const response = await fetch(`${API_BASE_URL}/${locationId}`);
    console.log(response, "hellos");
    if (!response.ok) {
      throw new Error(
        `Failed to fetch location with ID ${locationId}: ${response.status}`
      );
    }
    const data = await response.json();
    console.log(data.data, "the location data");
    return data.data;
  } catch (error) {
    console.error(`Error fetching location with ID ${locationId}:`, error);
    throw error;
  }
};

// Function to get events by venue name
const getEventsByVenueName = async (venueName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/venue/${venueName}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch events by venue name ${venueName}: ${response.status}`
      );
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching events by venue name ${venueName}:`, error);
    throw error;
  }
};

export default { getAllLocations, getLocationById, getEventsByVenueName };
