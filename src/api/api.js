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

const api = axios.create({
  baseURL,
});

const handleError = (error) => {
  console.error(`Error fetching data:`, error);
  throw error;
};

const getData = async (endpoint, accessToken) => {
  try {
    const response = await api.get(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const postData = async (endpoint, data, token) => {
  try {
    const response = await api.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const deleteData = async (endpoint, accessToken) => {
  try {
    const response = await api.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Data deleted successfully:", response.data);
  } catch (error) {
    handleError(error);
  }
};

// Teachers
export const getTeachers = (accessToken) =>
  getData(`/admin/teachers`, accessToken);
export const getTeacherById = (id) => getData(`/public/${id}`);
export const registerTeacher = (data, token) =>
  postData(`/admin/teachers`, data, token);
export const verifyDNI = (dni) => getData(`/admin/teachers`); // You might need to refine this function
export const deleteTeacher = (id, accessToken) =>
  deleteData(`/admin/teachers/${id}`, accessToken);
export const fetchTeachersBySubject = (subject) =>
  getData(`/profesores`, { params: { categoria: subject } });

// Categories
export const registerCategory = (data, token) =>
  postData(`/admin/subjects/add`, data, token);

// Characteristics
export const listCharacteristics = (idtoken) =>
  getData(`/admin/characteristic/list`, idtoken);
export const registerCharacteristic = (data, idtoken) =>
  postData(`/admin/characteristic/add`, data, idtoken);
export const updateCharacteristic = (data, idtoken) =>
  postData(`/admin/characteristic/actualizar`, data, idtoken);
export const deleteCharacteristic = (id, idtoken) =>
  deleteData(`/admin/characteristic/eliminar/${id}`, idtoken);

// Users
export const getUsers = (accessToken) => getData(`/admin/users`, accessToken);
export const setUserRole = (accessToken, uid, role) =>
  postData(`/admin/set-role`, { uid, role }, accessToken);
export const createUser = (userData) =>
  postData(`/public/createuser`, userData);
