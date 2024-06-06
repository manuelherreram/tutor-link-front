// import axios from 'axios';

// /*-----------Teachers---------------------------*/

// //Listar a los profesores
// export const getData = async (accessToken) => {
//   try {
//     const response = await axios.get(
//       'http://localhost:8080/api/admin/teachers',
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching teachers:', error);
//     throw error; // Re-throw the error for handling in the component
//   }
// };

// //buscar un profesor por su id
// export const getDataById = async (id) => {
//   let res = await axios.get(`http://localhost:8080/api/public/${id}`);
//   return res.data;
// };

// //Registrar a un nuevo profesor
// export const register = async (data, token) => {
//   const response = await axios.post(
//     'http://localhost:8080/api/admin/teachers',
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   );
//   return response.data;
// };

// //Validar DNI del profesor
// export const verificarDNIServidor = async (dni) => {
//   try {
//     const response = await axios.get(
//       'http://localhost:8080/api/admin/teachers'
//     );
//     const profesores = response.data;

//     if (!Array.isArray(profesores)) {
//       throw new Error('Se esperaba un array de profesores');
//     }
//     const dniExistente = profesores.some((profesor) => profesor.dni === dni);
//     return !dniExistente;
//   } catch (error) {
//     console.error('Error al verificar el DNI:', error);
//     throw error;
//   }
// };

// export const deleteTeacher = async (id, accessToken) => {
//   try {
//     const response = await axios.delete(
//       `http://localhost:8080/api/admin/teachers/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     console.log('Teacher deleted successfully:', response.data);
//   } catch (error) {
//     console.error('Error deleting teacher:', error);
//     throw error;
//   }
// };

// //para filtrar por subject
// export const fetchTeachers = async (subject) => {
//   const response = await axios.get('/api/profesores', {
//     params: { categoria: subject },
//   });
//   return response.data;
// };

// /*------------------CATEGORIES------------------*/

// export const registerCategories = async (data, token) => {
//   const response = await axios.post(
//     'http://localhost:8080/api/admin/subjects/add',
//     data,
//     {
//       headers: {

//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//     }
//   );
//   return response.data;
// };
// /*-----------Characteristics---------------------------*/
// //para listar características
// export const listChar = async (idtoken) => {
//   const response = await axios.get(
//     'http://localhost:8080/api/admin/characteristic/list',
//     {
//       headers: {
//         Authorization: `Bearer ${idtoken}`,
//       },
//     }
//   );
//   return response.data;
// };
// //para crear característica
// export const registerChar = async (data, idtoken) => {
//   const response = await axios.post(
//     'http://localhost:8080/api/admin/characteristic/add',
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${idtoken}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   );
//   return response.data;
// };
// //Para actualizar Característica

// export const updateChar = async (data, idtoken) => {
//   const response = await axios.put(
//     `http://localhost:8080/api/admin/characteristic/actualizar`,
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${idtoken}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   );
//   return response.data;

// };

// //Para eliminar caracterísctica

// export const deleteChar = async (id, idtoken) => {
//   const response = await axios.delete(
//     `http://localhost:8080/api/admin/characteristic/eliminar/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${idtoken}`,
//       },
//     }
//   );
//   return response.data;
// };

// /*------------------USERS------------------*/

// //Para obtener todos los usuarios
// export const getUsers = async (accessToken) => {
//   try {
//     const response = await axios.get('http://localhost:8080/api/admin/users', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error; // Re-throw the error for handling in the component
//   }
// };
// // Setear Rol de User
// export const setUser = async (accessToken, uid, role) => {
//   try {
//     const response = await axios.put(
//       'http://localhost:8080/api/admin/set-role',
//       { uid, role },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error('Error setting user role:', error);
//     throw error;
//   }
// };
// //Crear Usuarios
// export const createUser = async (userData) => {
//   try {
//     const response = await axios.post(
//       'http://localhost:8080/api/public/createuser',
//       userData
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error creating user:', error);
//     throw error;
//   }
// };

import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Utility function for error handling
const handleError = (error, message) => {
  console.error(`${message}:`, error);
  throw error;
};

/*-----------Teachers---------------------------*/

// Listar a los profesores
export const getTeachers = async (accessToken) => {
  try {
    const response = await axiosInstance.get(
      "/admin/teachers",
      setAuthHeader(accessToken)
    );
    return response.data;
  } catch (error) {
    handleError(error, "Error fetching teachers");
  }
};

// Buscar un profesor por su ID
export const getTeacherById = async (id) => {
  try {
    const response = await axiosInstance.get(`/public/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, "Error fetching teacher by ID");
  }
};

// Registrar a un nuevo profesor
export const registerTeacher = async (data, token) => {
  try {
    const response = await axiosInstance.post(
      "/admin/teachers",
      data,
      setAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    handleError(error, "Error registering teacher");
  }
};

// Validar DNI del profesor
export const validateTeacherDNI = async (dni) => {
  try {
    const response = await axiosInstance.get("/admin/teachers");
    const teachers = response.data;

    if (!Array.isArray(teachers)) {
      throw new Error("Expected an array of teachers");
    }

    return !teachers.some((teacher) => teacher.dni === dni);
  } catch (error) {
    handleError(error, "Error validating DNI");
  }
};

// Eliminar un profesor
export const deleteTeacher = async (id, accessToken) => {
  try {
    const response = await axiosInstance.delete(
      `/admin/teachers/${id}`,
      setAuthHeader(accessToken)
    );
    console.log("Teacher deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    handleError(error, "Error deleting teacher");
  }
};

// Filtrar profesores por subject
export const fetchTeachersBySubject = async (subject) => {
  try {
    const response = await axiosInstance.get("/profesores", {
      params: { categoria: subject },
    });
    return response.data;
  } catch (error) {
    handleError(error, "Error fetching teachers by subject");
  }
};

/*------------------Categories------------------*/

export const registerCategory = async (data, token) => {
  try {
    const response = await axiosInstance.post(
      "/admin/subjects/add",
      data,
      setAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    handleError(error, "Error registering category");
  }
};

/*-----------Characteristics---------------------------*/

// Listar características
export const listCharacteristics = async (token) => {
  try {
    const response = await axiosInstance.get(
      "/admin/characteristic/list",
      setAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    handleError(error, "Error fetching characteristics");
  }
};

// Crear característica
export const registerCharacteristic = async (data, token) => {
  try {
    const response = await axiosInstance.post(
      "/admin/characteristic/add",
      data,
      setAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    handleError(error, "Error registering characteristic");
  }
};

// Actualizar característica
export const updateCharacteristic = async (data, token) => {
  try {
    const response = await axiosInstance.put(
      "/admin/characteristic/actualizar",
      data,
      setAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    handleError(error, "Error updating characteristic");
  }
};

// Eliminar característica
export const deleteCharacteristic = async (id, token) => {
  try {
    const response = await axiosInstance.delete(
      `/admin/characteristic/eliminar/${id}`,
      setAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    handleError(error, "Error deleting characteristic");
  }
};

/*------------------Users------------------*/

// Obtener todos los usuarios
export const getUsers = async (accessToken) => {
  try {
    const response = await axiosInstance.get(
      "/admin/users",
      setAuthHeader(accessToken)
    );
    return response.data;
  } catch (error) {
    handleError(error, "Error fetching users");
  }
};

// Setear rol de usuario
export const setUserRole = async (accessToken, uid, role) => {
  try {
    const response = await axiosInstance.put(
      "/admin/set-role",
      { uid, role },
      setAuthHeader(accessToken)
    );
    return response.data;
  } catch (error) {
    handleError(error, "Error setting user role");
  }
};

// Crear usuario
export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/public/createuser", userData);
    return response.data;
  } catch (error) {
    handleError(error, "Error creating user");
  }
};
