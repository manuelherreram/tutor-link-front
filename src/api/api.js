import axios from "axios";

// const BASE_URL = "https://tutor-link-back.onrender.com/api"; Render Plan B
// const BASE_URL = "http://3.215.179.193:8080/api";

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
export const verificarDNIServidor = async (dni, accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/teachers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
    console.error("Error deleting teacher:", error);
    throw error;
  }
};
// Filtrar Profesores por Características
export const getTeachersByCharacteristics = async (characteristicIds) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/teachers/characteristics-filter`,
      {
        params: {
          characteristicIds: characteristicIds.join(","),
        },
      }
    );
    console.log("Teachers retrieved successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error retrieving teachers by characteristics:", error);
    throw error;
  }
};

//Buscar Profesores por Palabra Clave
export const searchTeachersByKeyword = async (keyword) => {
  try {
    const response = await axios.get(`${BASE_URL}/teachers/keywordsearch`, {
      params: {
        keyword: keyword,
      },
    });
    console.log("Teachers retrieved successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error retrieving teachers by keyword:", error);
    throw error;
  }
};
//Búsqueda profesores según caracteristicas y Materias
export const getTeachersByFilter = async (subjects, characteristicIds) => {
  try {
    const response = await axios.get(`${BASE_URL}/teachers/search`, {
      params: {
        subjects: subjects.join(","),
        characteristicIds: characteristicIds.join(","),
      },
    });
    console.log("Teachers retrieved successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error retrieving teachers by filter:", error);
    throw error;
  }
};

// Búsqueda de Profesores por disponibilidad y materia
export const getAvailableTeachers = async (
  startDate,
  endDate,
  subjectTitle
) => {
  try {
    const response = await axios.get(`${BASE_URL}/available`, {
      params: {
        startDate: startDate,
        endDate: endDate,
        subjectTitle: subjectTitle,
      },
    });
    console.log("Available teachers retrieved successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error retrieving available teachers:", error);
    throw error;
  }
};

//Búsqueda de Profesores Disponibles por Fechas
export const getAvailableTeachersByDate = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/teachers/available`, {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
    console.log(
      "Teachers available by date retrieved successfully:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving teachers available by date:", error);
    throw error;
  }
};

//Búsqueda de Profesores Disponibles por Materia y Fechas
export const getAvailableTeachersBySubjectAndDate = async (
  subjectTitle,
  startDate,
  endDate
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/teachers/availableBySubject`,
      {
        params: {
          subjectTitle: subjectTitle,
          startDate: startDate,
          endDate: endDate,
        },
      }
    );
    console.log(
      "Teachers available by subject and date retrieved successfully:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error retrieving teachers available by subject and date:",
      error
    );
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
// Eliminar categorías
export const deleteCategories = async (id, token) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/admin/subjects/eliminar/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting categories:", error);
    throw error;
  }
};
//Buscar usuario por id

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/public/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by id:", error);
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
export const updateChar = async (id, data, idtoken) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/admin/characteristics/update/${id}`,
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
    const response = await axios.get(
      `${BASE_URL}/teachers/ratings/${teacherId}`
    );
    if (response.data && Array.isArray(response.data.ratings)) {
      return response.data.ratings;
    } else {
      console.error(
        "La respuesta no contiene un array de calificaciones:",
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching ratings by teacher id:", error);
    throw error;
  }
};

// Agregar calificación
export const addRating = async (ratingData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/teachers/ratings/add`,
      ratingData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding rating:", error);
    throw error;
  }
};
