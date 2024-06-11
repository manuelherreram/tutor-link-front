import axios from "axios";

const BASE_URL = "http://localhost:8080/api";
// const BASE_URL = "http://44.193.72.252:8080/api";

/*-----------Teachers---------------------------*/
// Listar a los profesores
export const getData = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/teachers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching teachers:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Buscar un profesor por su id
export const getDataById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/public/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher by ID:", error);
    throw error;
  }
};

// Registrar a un nuevo profesor
export const register = async (data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/teachers`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering teacher:", error);
    throw error;
  }
};

// Validar DNI del profesor
export const verificarDNIServidor = async (dni) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/teachers`);
    const profesores = response.data;

    if (!Array.isArray(profesores)) {
      throw new Error("Se esperaba un array de profesores");
    }
    const dniExistente = profesores.some((profesor) => profesor.dni === dni);
    return !dniExistente;
  } catch (error) {
    console.error("Error al verificar el DNI:", error);
    throw error;
  }
};

// Eliminar un profesor
export const deleteTeacher = async (id, accessToken) => {
  try {
    const response = await axios.delete(`${BASE_URL}/admin/teachers/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Teacher deleted successfully:", response.data);
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};

// Para filtrar por subject
export const fetchTeachers = async (subject) => {
  try {
    const response = await axios.get(`${BASE_URL}/profesores`, {
      params: { categoria: subject },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching teachers by subject:", error);
    throw error;
  }
};

/*------------------CATEGORIES------------------*/

// Registrar categorías
export const registerCategories = async (data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/subjects/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering categories:", error);
    throw error;
  }
};

/*-----------Characteristics---------------------------*/
// Listar características
export const listChar = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/public/characteristics/list`);
    return response.data;
  } catch (error) {
    console.error("Error listing characteristics:", error);
    throw error;
  }
};

// Crear característica
export const registerChar = async (data, idtoken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/admin/characteristics/add`,
      data,
      {
        headers: {
          Authorization: `Bearer ${idtoken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering characteristic:", error);
    throw error;
  }
};

// Actualizar característica
export const updateChar = async (data, idtoken) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/admin/characteristics/actualizar`,
      data,
      {
        headers: {
          Authorization: `Bearer ${idtoken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating characteristic:", error);
    throw error;
  }
};

// Eliminar característica
export const deleteChar = async (id, idtoken) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/admin/characteristics/eliminar/${id}`,
      {
        headers: {
          Authorization: `Bearer ${idtoken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting characteristic:", error);
    throw error;
  }
};

/*------------------USERS------------------*/

// Obtener todos los usuarios
export const getUsers = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Setear rol de usuario
export const setUser = async (accessToken, uid, role) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/admin/set-role`,
      { uid, role },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error setting user role:", error);
    throw error;
  }
};

// Crear usuarios
export const createUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/public/createuser`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Encontrar el ID de un usuario
export const getUserId = async (uid) => {
  try {
    const response = await axios.get(`${BASE_URL}/public/uid/${uid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    throw error;
  }
};

/*------------------RATINGS------------------*/

// Calificaciones por Id de profesor
export const getRatingByTeacherId = async (teacherId) => {
  try {
    const response = await axios.get(`${BASE_URL}/ratings/teacher/${teacherId}`);
    if (!Array.isArray(response.data)) {
      console.error('La respuesta no es un array:', response.data);
      return [];
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching ratings by teacher id:', error);
    throw error;
  }
};

// Agregar calificación
export const addRating = async (ratingData) => {
  try {
    const response = await axios.post(`/api/ratings`, ratingData);
    return response.data;
  } catch (error) {
    console.error('Error adding rating:', error);
    throw error;
  }
};

// Actualizar una calificación
export const updateRating = async (ratingId, ratingData) => {
  try {
    const response = await axios.put(`/api/ratings/${ratingId}`, ratingData);
    return response.data;
  } catch (error) {
    console.error('Error updating rating:', error);
    throw error;
  }
};