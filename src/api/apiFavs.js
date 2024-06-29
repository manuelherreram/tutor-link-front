import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

//Agregar tutor a favoritos
export const addFavorite = async (userId, teacherId) => {
  try {
    const response = await axios.post(`${BASE_URL}/favorites/add`, {
      userId,
      teacherId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

//Remover tutor de favoritos
export const removeFavorite = async (userId, teacherId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/favorites/remove`, {
      data: { userId, teacherId },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

//Listar favoritos
export const listFavorites = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/favorites/user/${userId}/teachers`
    );
    return response.data;
  } catch (error) {
    console.error("Error al listar favoritos:", error);
    throw error;
  }
};
