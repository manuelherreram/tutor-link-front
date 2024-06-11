import axios from "axios"
import dayjs from 'dayjs';
const BASE_URL='http://localhost:8080/api'

// Disponibilidad de un profesor
export const getAvailabilitiesById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/availabilities/teacher/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching availabilities:', error);
      throw error;
    }
  };
  
export const addReservation = async (userId, teacherId, start, end) => {
  let res = await axios.post(`${BASE_URL}/reservations`, {
    userId,
    teacherId,
    startTime: start.format('YYYY-MM-DDTHH:mm:ss'),
    endTime: end.format('YYYY-MM-DDTHH:mm:ss'),
    status: 'PENDING',
  });
  return res.data;
};