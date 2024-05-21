import axios from 'axios';

//Peticiones al servidor
//Listar a los profesores
export const getData = async () => {
  let res = await axios.get('http://localhost:8080/api/admin/teachers');
  return res.data;
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

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/teachers/${id}`);
    console.log('Teacher deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting teacher:', error);
  }
};

//para filtrar por subject 
export const fetchTeachers = async (subject) => {
  const response = await axios.get('/api/profesores', {
      params: { categoria: subject }
  });
  return response.data;
};