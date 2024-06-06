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
const baseURL = "http://localhost:8080/api";

// Function to handle API requests
const apiRequest = async (method, url, data = {}, headers = {}) => {
  try {
    const response = await axios({ method, url, data, headers });
    return response.data;
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error);
    throw error;
  }
};

// Teachers
export const getTeachers = async (accessToken) => {
  const url = `${baseURL}/admin/teachers`;
  return apiRequest("get", url, {}, { Authorization: `Bearer ${accessToken}` });
};

export const getTeacherById = async (id) => {
  const url = `${baseURL}/public/${id}`;
  return apiRequest("get", url);
};

export const registerTeacher = async (data, token) => {
  const url = `${baseURL}/admin/teachers`;
  return apiRequest("post", url, data, {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });
};

export const verifyDNI = async (dni) => {
  const url = `${baseURL}/admin/teachers`;
  const response = await apiRequest("get", url);
  const teachers = response.data;

  if (!Array.isArray(teachers)) {
    throw new Error("Expected an array of teachers");
  }
  const dniExists = teachers.some((teacher) => teacher.dni === dni);
  return !dniExists;
};

export const deleteTeacher = async (id, accessToken) => {
  const url = `${baseURL}/admin/teachers/${id}`;
  return apiRequest(
    "delete",
    url,
    {},
    { Authorization: `Bearer ${accessToken}` }
  );
};

export const fetchTeachersBySubject = async (subject) => {
  const url = "/api/profesores";
  return apiRequest("get", url, {}, { params: { categoria: subject } });
};

// Categories
export const registerCategory = async (data, token) => {
  const url = `${baseURL}/admin/subjects/add`;
  return apiRequest("post", url, data, {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });
};

// Characteristics
export const listCharacteristics = async (idtoken) => {
  const url = `${baseURL}/admin/characteristic/list`;
  return apiRequest("get", url, {}, { Authorization: `Bearer ${idtoken}` });
};

export const registerCharacteristic = async (data, idtoken) => {
  const url = `${baseURL}/admin/characteristic/add`;
  return apiRequest("post", url, data, {
    Authorization: `Bearer ${idtoken}`,
    "Content-Type": "application/json",
  });
};

export const updateCharacteristic = async (data, idtoken) => {
  const url = `${baseURL}/admin/characteristic/actualizar`;
  return apiRequest("put", url, data, {
    Authorization: `Bearer ${idtoken}`,
    "Content-Type": "application/json",
  });
};

export const deleteCharacteristic = async (id, idtoken) => {
  const url = `${baseURL}/admin/characteristic/eliminar/${id}`;
  return apiRequest("delete", url, {}, { Authorization: `Bearer ${idtoken}` });
};

// Users
export const getUsers = async (accessToken) => {
  const url = `${baseURL}/admin/users`;
  return apiRequest("get", url, {}, { Authorization: `Bearer ${accessToken}` });
};

export const setUserRole = async (accessToken, uid, role) => {
  const url = `${baseURL}/admin/set-role`;
  return apiRequest(
    "put",
    url,
    { uid, role },
    {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    }
  );
};

export const createUser = async (userData) => {
  const url = `${baseURL}/public/createuser`;
  return apiRequest("post", url, userData);
};
