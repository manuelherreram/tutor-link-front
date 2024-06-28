import axios from "axios";
import dayjs from "dayjs";

// const BASE_URL = "https://tutor-link-back.onrender.com/api"; Render Plan B
const BASE_URL = "http://3.231.155.26:8080/api";

// Obtener disponibilidad de un profesor
export const getAvailabilitiesById = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/availabilities/teacher/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching availabilities:", error);
    throw error;
  }
};
//Reservar hora con un profesor
export const addReservation = async (userId, teacherId, start, end) => {
  let res = await axios.post(`${BASE_URL}/reservations/create`, {
    userId,
    teacherId,
    startTime: start.format("YYYY-MM-DDTHH:mm:ss"),
    endTime: end.format("YYYY-MM-DDTHH:mm:ss"),
  });
  return res.data;
};

//Listar las reservaciones del usuario
export const getUserReservations = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/reservations/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations user:", error);
    throw error;
  }
};
//Eliminar las reservaciones del usuario
export const deleteUserReservation = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/reservations/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting the reservation:", error);
    throw error;
  }
};
