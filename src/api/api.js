import axios from 'axios';

//Listar a los profesores
export const getData = async (accessToken) => {
  try {
    const response = await axios.get('http://localhost:8080/api/admin/teachers', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

//buscar un profesor por su id
export const getDataById = async (id) => {
  let res = await axios.get(`http://localhost:8080/api/public/${id}`);
  return res.data;
};

//Registrar a un nuevo profesor
export const register = async (data) => {

    const response = await axios.post(
      'http://localhost:8080/api/admin/teacher',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
 
};

//Validar ID del profesor
export const verificarDNIServidor = async (dni) => {
    const response = await axios.get(`http://localhost:8080/api/admin/teachers`);
    const profesores = response.data;
    const dniExistente = profesores.some(profesor => profesor.dni === dni);    
    return !dniExistente;
    
  
 
};
export const deleteUser = async (id, accessToken) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/admin/teachers/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log('Teacher deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};

//para filtrar por subject 
export const fetchTeachers = async (subject) => {
  const response = await axios.get('/api/profesores', {
      params: { categoria: subject }
  });
  return response.data;
};