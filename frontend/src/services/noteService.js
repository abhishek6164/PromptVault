import axios from "axios";

const API_BASE_URL = "http://localhost:8080/notes"; // Ensure this matches your backend

export const addNote = async (noteData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, noteData);
    return response.data;
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

export const fetchNotes = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};
