import axios from 'axios';


/*-----------Teachers---------------------------*/

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
export const register = async (data, token) => {
  const response = await axios.post(
    'http://localhost:8080/api/admin/teachers',
    data,
    {
      headers: {
        
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
  );
  return response.data;
};

//Validar DNI del profesor
export const verificarDNIServidor = async (dni) => {
  try {
    const response = await axios.get('http://localhost:8080/api/admin/teachers');
    const profesores = response.data;

    if (!Array.isArray(profesores)) {
      throw new Error('Se esperaba un array de profesores');
    }
    const dniExistente = profesores.some(profesor => profesor.dni === dni);
    return !dniExistente;
  } catch (error) {
    console.error('Error al verificar el DNI:', error);
    throw error;
  }
};


export const deleteTeacher = async (id, accessToken) => {
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


/*------------------USERS------------------*/

//Para obtener todos los usuarios
export const getUsers = async (accessToken) => {
  try {
    const response = await axios.get('http://localhost:8080/api/admin/users', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Re-throw the error for handling in the component
  }
};
// Setear Rol de User 
export const setUser = async (accessToken, uid, role) => {
  try {
    const response = await axios.put(
      'http://localhost:8080/api/admin/set-role',
      { uid, role },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error setting user role:', error);
    throw error;
  }
};

//Crear Usuarios
export const createUser = async () =>{
  try {
    const response = await axios.post(
      'http://localhost:8080/api/public/createuser',
    );

    return response.data;
  } catch (error) {
    console.error('Error create user:', error);
    throw error;
  }
}