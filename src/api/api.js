import axios from 'axios';

//Listar a los profesores
export const getData = async (accessToken) => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/admin/teachers',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

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
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

//Validar DNI del profesor
export const verificarDNIServidor = async (dni) => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/admin/teachers'
    );
    const profesores = response.data;

    if (!Array.isArray(profesores)) {
      throw new Error('Se esperaba un array de profesores');
    }
    const dniExistente = profesores.some((profesor) => profesor.dni === dni);
    return !dniExistente;
  } catch (error) {
    console.error('Error al verificar el DNI:', error);
    throw error;
  }
};
//Para obtener todos los usuarios
export const getUsers = async () => {
  let res = await axios.get(`http://localhost:8080/api/user/users`);
  return res.data;
};

export const deleteUser = async (id, accessToken) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/admin/teachers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log('Teacher deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};

//para filtrar por subject
export const fetchTeachers = async (subject) => {
  const response = await axios.get('/api/profesores', {
    params: { categoria: subject },
  });
  return response.data;
};
//CARACTERÍSTICAS
//para listar características
export const listChar = async (idtoken) => {
  const response = await axios.get(
    'http://localhost:8080/api/admin/characteristic/list',
    {
      headers: {
        Authorization: `Bearer ${idtoken}`,
      },
    }
  );
  return response.data;
};
//para crear característica
export const registerChar = async (data, idtoken) => {
  const response = await axios.post(
    'http://localhost:8080/api/admin/characteristic/add',
    data,
    {
      headers: {
        Authorization: `Bearer ${idtoken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const updateChar = async (data, idtoken) => {
  const response = await axios.put(
    `http://localhost:8080/api/admin/characteristic/actualizar`,
    data,
    {
      headers: {
        Authorization: `Bearer ${idtoken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const deleteChar = async (id, idtoken) => {
  const response = await axios.delete(
    `http://localhost:8080/api/admin/characteristic/eliminar/${id}`,
    {
      headers: {
        Authorization: `Bearer ${idtoken}`,
      },
    }
  );
  return response.data;
};
