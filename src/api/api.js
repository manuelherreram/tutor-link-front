import axios from 'axios';

//Peticiones al servidor
//Listar a los profesores
export const getData = async () => {
  let res = await axios.get('http://localhost:8080/api/teachers/admin');
  return res.data;
};

//buscar un profesor por su id
export const getDataById = async (id) => {
  let res = await axios.get(`http://localhost:8080/api/teachers/${id}`);
  return res.data;
};

//Registrar a un nuevo profesor
export const register = async (data) => {

    const response = await axios.post(
      'http://localhost:8080/api/teachers',
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
    const response = await axios.get(`http://localhost:8080/api/teachers/admin`);
    const profesores = response.data;
    const dniExistente = profesores.some(profesor => profesor.dni === dni);    
    return !dniExistente;
    
  
};